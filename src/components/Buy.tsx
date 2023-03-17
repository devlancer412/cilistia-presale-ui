import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { BigNumber, utils } from "ethers";
import usePresale from "@/hooks/usePresale";
import { PresaleStatus, Token } from "@/types";
import { ACCEPTED_TOKENS, NETWORK, CLI_PRICE, EXPLORER } from "@/constants";
import {
  approve,
  getAllowance,
  getWhitelistStatus,
  purchase,
} from "@/utils/app";

const Buy = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const { status } = usePresale();
  const [whitelisted, setWhitelisted] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token>(ACCEPTED_TOKENS[0]);
  const [allowance, setAllowance] = useState<BigNumber | undefined>(undefined);
  const [tx, setTx] = useState<string | undefined>(undefined);

  const onPurchase = async () => {
    if (!address || !signer) {
      return;
    }
    if (amount === "") {
      return;
    }
    try {
      const tx = await purchase(address, Number(amount), selectedToken, signer);
      setTx(tx.hash);
      await tx.wait(1);
      setTx(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  const onApprove = async () => {
    if (!address || !signer) {
      return;
    }
    if (amount === "") {
      return;
    }

    try {
      const tx = await approve(selectedToken, signer);
      setTx(tx.hash);
      await tx.wait(1);
      setTx(undefined);
      getAllowance(selectedToken, address, signer).then(setAllowance);
    } catch (err) {
      console.error(err);
    }
  };

  const onMax = () => {};

  const receiveCliMsg = () => {
    if (amount !== "") {
      if (requireApprove()) {
        return "You need to approve first.";
      }
      return `You will receive ${Number(amount) / CLI_PRICE} CIL.`;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (address) {
      getWhitelistStatus(address).then(setWhitelisted);
    }
  }, [address]);

  useEffect(() => {
    if (address && signer) {
      getAllowance(selectedToken, address, signer)
        .then(setAllowance)
        .catch((err) => console.log("GET ALLOWANCE FAILURE:", err));
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
          {ACCEPTED_TOKENS.map((token, index) => (
            <button
              key={token.symbol}
              className={`px-7 py-3 ${index === 0 ? "rounded-l-lg" : ""} ${
                index === ACCEPTED_TOKENS.length - 1 ? "rounded-r-lg" : ""
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
        <span className="text-sm">{receiveCliMsg()}</span>
        {tx ? (
          <a
            className="bg-blue px-7 py-3 rounded-lg mt-2"
            target="__blank"
            href={`${EXPLORER[NETWORK]}tx/${tx}`}
          >
            {requireApprove() ? "Approving..." : "Purchasing..."} View tx
          </a>
        ) : (
          <button
            className="bg-blue px-7 py-3 rounded-lg mt-2"
            disabled={status !== PresaleStatus.OPEN}
            onClick={requireApprove() ? onApprove : onPurchase}
          >
            {requireApprove() ? "Approve" : "Purchase"}
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full items-center space-y-2">
        <div>You are not whitelisted.</div>
      </div>
    );
  }
};

export default Buy;
