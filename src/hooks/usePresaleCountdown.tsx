import { useEffect, useState } from 'react';
import { PresaleState } from '@/contexts/PresaleContext';

export const usePresaleCountdown = (
  currentTime: number,
  closingTime: number | undefined,
  openingTime: number | undefined
) => {
  const [status, setStatus] = useState<PresaleState>(PresaleState.NOT_STARTED);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  useEffect(() => {
    if (closingTime === undefined || openingTime === undefined) {
      return;
    }

    if (currentTime < openingTime) {
      setStatus(PresaleState.NOT_STARTED);
      setRemainingSeconds(openingTime - currentTime);
    } else if (currentTime < closingTime && currentTime >= openingTime) {
      setStatus(PresaleState.OPEN);
      setRemainingSeconds(closingTime - currentTime);
    } else {
      setStatus(PresaleState.CLOSED);
    }
  }, [currentTime, closingTime, openingTime]);
  return {
    remainingSeconds,
    status,
  };
};
