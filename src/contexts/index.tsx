import { FC, PropsWithChildren } from 'react';
import CurrentTimeContextProvider from './CurrentTimeContext';
import PresaleContextProvider from './PresaleContext';
import AppStatsContextProvider from './AppStatsContext';
import AirdropContextProvider from './AirdropContext';

const ContextProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CurrentTimeContextProvider>
      <AppStatsContextProvider>
        <PresaleContextProvider>
          <AirdropContextProvider>{children}</AirdropContextProvider>
        </PresaleContextProvider>
      </AppStatsContextProvider>
    </CurrentTimeContextProvider>
  );
};

export default ContextProviders;
