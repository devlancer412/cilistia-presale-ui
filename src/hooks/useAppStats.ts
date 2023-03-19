import { useContext } from 'react';
import { AppStatsContext } from '@/contexts/AppStatsContext';

export const useAppStats = () =>
  useContext(AppStatsContext) as AppStatsContextType;
