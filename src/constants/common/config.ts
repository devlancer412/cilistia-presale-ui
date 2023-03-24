const PROVIDER_RECORDS: Record<number, string> = {
  42161:
    'https://arb-mainnet.g.alchemy.com/v2/6sRA9AxrHpx5twRUCOI7kWrPSYtj-NNk',
  1337: 'http://127.0.0.1:8545/',
  5: 'https://eth-goerli.g.alchemy.com/v2/gRk6Rk7lqJsLeybRhCGlyL2LMGD8-CLf',
  1: 'https://rpc.ankr.com/eth',
};

const EXPLORER_RECORDS: Record<number, string> = {
  42161: 'https://arbiscan.io/',
  1337: 'http://127.0.0.1:8545/',
  5: 'https://goerli.etherscan.io/',
  1: 'https://etherscan.io/',
};

const NETWORK = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 5);

console.log(NETWORK);

export { PROVIDER_RECORDS, EXPLORER_RECORDS, NETWORK };
