import { HARD_CAP } from '@/constants';
import { useAppStats, usePresale } from '@/hooks';
import { formatAmountWithUnit } from '@/utils/math';

const PresaleStatus = () => {
  const { totalHolderCount } = useAppStats();
  const { price, sold } = usePresale();

  return (
    <dl className='mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
      <div className='flex flex-col p-8 bg-white/5'>
        <dt className='text-sm font-semibold leading-6 text-gray-300'>
          Token Holders
        </dt>
        <dd className='order-first text-3xl font-semibold tracking-tight text-white uppercase'>
          {totalHolderCount ? formatAmountWithUnit(totalHolderCount, 2) : '-'}
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
          Total Presale Amount
        </dt>
        <dd className='order-first text-3xl font-semibold tracking-tight text-white uppercase'>
          {formatAmountWithUnit(HARD_CAP, 2) +
            ' (' +
            (price !== undefined
              ? '$' + formatAmountWithUnit(HARD_CAP * price, 2)
              : '-') +
            ')'}
        </dd>
      </div>
      <div className='flex flex-col p-8 bg-white/5'>
        <dt className='text-sm font-semibold leading-6 text-gray-300'>
          Remaining Amount
        </dt>
        <dd className='order-first text-3xl font-semibold tracking-tight text-white uppercase'>
          {price !== undefined && sold !== undefined
            ? formatAmountWithUnit(HARD_CAP - sold, 2) +
              ' ($' +
              formatAmountWithUnit((HARD_CAP - sold) * price, 2) +
              ')'
            : '-'}
        </dd>
      </div>
    </dl>
  );
};

export default PresaleStatus;
