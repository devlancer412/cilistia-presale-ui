import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import useMain from "@/hooks/useMain";
import { PresaleStatus, Token } from "@/types";
import { TOKENS, NETWORK } from "@/constants";
import { getWhitelistStatus, purchase } from "@/utils";

const Buy = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const { status } = useMain();
  const [whitelisted, setWhitelisted] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token>(TOKENS[NETWORK][0]);

  const onPurchase = async () => {
    if (!address || !signer) {
      return;
    }
    if (amount === "") {
      return;
    }

    await purchase(address, Number(amount), selectedToken, signer);
  };

  useEffect(() => {
    if (address) {
      getWhitelistStatus(address).then(setWhitelisted);
    }
  }, [address]);

  useEffect(() => {
    if (address) {
    }
  }, [address, selectedToken]);

  return (
    <div className="flex flex-col w-full items-center space-y-2">
      {!whitelisted && <div>Not whitelisted</div>}
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
      <button disabled={status !== PresaleStatus.OPEN} onClick={onPurchase}>
        Purchase
      </button>
    </div>
  );
};

export default Buy;
