import { useEffect, useState } from 'react';
import { AirdropState } from '@/contexts/AirdropContext';
import { useAirdrop, useAirdropCountdown } from '@/hooks';
import { useCurrentTime } from '@/hooks';

const Timer = () => {
  const { lastClaimedTime, closingTime, openingTime, airdropTitle } =
    useAirdrop();
  const currentTime = useCurrentTime();
  const { status, remainingSeconds } = useAirdropCountdown(
    currentTime,
    lastClaimedTime,
    closingTime,
    openingTime
  );
  const [timeInfo, setTimeInfo] = useState('00:00:00:00');

  const title = () => {
    if (status === AirdropState.NOT_STARTED)
      return `${airdropTitle} Airdrop starts in`;
    else if (status === AirdropState.OPEN)
      return `${airdropTitle} Airdrop closes in`;
    else return `${airdropTitle} Airdrop closed`;
  };

  useEffect(() => {
    if (status === AirdropState.CLOSED) {
      setTimeInfo('00:00:00:00');
    }
    let _remainingTime = remainingSeconds;
    const seconds = _remainingTime % 60;

    _remainingTime = Math.floor(_remainingTime / 60);

    const minutes = _remainingTime % 60;

    _remainingTime = Math.floor(_remainingTime / 60);

    const hours = _remainingTime % 24;

    const days = Math.floor(_remainingTime / 24);

    setTimeInfo(
      `${(days < 10 ? '0' : '') + days}:${(hours < 10 ? '0' : '') + hours}:${
        (minutes < 10 ? '0' : '') + minutes
      }:${(seconds < 10 ? '0' : '') + seconds}`
    );
  }, [remainingSeconds, status]);

  return (
    <p className='mt-2 text-3xl font-bold tracking-tight text-slate-300 sm:text-4xl text-center md:text-start'>
      {title() + ': ' + timeInfo}
    </p>
  );
};

export default Timer;
