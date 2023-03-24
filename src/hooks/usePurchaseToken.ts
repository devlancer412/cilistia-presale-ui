import { useCallback, useEffect } from 'react';
import {
  useAccount,
  useContractEvent,
  useContract,
  useContractReads,
  useSigner,
} from 'wagmi';
import ERC20Abi from '@/contracts/abis/ERC20.json';
import { NETWORK, PRESALE_CONTRACT_ADDRESS } from '@/constants';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { bnToNumber } from '@/utils/math';

export const usePurchaseToken = (token: Token) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const contractConfig = {
    address: token.address,
    abi: ERC20Abi,
  };

  const { data, refetch } = useContractReads({
    contracts: [
      {
        ...contractConfig,
        functionName: 'balanceOf',
        args: [address],
        chainId: NETWORK,
      },
      {
        ...contractConfig,
        functionName: 'allowance',
        args: [address, PRESALE_CONTRACT_ADDRESS],
        chainId: NETWORK,
      },
    ],
    suspense: false,
    select: (rawData) => {
      const isMultiCallFailed = rawData.indexOf(null) > -1;
      if (!isMultiCallFailed) {
        const balance = rawData[0] as BigNumber;
        const allowance = rawData[1] as BigNumber;

        return {
          balance: bnToNumber(balance, token.decimals),
          allowance: bnToNumber(allowance, token.decimals),
        };
      }
    },
    onError: (err) => {
      console.log(err);
    },
    allowFailure: true,
  });

  useContractEvent({
    ...contractConfig,
    eventName: 'Transfer',
    listener(from, to, value) {
      if (from === address || to === address) {
        refetch();
      }
    },
  });

  useContractEvent({
    ...contractConfig,
    eventName: 'Approval',
    listener(owner, spender, value) {
      if (owner === address && spender === PRESALE_CONTRACT_ADDRESS) {
        refetch();
      }
    },
  });

  const contract = useContract({
    ...contractConfig,
    signerOrProvider: signer,
  });

  const approve = useCallback(
    async (amount: number) => {
      if (!contract) {
        throw Error('Please connect your wallet');
      }
      const amountBN = parseUnits(amount.toString(), token.decimals);

      return contract.approve(PRESALE_CONTRACT_ADDRESS, amountBN);
    },
    [contract, token.decimals]
  );

  return {
    balance: data?.balance ?? 0,
    allowance: data?.allowance ?? 0,
    approve,
  };
};
