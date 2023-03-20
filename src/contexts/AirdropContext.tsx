import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import { BigNumber } from 'ethers';
import { NETWORK } from '@/constants';
import {
  useAccount,
  useContract,
  useContractEvent,
  useContractReads,
  useSigner,
} from 'wagmi';

import { contractConfig as airdropContractConfig } from '@/contracts/config/airdrop';
import { formatUnits, splitSignature } from 'ethers/lib/utils.js';
import { getAirdropSignature } from '@/utils/app';
import { toast } from 'react-hot-toast';

export enum AirdropState {
  NOT_STARTED,
  OPEN,
  CLOSED,
}

export const AirdropContext = createContext<AirdropContextType>(
  {} as AirdropContextType
);

type Props = {
  children: ReactNode;
};

const AirdropContextProvider: FC<Props> = ({ children }) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const { data, refetch } = useContractReads({
    contracts: [
      {
        ...airdropContractConfig,
        functionName: 'openingTime',
        chainId: NETWORK,
      },
      {
        ...airdropContractConfig,
        functionName: 'closingTime',
        chainId: NETWORK,
      },
      {
        ...airdropContractConfig,
        functionName: 'claimAmountPerWallet',
        chainId: NETWORK,
      },
      {
        ...airdropContractConfig,
        functionName: 'ogNumber',
        chainId: NETWORK,
      },
      {
        ...airdropContractConfig,
        functionName: 'lastClaimedTime',
        args: [address],
        chainId: NETWORK,
      },
    ],
    suspense: true,
    select: (rawData) => {
      const isMultiCallFailed = rawData.indexOf(null) > -1;
      if (!isMultiCallFailed) {
        const rawOpeningTime = rawData[0] as number;
        const rawClosingTime = rawData[1] as number;
        const rawClaimAmountPerWallet = rawData[2] as BigNumber;
        const rawOgNaumber = rawData[3] as number;
        const rawLastClaimedTime = rawData[4] as BigNumber;

        return {
          openingTime: rawOpeningTime,
          closingTime: rawClosingTime,
          ogNumber: rawOgNaumber,
          claimAmountPerWallet: parseFloat(
            formatUnits(rawClaimAmountPerWallet)
          ),
          lastClaimedTime: rawLastClaimedTime.toNumber(),
        };
      }

      if (address) {
        toast.error('Failed to fetch airdrop details');
      }
    },
    onError: (err) => {
      console.log(err);
    },
    allowFailure: true,
  });

  const airdropContract = useContract({
    ...airdropContractConfig,
    signerOrProvider: signer,
  });

  const claim = useCallback(async () => {
    if (!address || !airdropContract) {
      throw Error('Please connect your wallet');
    }

    try {
      const signatureRes = await getAirdropSignature(address);

      if (!signatureRes.result) {
        return;
      }

      const sign = splitSignature(signatureRes.signature!);

      return airdropContract.claim({
        r: sign.r,
        s: sign.s,
        v: sign.v,
      });
    } catch (err: any) {
      console.log(err);

      throw Error(err?.message && err?.reason);
    }
  }, [address, airdropContract]);

  useContractEvent({
    ...airdropContractConfig,
    eventName: 'Claimed',
    listener(to, amount) {
      if (to == address) {
        refetch();
      }
    },
  });

  return (
    <AirdropContext.Provider
      value={{
        openingTime: data?.openingTime,
        closingTime: data?.closingTime,
        claimAmountPerWallet: data?.claimAmountPerWallet,
        ogNumber: data?.ogNumber,
        lastClaimedTime: data?.lastClaimedTime,
        claim,
      }}
    >
      {children}
    </AirdropContext.Provider>
  );
};

export default AirdropContextProvider;
