const ACCEPTED_TOKENS_RECORDS: Record<number, Token[]> = {
  42161: [
    {
      address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      decimals: 6,
      symbol: 'USDT',
    },
  ],
  1337: [
    {
      address: '0xeb1D33F4faE90CA670E8F0AfF88C441f95328A2E',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0x2Cb2A5e72c2ec00114373708F496f8A90D9C59d8',
      decimals: 6,
      symbol: 'USDT',
    },
  ],
  5: [
    {
      address: '0x59109132DcbF98Df1F97F0EB4E6165b182F26c52',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0x17BC4D58c9e9EDCcCBB29b4c18b151dDbaa42a18',
      decimals: 6,
      symbol: 'USDT',
    },
  ],
  1: [
    {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
      symbol: 'USDT',
    },
  ],
};

const CIL_TOKEN_RECORDS: Record<number, Token> = {
  42161: {
    address: '0xCb5133e9dC168bDbeCEe0173FA9dad3fF7DF3610',
    decimals: 18,
    symbol: 'CIL',
  },
  1337: {
    address: '0x58fd26e37e02d2c4ebf324504fcd87dc82adb74f',
    decimals: 18,
    symbol: 'CIL',
  },
  5: {
    address: '0xF39cf81C5172C78B78a3B84873A56394CFCcfB4e',
    decimals: 18,
    symbol: 'CIL',
  },
  1: {
    address: '0x58fd26e37e02d2c4ebf324504fcd87dc82adb74f',
    decimals: 18,
    symbol: 'CIL',
  },
};

export { ACCEPTED_TOKENS_RECORDS, CIL_TOKEN_RECORDS };
