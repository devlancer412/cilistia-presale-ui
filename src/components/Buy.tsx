import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { BigNumber, utils } from "ethers";
import useMain from "@/hooks/useMain";
import { PresaleStatus, Token } from "@/types";
import { TOKENS, NETWORK } from "@/constants";
import {
  approve,
  getAllowance,
  getWhitelistStatus,
  purchase,
} from "@/utils/app";

const Buy = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const { status } = useMain();
  const [whitelisted, setWhitelisted] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token>(TOKENS[NETWORK][0]);
  const [allowance, setAllowance] = useState<BigNumber | undefined>(undefined);

  const onPurchase = async () => {
    if (!address || !signer) {
      return;
    }
    if (amount === "") {
      return;
    }

    await purchase(address, Number(amount), selectedToken, signer);
  };

  const onApprove = async () => {
    if (!address || !signer) {
      return;
    }
    if (amount === "") {
      return;
    }

    await approve(selectedToken, signer);
    getAllowance(selectedToken, address, signer).then(setAllowance);
  };

  const onMax = () => {};

  useEffect(() => {
    if (address) {
      getWhitelistStatus(address).then(setWhitelisted);
    }
  }, [address]);

  useEffect(() => {
    if (address && signer) {
      getAllowance(selectedToken, address, signer).then(setAllowance);
    }
  }, [selectedToken, address, signer]);

  const requireApprove = () => {
    if (allowance && amount !== "") {
      const amountBN = utils.parseUnits(
        amount.toString(),
        selectedToken.decimals
      );
      return allowance.lt(amountBN);
    }
    return false;
  };

  if (whitelisted) {
    return (
      <div className="flex flex-col w-full items-center">
        <span className="mb-1">Select token below:</span>
        <div className="flex flex-row rounded-lg mb-3">
          {TOKENS[NETWORK].map((token, index) => (
            <button
              key={token.symbol}
              className={`px-7 py-3 ${index === 0 ? "rounded-l-lg" : ""} ${
                index === TOKENS[NETWORK].length - 1 ? "rounded-r-lg" : ""
              } ${
                token.symbol === selectedToken.symbol
                  ? "bg-blue"
                  : "bg-slate-700"
              }`}
              onClick={() => setSelectedToken(token)}
            >
              {token.symbol}
            </button>
          ))}
        </div>
        <div className="flex flex-col my-3">
          <div className="flex justify-between">
            <span className="text-sm">Amount</span>
            <button className="text-sm underline" onClick={onMax}>
              Max
            </button>
          </div>
          <div className="border-2 px-2 rounded-md bg-opacity-[0.06] bg-white">
            <input
              value={amount}
              type="number"
              className="focus:border-transparent focus:ring-0 p-2 bg-transparent border-0"
              placeholder="0.0"
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>{selectedToken.symbol}</span>
          </div>
        </div>
        {requireApprove() ? (
          <button
            className="bg-blue px-7 py-3 rounded-lg"
            disabled={status !== PresaleStatus.OPEN}
            onClick={onApprove}
          >
            Approve
          </button>
        ) : (
          <button
            className="bg-blue px-7 py-3 rounded-lg"
            disabled={status !== PresaleStatus.OPEN}
            onClick={onPurchase}
          >
            Purchase
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full items-center space-y-2">
        <div>Not whitelisted</div>
      </div>
    );
  }
};

export default Buy;
