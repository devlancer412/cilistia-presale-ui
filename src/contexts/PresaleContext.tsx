import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BigNumber } from 'ethers';
import { HARD_CAP, NETWORK } from '@/constants';
import { useCurrentTime } from '@/hooks/useCurrentTime';
import {
  useAccount,
  useContract,
  useContractEvent,
  useContractReads,
  useSigner,
} from 'wagmi';

import { contractConfig as presaleContractConfig } from '@/contracts/config/presale';
import { formatUnits, parseUnits, splitSignature } from 'ethers/lib/utils.js';
import { getPresaleSignature } from '@/utils/app';
import { bnToNumber } from '@/utils/math';

export enum PresaleState {
  NOT_STARTED,
  OPEN,
  CLOSED,
}

export const PresaleContext = createContext<PresaleContextType>(
  {} as PresaleContextType
);

type Props = {
  children: ReactNode;
};

const PresaleContextProvider: FC<Props> = ({ children }) => {
  const [status, setStatus] = useState<PresaleState>(PresaleState.NOT_STARTED);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  const currentTime = useCurrentTime();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const { data, refetch } = useContractReads({
    contracts: [
      {
        ...presaleContractConfig,
        functionName: 'openingTime',
        chainId: NETWORK,
      },
      {
        ...presaleContractConfig,
        functionName: 'closingTime',
        chainId: NETWORK,
      },
      {
        ...presaleContractConfig,
        functionName: 'balance',
        chainId: NETWORK,
      },
      {
        ...presaleContractConfig,
        functionName: 'pricePerCIL',
        chainId: NETWORK,
      },
    ],
    suspense: true,
    select: (rawData) => {
      const isMultiCallFailed = rawData.indexOf(null) > -1;
      if (!isMultiCallFailed) {
        const rawOpeningTime = rawData[0] as number;
        const rawClosingTime = rawData[1] as number;
        const rawBalance = rawData[2] as BigNumber;
        const rawPrice = rawData[3] as BigNumber;

        return {
          openingTime: rawOpeningTime,
          closingTime: rawClosingTime,
          sold: HARD_CAP - bnToNumber(rawBalance),
          price: bnToNumber(rawPrice, 2),
        };
      }
    },
    onError: (err) => {
      console.log(err);
    },
    allowFailure: true,
  });

  const presaleContract = useContract({
    ...presaleContractConfig,
    signerOrProvider: signer,
  });

  const purchase = useCallback(
    async (amount: number, token: Token) => {
      if (!address || !presaleContract) {
        throw Error('Please connect your wallet');
      }
      const amountBN = parseUnits(amount.toString(), token.decimals);

      const signatureRes = await getPresaleSignature(
        address,
        amountBN.toString(),
        token.symbol
      );

      if (!signatureRes.result) {
        return;
      }

      const sign = splitSignature(signatureRes.signature!);

      return presaleContract.buy(amountBN, token.symbol, {
        r: sign.r,
        s: sign.s,
        v: sign.v,
      });
    },
    [address, presaleContract]
  );

  useContractEvent({
    ...presaleContractConfig,
    eventName: 'Buy',
    listener(_executor, _tokenNameToDeposit, _deposit, _withdraw) {
      refetch();
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    if (currentTime < data.openingTime) {
      setStatus(PresaleState.NOT_STARTED);
      setRemainingSeconds(data.openingTime - currentTime);
    } else if (
      currentTime < data.closingTime &&
      currentTime >= data.openingTime
    ) {
      setStatus(PresaleState.OPEN);
      setRemainingSeconds(data.closingTime - currentTime);
    } else {
      setStatus(PresaleState.CLOSED);
    }
  }, [currentTime, data]);

  return (
    <PresaleContext.Provider
      value={{
        status,
        remainingSeconds,
        total: HARD_CAP,
        sold: data?.sold,
        price: data?.price,
        purchase,
      }}
    >
      {children}
    </PresaleContext.Provider>
  );
};

export default PresaleContextProvider;
