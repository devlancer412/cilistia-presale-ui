import { useEffect, useState } from 'react';
import { PresaleState } from '@/contexts/PresaleContext';
import { usePresale } from '@/hooks';
import { usePresaleCountdown } from '@/hooks/usePresaleCountdown';
import { useCurrentTime } from '@/hooks';

const Timer = () => {
  const { closingTime, openingTime } = usePresale();
  const currentTime = useCurrentTime();
  const { status, remainingSeconds } = usePresaleCountdown(
    currentTime,
    closingTime,
    openingTime
  );
  const [timeInfo, setTimeInfo] = useState('00:00:00:00');

  const title = () => {
    if (status === PresaleState.NOT_STARTED) return 'Presale starts in';
    else if (status === PresaleState.OPEN) return 'Presale closes in';
    else return 'Presale closed';
  };

  useEffect(() => {
    if (status === PresaleState.CLOSED) {
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
