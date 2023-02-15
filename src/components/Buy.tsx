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
      <div className="flex flex-col w-full items-center space-y-2">
        <div className="flex flex-row space-x-4">
          {TOKENS[NETWORK].map((token) => (
            <button key={token.symbol} onClick={() => setSelectedToken(token)}>
              {token.symbol}
            </button>
          ))}
        </div>
        <div>
          <input
            value={amount}
            type="number"
            className="border-2 p-1"
            placeholder="input amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{selectedToken.symbol}</span>
        </div>
        {requireApprove() ? (
          <button disabled={status !== PresaleStatus.OPEN} onClick={onApprove}>
            Approve
          </button>
        ) : (
          <button disabled={status !== PresaleStatus.OPEN} onClick={onPurchase}>
            Purchase
          </button>
        )}
      </div>
    );
  } else {
    <div className="flex flex-col w-full items-center space-y-2">
      <div>Not whitelisted</div>
    </div>;
  }
};

export default Buy;
