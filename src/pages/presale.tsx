import {
  InfoSkeleton,
  ButtonSkeleton,
  StatusSkeleton,
  TimerSkeleton,
} from '@/components/skeletion';
import { PresaleState } from '@/contexts/PresaleContext';
import {
  usePresale,
  useAppStats,
  useCurrentTime,
  usePresaleCountdown,
} from '@/hooks';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
  const { closingTime, openingTime } = usePresale();
  const currentTime = useCurrentTime();
  const { status } = usePresaleCountdown(currentTime, closingTime, openingTime);
  const { presaleWhitelisted } = useAppStats();

  return (
    <>
      <Head>
        <title>Presale | Cilistia</title>
        <meta
          name='description'
          content='Take part in the Cilistia $CIL token sale.'
        />
      </Head>
      <div className='py-24 overflow-hidden sm:py-32'>
        <div className='px-6 mx-auto max-w-7xl lg:px-8'>
          <div className='grid max-w-2xl grid-cols-1 mx-auto gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start'>
            <div className='lg:pt-4 lg:pr-4'>
              <div className='lg:max-w-lg'>
                <Timer />
                {status === PresaleState.CLOSED && (
                  <p className='mt-6 text-lg leading-8 text-center text-gray-600 md:text-start'>
                    Woops! The presale is now over. Thank you all for
                    participating!
                  </p>
                )}
                <p className='mt-6 text-lg leading-8 text-center text-gray-600 md:text-start'>
                  {presaleWhitelisted
                    ? `Your wallet address is eligible to take part in Cilistia's presale.\
                    You may Purchase $CIL Tokens with USDT/USDC.`
                    : `In order to participate in Cilistia's presale your wallet\
                    address has to be whitelisted.`}
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
    </>
  );
};

export default Presale;
