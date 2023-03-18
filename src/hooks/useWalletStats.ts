import { useContext } from 'react';
import { WalletStatsContext } from '@/contexts/WalletStatsContext';

export const useWalletStats = () =>
  useContext(WalletStatsContext) as WalletStatsContextType;
