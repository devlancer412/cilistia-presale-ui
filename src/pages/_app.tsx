import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
import { mainnet, goerli, localhost, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { Navbar } from "@/components";
import PresaleProvider from "@/contexts/PresaleProvider";

const APP_NAME = "CIL Presale";
const ALCHEMY_API_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? "6sRA9AxrHpx5twRUCOI7kWrPSYtj-NNk";

const { chains, provider, webSocketProvider } = configureChains(
  [
    // localhost,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli]
      : [arbitrum]),
  ],
  [
    // jsonRpcProvider({
    //   priority: 0,
    //   rpc: (chain) => ({
    //     http: `http://127.0.0.1:8545/`,
    //   }),
    // }),
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
  const [queryClient] = useState<QueryClient>(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            coolMode
            theme={darkTheme({
              accentColor: "#6366f1",
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
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
