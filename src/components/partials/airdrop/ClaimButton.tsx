import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useAirdrop, useWalletStats } from '@/hooks';
import { AirdropState } from '@/contexts/AirdropContext';

const ClaimButton = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const { status, claim, canClaim } = useAirdrop();
  const { airdropWhitelisted } = useWalletStats();

  const handleClaim = async () => {
    try {
      setIsWaiting(true);
      const tx = await claim();
      await tx.wait();
    } catch (err) {
      console.log(err);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <div className='mt-8'>
      {isConnected ? (
        <button
          type='button'
          onClick={handleClaim}
          disabled={
            status !== AirdropState.OPEN ||
            !airdropWhitelisted ||
            isWaiting ||
            !canClaim
          }
          className='inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isWaiting ? 'Claiming Now...' : 'Claim Now'}
        </button>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};

export default ClaimButton;