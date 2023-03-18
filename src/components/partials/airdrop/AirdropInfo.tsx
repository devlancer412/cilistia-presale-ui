import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ADAY } from '@/constants';
import GradientSVG from '@/components/gradientSVG';
import { useAirdrop, useCurrentTime } from '@/hooks';
import { formatAmountWithUnit } from '@/utils/math';

const AirdropInfo = () => {
  const currentTime = useCurrentTime();
  const { lastClaimedTime, claimAmountPerWallet, canClaim } = useAirdrop();
  const [timeInfo, setTimeInfo] = useState<string>('');

  const percentage = () => {
    return canClaim
      ? 100
      : lastClaimedTime
      ? (currentTime - lastClaimedTime) / ADAY
      : 0;
  };

  useEffect(() => {
    if (!currentTime || !lastClaimedTime || canClaim) {
      setTimeInfo('00:00:00');
      return;
    }

    let _remainingTime = ADAY + lastClaimedTime - currentTime;
    const seconds = _remainingTime % 60;

    _remainingTime = Math.floor(_remainingTime / 60);

    const minutes = _remainingTime % 60;

    _remainingTime = Math.floor(_remainingTime / 60);

    const hours = _remainingTime % 24;

    setTimeInfo(
      `${(hours < 10 ? '0' : '') + hours}:${
        (minutes < 10 ? '0' : '') + minutes
      }:${(seconds < 10 ? '0' : '') + seconds}`
    );
  }, [currentTime, lastClaimedTime, canClaim]);

  return (
    <div className='flex flex-col w-full items-center space-y-2'>
      <div className='h-96 w-96 relative'>
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
        <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4'>
          <span className='text-5xl font-medium text-white pb-2'>
            {timeInfo}
          </span>
          <span className='text-md font-medium text-slate-500'>
            {claimAmountPerWallet
              ? `(${formatAmountWithUnit(
                  claimAmountPerWallet,
                  6
                )}CIL Per Claim)`
              : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AirdropInfo;
