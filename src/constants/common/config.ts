const PROVIDER_RECORDS: Record<number, string> = {
  1337: "",
  5: "https://rpc.ankr.com/eth_goerli",
  1: "https://rpc.ankr.com/eth",
};

const EXPLORER_RECORDS: Record<number, string> = {
  1337: "http://127.0.0.1:8545/",
  5: "https://goerli.etherscan.io/",
  1: "https://etherscan.io/",
};

const NETWORK = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1);

export { PROVIDER_RECORDS, EXPLORER_RECORDS, NETWORK };
