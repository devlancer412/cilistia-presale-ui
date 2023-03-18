import { useContext } from 'react';
import { AirdropContext } from '@/contexts/AirdropContext';

export const useAirdrop = () =>
  useContext(AirdropContext) as AirdropContextType;
