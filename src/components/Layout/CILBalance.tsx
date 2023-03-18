import { useBalance, useAccount, useContractEvent } from 'wagmi';
import { CIL_TOKEN } from '@/constants';
import { fourDp } from '@/utils/math';
import ERC20Abi from '@/contracts/abis/ERC20.json';

const CILBalance = () => {
  const { address } = useAccount();
  const { data, isError, refetch } = useBalance({
    address,
    token: CIL_TOKEN.address,
    suspense: true,
  });

  useContractEvent({
    address: CIL_TOKEN.address,
    abi: ERC20Abi,
    eventName: 'Transfer',
    listener(from, to, value) {
      if (from === address || to === address) {
        refetch();
      }
    },
  });

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <h1 className='text-1x font-bold mr-5 text-white'>
      {data?.formatted && fourDp(data.formatted)}
      <span className='text-cilistia ml-1'>{data?.symbol}</span>
    </h1>
  );
};

export default CILBalance;
