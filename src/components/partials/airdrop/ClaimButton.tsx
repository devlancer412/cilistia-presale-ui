import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  useAirdrop,
  useAirdropCountdown,
  useAppStats,
  useCurrentTime,
} from "@/hooks";
import { AirdropState } from "@/contexts/AirdropContext";
import { toast } from "react-hot-toast";

const ClaimButton = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const { claim, openingTime, lastClaimedTime, closingTime } = useAirdrop();
  const currentTime = useCurrentTime();
  const { status, canClaim } = useAirdropCountdown(
    currentTime,
    lastClaimedTime,
    closingTime,
    openingTime
  );
  const { airdropWhitelisted } = useAppStats();

  const handleClaim = async () => {
    const toastId = toast.loading(`Claiming airdrop`);
    try {
      setIsWaiting(true);
      const tx = await claim();
      await tx.wait();
      toast.dismiss(toastId);
      toast.success('Airdrop claim successful');
    } catch (err: any) {
      const errorMsg = err?.reason ? err.reason : 'Airdrop claim failed';
      toast.dismiss(toastId);
      toast.error(errorMsg);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className='mt-8 flex items-center justify-center md:justify-start'>
      {isConnected ? (
        <button
          type="button"
          onClick={handleClaim}
          disabled={
            status !== AirdropState.OPEN ||
            !airdropWhitelisted ||
            isWaiting ||
            !canClaim
          }
          className='inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isWaiting ? "Claiming Now..." : "Claim Now"}
        </button>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default ClaimButton;
