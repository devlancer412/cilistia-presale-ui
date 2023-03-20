import {
  InfoSkeleton,
  ButtonSkeleton,
  StatusSkeleton,
  TimerSkeleton,
} from '@/components/skeletion';
import { PresaleState } from '@/contexts/PresaleContext';
import { usePresale, useAppStats } from '@/hooks';
import dynamic from 'next/dynamic';

const PurchaseButton = dynamic(
  () => import('@/components/partials/presale/PurchaseButton'),
  {
    ssr: false,
    loading: () => <ButtonSkeleton />,
  }
);

const Timer = dynamic(() => import('@/components/partials/presale/Timer'), {
  ssr: false,
  loading: () => <TimerSkeleton />,
});

const PresaleInfo = dynamic(
  () => import('@/components/partials/presale/PresaleInfo'),
  {
    ssr: false,
    loading: () => <InfoSkeleton />,
  }
);
const PresaleStatus = dynamic(
  () => import('@/components/partials/presale/PresaleStatus'),
  {
    ssr: false,
    loading: () => <StatusSkeleton />,
  }
);

const Presale = () => {
  const { status } = usePresale();
  const { presaleWhitelisted } = useAppStats();

  return (
    <div className='py-24 overflow-hidden sm:py-32'>
      <div className='px-6 mx-auto max-w-7xl lg:px-8'>
        <div className='grid max-w-2xl grid-cols-1 mx-auto gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start'>
          <div className='lg:pt-4 lg:pr-4'>
            <div className='lg:max-w-lg'>
              <Timer />
              {status === PresaleState.CLOSED && (
                <p className='mt-6 text-lg leading-8 text-gray-600 text-center md:text-start'>
                  Woops! Presale finished. You can buy token on Uniswap
                </p>
              )}
              <p className='mt-6 text-lg leading-8 text-gray-600 text-center md:text-start'>
                {presaleWhitelisted
                  ? `You can take part in Cilistia's presale.\
                  Purchase CIL Token with USDT/USDC.`
                  : `In order to participate in Cilistia's presale you will\
                  need to have been whitelisted.`}
              </p>
              <PurchaseButton />
            </div>
          </div>
          <PresaleInfo />
        </div>
      </div>
      {/* Presale Stats Here */}
      <div className='!pt-4 bg-gray-900 pb-4'>
        <div className='px-6 mx-auto max-w-7xl lg:px-8'>
          <div className='max-w-2xl mx-auto lg:max-w-none'>
            <PresaleStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presale;
