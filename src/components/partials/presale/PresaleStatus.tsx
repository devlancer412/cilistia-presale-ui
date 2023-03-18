import { HARD_CAP } from '@/constants';
import { usePresale } from '@/hooks';
import { formatAmountWithUnit } from '@/utils/math';

const PresaleStatus = () => {
  const { price, sold } = usePresale();

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
        </div>
      </div>
    </div>
  );
};

export default PresaleStatus;
