import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { Navbar } from "@/components";
import MainProvider from "@/contexts/MainProvider";
import { NETWORK } from "@/constants";

const chains = [goerli];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "6564b5b61cd43ac4ff2274800368753a" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "6564b5b61cd43ac4ff2274800368753a",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <MainProvider>
          <Navbar />
          <Component {...pageProps} />
        </MainProvider>
      </WagmiConfig>

      <Web3Modal
        projectId="6564b5b61cd43ac4ff2274800368753a"
        ethereumClient={ethereumClient}
      />
    </>
  );
}
