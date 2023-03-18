import { FC, PropsWithChildren } from 'react';
import CurrentTimeContextProvider from './CurrentTimeContext';
import PresaleContextProvider from './PresaleContext';
import WalletStatsContextProvider from './WalletStatsContext';
import AirdropContextProvider from './AirdropContext';

const ContextProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CurrentTimeContextProvider>
      <WalletStatsContextProvider>
        <PresaleContextProvider>
          <AirdropContextProvider>{children}</AirdropContextProvider>
        </PresaleContextProvider>
      </WalletStatsContextProvider>
    </CurrentTimeContextProvider>
  );
};

export default ContextProviders;
