import { useBalance, useAccount, useContractEvent } from 'wagmi';
import { CIL_TOKEN, NETWORK } from '@/constants';
import { formatAmountWithUnit } from '@/utils/math';
import ERC20Abi from '@/contracts/abis/ERC20.json';
import { useAppStats } from '@/hooks';

const CILBalance = () => {
  const { address } = useAccount();
  const { refetch: refetchHolderCount } = useAppStats();

  const { data, isError, refetch } = useBalance({
    address,
    token: CIL_TOKEN.address,
    suspense: true,
    chainId: NETWORK,
  });

  useContractEvent({
    address: CIL_TOKEN.address,
    abi: ERC20Abi,
    eventName: 'Transfer',
    listener(from, to, value) {
      if (from === address || to === address) {
        refetch();
      }
      setTimeout(() => refetchHolderCount(), 1000);
    },
    chainId: NETWORK,
  });

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <h1 className='text-1x font-bold mr-5 text-white'>
      {data?.formatted && formatAmountWithUnit(parseFloat(data.formatted), 4)}
      <span className='text-cilistia ml-1'>{data?.symbol}</span>
    </h1>
  );
};

export default CILBalance;
