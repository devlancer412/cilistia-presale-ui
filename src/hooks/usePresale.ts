import { useContext } from 'react';
import { PresaleContext } from '@/contexts/PresaleContext';

export const usePresale = () =>
  useContext(PresaleContext) as PresaleContextType;
