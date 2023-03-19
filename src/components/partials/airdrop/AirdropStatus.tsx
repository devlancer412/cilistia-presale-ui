import { useAirdrop, useCurrentTime } from '@/hooks';
import { formatAmountWithUnit } from '@/utils/math';
import { usePresale } from '@/hooks/usePresale';
import { ADAY } from '@/constants';
import { toHumanReadableDateTime } from '@/utils/time';

const AirdropStatus = () => {
  const { price } = usePresale();
  const currentTime = useCurrentTime();
  const { claimAmountPerWallet, lastClaimedTime } = useAirdrop();

  return (
    <div className='!pt-4 bg-gray-900 pb-4'>
      <div className='px-6 mx-auto max-w-7xl lg:px-8'>
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
            <div className='flex flex-col p-8 bg-white/5'>
              <dt className='text-sm font-semibold leading-6 text-gray-300'>
                Token Holders
              </dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-white uppercase'>
                -
              </dd>
            </div>
            <div className='flex flex-col p-8 bg-white/5'>
              <dt className='text-sm font-semibold leading-6 text-gray-300'>
                Token Price
              </dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-white uppercase'>
                {price ? '$' + price : '-'}
              </dd>
            </div>
            <div className='flex flex-col p-8 bg-white/5'>
              <dt className='text-sm font-semibold leading-6 text-gray-300'>
                Airdrop Amount Per Claim
              </dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-white uppercase'>
                {price !== undefined && claimAmountPerWallet !== undefined
                  ? formatAmountWithUnit(claimAmountPerWallet, 4) +
                    ' (' +
                    '$' +
                    formatAmountWithUnit(claimAmountPerWallet * price, 4) +
                    ')'
                  : '-'}
              </dd>
            </div>
            <div className='flex flex-col p-8 bg-white/5'>
              <dt className='text-sm font-semibold leading-6 text-gray-300'>
                Next Claimable Time
              </dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-white'>
                {lastClaimedTime !== undefined
                  ? currentTime > lastClaimedTime + ADAY
                    ? 'Available Now'
                    : toHumanReadableDateTime(lastClaimedTime + ADAY)
                  : '-'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default AirdropStatus;
