import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import { Navbar, Footer } from '@/components/Layout';
import ContextProviders from '@/contexts';

const APP_NAME = 'CIL Presale';
const ALCHEMY_API_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? 'gRk6Rk7lqJsLeybRhCGlyL2LMGD8-CLf';

const { chains, provider, webSocketProvider } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [arbitrum]
      : [goerli]),
  ],
  [
    alchemyProvider({
      apiKey: ALCHEMY_API_KEY,
      priority: 1,
    }),
    publicProvider({ priority: 2 }),
  ]
);

const { wallets } = getDefaultWallets({
  appName: APP_NAME,
  chains,
});

const demoAppInfo = {
  appName: APP_NAME,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        theme={darkTheme({
          accentColor: '#6366f1',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        modalSize='compact'
        appInfo={demoAppInfo}
        chains={chains}
      >
        <ContextProviders>
          <main className='flex flex-col min-h-screen overflow-hidden bg-gray-900'>
            <Navbar />

            {/*  Page content */}
            <div className='grow z-10'>
              <Component {...pageProps} />
            </div>

            <Footer />
          </main>
        </ContextProviders>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
