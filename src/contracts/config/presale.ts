import PresaleABI from '../abis/Presale.json';
import { PRESALE_CONTRACT_ADDRESS } from '@/constants';

const contractConfig = {
  address: PRESALE_CONTRACT_ADDRESS as `0x${string}`,
  abi: PresaleABI,
};

export { contractConfig };
