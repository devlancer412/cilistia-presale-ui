import { AirdropState } from '@/contexts/AirdropContext';
import { useAirdrop, useWalletStats } from '@/hooks';
import dynamic from 'next/dynamic';

const ClaimButton = dynamic(
  () => import('@/components/partials/airdrop/ClaimButton'),
  {
    ssr: false,
  }
);

const Timer = dynamic(() => import('@/components/partials/airdrop/Timer'), {
  ssr: false,
});

const AirdropInfo = dynamic(
  () => import('@/components/partials/airdrop/AirdropInfo'),
  {
    ssr: false,
  }
);
const AirdropStatus = dynamic(
  () => import('@/components/partials/airdrop/AirdropStatus'),
  {
    ssr: false,
  }
);

const Airdrop = () => {
  const { status } = useAirdrop();
  const { airdropWhitelisted } = useWalletStats();

  return (
    <div className='py-24 overflow-hidden sm:py-32'>
      <div className='px-6 mx-auto max-w-7xl lg:px-8'>
        <div className='grid max-w-2xl grid-cols-1 mx-auto gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start'>
          <div className='lg:pt-4 lg:pr-4'>
            <div className='lg:max-w-lg'>
              <Timer />
              {status === AirdropState.CLOSED && (
                <p className='mt-6 text-lg leading-8 text-gray-600'>
                  Woops! Airdrop finished. You can buy token on Uniswap
                </p>
              )}
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                {airdropWhitelisted
                  ? `You can take part in Cilistia's airdrop.\
                  Get Airdrop by Clicking Claim Button.`
                  : `In order to participate in Cilistia's airdrop you will\
                  need to have been whitelisted.`}
              </p>
              <ClaimButton />
            </div>
          </div>
          <AirdropInfo />
        </div>
      </div>
      {/* Airdrop Stats Here */}
      <AirdropStatus />
    </div>
  );
};

export default Airdrop;
