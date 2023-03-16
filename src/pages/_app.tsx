import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { Navbar } from "@/components";
import PresaleProvider from "@/contexts/PresaleProvider";

const APP_NAME = "CIL Presale";
const ALCHEMY_API_KEY = "0JEq-KhcQzIlX1he9eJuWWfhAa-Nf0sg";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [
    alchemyProvider({
      apiKey: ALCHEMY_API_KEY,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
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
    groupName: "Other",
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
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
        modalSize="compact"
        appInfo={demoAppInfo}
        chains={chains}
      >
        <PresaleProvider>
          <main className="bg-primary flex flex-col h-screen w-screen text-primary">
            <Navbar />
            <Component {...pageProps} />
          </main>
        </PresaleProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
