import { useEffect, useState } from 'react';
import { AirdropState } from '@/contexts/AirdropContext';
import { ADAY } from '@/constants';

export const useAirdropCountdown = (
  currentTime: number,
  lastClaimedTime: number | undefined,
  closingTime: number | undefined,
  openingTime: number | undefined
) => {
  const [status, setStatus] = useState<AirdropState>(AirdropState.NOT_STARTED);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  useEffect(() => {
    if (closingTime === undefined || openingTime === undefined) {
      return;
    }

    if (currentTime < openingTime) {
      setStatus(AirdropState.NOT_STARTED);
      setRemainingSeconds(openingTime - currentTime);
    } else if (currentTime < closingTime && currentTime >= openingTime) {
      setStatus(AirdropState.OPEN);
      setRemainingSeconds(closingTime - currentTime);
    } else {
      setStatus(AirdropState.CLOSED);
    }
  }, [currentTime, closingTime, openingTime]);
  return {
    remainingSeconds,
    status,
    canClaim: currentTime > (lastClaimedTime ?? 0) + ADAY,
  };
};
