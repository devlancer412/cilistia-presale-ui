import { Token } from "@/types";
export { default as WHITELISTS } from "./whitelists";

export const START_TIME = 1676095200;
export const CLOSE_TIME = 1677304800;
export const CLI_PRICE = 8;
export const HARD_CAP = 50_000;
export const NETWORK = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 1);
export const TOKENS: Record<number, Token[]> = {
  5: [
    {
      address: "0xeb1D33F4faE90CA670E8F0AfF88C441f95328A2E",
      decimals: 6,
      symbol: "USDC",
    },
    {
      address: "0x2Cb2A5e72c2ec00114373708F496f8A90D9C59d8",
      decimals: 6,
      symbol: "USDT",
    },
  ],
  1: [
    {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      decimals: 6,
      symbol: "USDC",
    },
    {
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      decimals: 6,
      symbol: "USDT",
    },
  ],
};

export const CIL_TOKEN: Record<number, Token> = {
  5: {
    address: "0x4e95b3D57ef36c20271F31De1c0068e0253da22f",
    decimals: 18,
    symbol: "CIL",
  },
  1: {
    address: "",
    decimals: 18,
    symbol: "CIL",
  },
};

export const PRESALE_ADDRESS: Record<number, string> = {
  5: "0xc9EEE0ba55c3035EB0a7a687c8fAB0E6e283a9F7",
  1: "",
};
