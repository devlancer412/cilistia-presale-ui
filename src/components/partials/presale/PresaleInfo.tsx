import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HARD_CAP } from '@/constants';
import GradientSVG from '@/components/gradientSVG';
import { usePresale } from '@/hooks';
import { formatAmountWithUnit } from '@/utils/math';

const PresaleInfo = () => {
  const { sold } = usePresale();

  const percentage = () => {
    return ((sold ?? 0) * 100) / HARD_CAP;
  };

  return (
    <div className='flex flex-col items-center w-full space-y-2'>
      <div className='relative h-72 w-72 md:h-96 md:w-96'>
        <GradientSVG />
        <CircularProgressbar
          value={percentage()}
          strokeWidth={4}
          styles={{
            path: { stroke: `url(#hello)`, height: '100%' },
            trail: {
              stroke: '#141a2c',
            },
          }}
        />
        <div className='absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full p-4'>
          {sold && (
            <span className='pb-2 text-3xl font-medium text-white'>
              {formatAmountWithUnit(sold as number, 2)}
            </span>
          )}
          <span className='font-medium text-md text-slate-500'>
            / {HARD_CAP} CIL
          </span>
        </div>
      </div>
    </div>
  );
};

export default PresaleInfo;
