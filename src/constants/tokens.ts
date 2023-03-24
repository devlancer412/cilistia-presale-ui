const ACCEPTED_TOKENS_RECORDS: Record<number, Token[]> = {
  42161: [
    {
      address: '0xEB590e5A96CD0E943A0899412E4fB06e0B362a7f',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0x94aD46632DDDF560b20bec57F6Aeed8AD9CF7561',
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
      address: '0xEB590e5A96CD0E943A0899412E4fB06e0B362a7f',
      decimals: 6,
      symbol: 'USDC',
    },
    {
      address: '0x94aD46632DDDF560b20bec57F6Aeed8AD9CF7561',
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
    address: '0x54D8b98FA53ce1637FC3E204892cDee18C197572',
    decimals: 18,
    symbol: 'CIL',
  },
  1337: {
    address: '0x58fd26e37e02d2c4ebf324504fcd87dc82adb74f',
    decimals: 18,
    symbol: 'CIL',
  },
  5: {
    address: '0x54D8b98FA53ce1637FC3E204892cDee18C197572',
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
