import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BigNumber } from 'ethers';
import { ADAY, NETWORK } from '@/constants';
import { useCurrentTime } from '@/hooks/useCurrentTime';
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
  const [status, setStatus] = useState<AirdropState>(AirdropState.NOT_STARTED);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  const currentTime = useCurrentTime();
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

  useEffect(() => {
    if (!data) {
      return;
    }

    if (currentTime < data.openingTime) {
      setStatus(AirdropState.NOT_STARTED);
      setRemainingSeconds(data.openingTime - currentTime);
    } else if (
      currentTime < data.closingTime &&
      currentTime >= data.openingTime
    ) {
      setStatus(AirdropState.OPEN);
      setRemainingSeconds(data.closingTime - currentTime);
    } else {
      setStatus(AirdropState.CLOSED);
    }
  }, [currentTime, data]);

  return (
    <AirdropContext.Provider
      value={{
        status,
        remainingSeconds,
        canClaim: currentTime > (data?.lastClaimedTime ?? 0) + ADAY,
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
