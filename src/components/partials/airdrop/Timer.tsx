import { useEffect, useState } from 'react';
import { AirdropState } from '@/contexts/AirdropContext';
import { useAirdrop } from '@/hooks';

const Timer = () => {
  const { status, remainingSeconds } = useAirdrop();
  const [timeInfo, setTimeInfo] = useState('00:00:00:00');

  const title = () => {
    if (status === AirdropState.NOT_STARTED) return 'Airdrop starts in';
    else if (status === AirdropState.OPEN) return 'Airdrop closes in';
    else return 'Airdrop closed';
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
    <p className='mt-2 text-3xl font-bold tracking-tight text-slate-300 sm:text-4xl'>
      {title() + ': ' + timeInfo}
    </p>
  );
};

export default Timer;