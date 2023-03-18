import { getWhitelistStatus } from '@/utils/app';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export const WalletStatsContext = createContext<WalletStatsContextType | null>(
  null
);

const WalletStatsContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { address } = useAccount();
  const [presaleWhitelisted, setPresaleWhitelisted] = useState<boolean>(false);
  const [airdropWhitelisted, setAirdropWhitelisted] = useState<boolean>(false);

  // Set up the timeout.
  useEffect(() => {
    if (!address) {
      return;
    }

    getWhitelistStatus(address).then((res) => {
      setPresaleWhitelisted(res.presale);
      setAirdropWhitelisted(res.airdrop);
    });
  }, [address]);

  return (
    <WalletStatsContext.Provider value={{ presaleWhitelisted, airdropWhitelisted }}>
      {children}
    </WalletStatsContext.Provider>
  );
};

export default WalletStatsContextProvider;
