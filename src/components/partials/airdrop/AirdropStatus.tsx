import {
  useAirdrop,
  useAirdropCountdown,
  useAppStats,
  useCurrentTime,
} from '@/hooks';
import { formatAmountWithUnit } from '@/utils/math';
import { usePresale } from '@/hooks/usePresale';
import { ADAY } from '@/constants';
import { toHumanReadableDateTime } from '@/utils/time';
import { AirdropState } from '@/contexts/AirdropContext';

const AirdropStatus = () => {
  const { totalHolderCount } = useAppStats();
  const { price } = usePresale();
  const currentTime = useCurrentTime();
  const { claimAmountPerWallet, lastClaimedTime, openingTime, closingTime } =
    useAirdrop();
  const { canClaim } = useAirdropCountdown(
    currentTime,
    lastClaimedTime,
    closingTime,
    openingTime
  );

  return (
    <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
      <div className='flex flex-col p-8 bg-white/5'>
        <dt className='text-sm font-semibold leading-6 text-gray-300'>
          Token Holders
        </dt>
        <dd className='order-first text-2xl font-semibold tracking-tight text-white uppercase'>
          {totalHolderCount ? formatAmountWithUnit(totalHolderCount, 2) : '-'}
        </dd>
      </div>
      <div className='flex flex-col p-8 bg-white/5'>
        <dt className='text-sm font-semibold leading-6 text-gray-300'>
          Token Price
        </dt>
        <dd className='order-first text-2xl font-semibold tracking-tight text-white uppercase'>
          {price ? '$' + price : '-'}
        </dd>
      </div>
      <div className='flex flex-col p-8 bg-white/5'>
        <dt className='text-sm font-semibold leading-6 text-gray-300'>
          Airdrop Amount Per Claim
        </dt>
        <dd className='order-first text-2xl font-semibold tracking-tight text-white uppercase'>
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
          Next Claim
        </dt>
        <dd className='order-first text-2xl font-semibold tracking-tight text-white'>
          {canClaim
            ? lastClaimedTime !== undefined
              ? currentTime > lastClaimedTime + ADAY
                ? 'Available Now'
                : toHumanReadableDateTime(lastClaimedTime + ADAY)
              : '-'
            : 'Not Available'}
        </dd>
      </div>
    </dl>
  );
};

export default AirdropStatus;
