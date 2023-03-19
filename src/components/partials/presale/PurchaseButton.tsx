import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { PurchaseModal } from '@/components/modals';
import { usePresale, useAppStats } from '@/hooks';
import { PresaleState } from '@/contexts/PresaleContext';

const PurchaseButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const { status } = usePresale();
  const { presaleWhitelisted } = useAppStats();

  return (
    <div className='mt-8'>
      {isConnected ? (
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          disabled={status !== PresaleState.OPEN || !presaleWhitelisted}
          className='inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Purchase Now
        </button>
      ) : (
        <ConnectButton />
      )}
      <PurchaseModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default PurchaseButton;
