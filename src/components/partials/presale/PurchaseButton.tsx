import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { PurchaseModal } from "@/components/modals";
import {
  usePresale,
  useAppStats,
  useCurrentTime,
  usePresaleCountdown,
} from "@/hooks";
import { PresaleState } from "@/contexts/PresaleContext";

const PurchaseButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const { closingTime, openingTime } = usePresale();
  const currentTime = useCurrentTime();
  const { status } = usePresaleCountdown(currentTime, closingTime, openingTime);
  const { presaleWhitelisted } = useAppStats();

  return (
    <div className="flex items-center justify-center mt-8 md:justify-start">
      {isConnected ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          disabled={status !== PresaleState.OPEN || !presaleWhitelisted}
          className="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Participate
        </button>
      ) : (
        <ConnectButton />
      )}
      <PurchaseModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PurchaseButton;
