import { Signature } from "ethers";

export enum PresaleStatus {
  NOT_STARTED,
  OPEN,
  CLOSED,
}

export type Token = {
  address: `0x${string}`;
  decimals: number;
  symbol: string;
};

export type SignatureRes = {
  result: boolean;
  error?: string;
  signature?: Signature;
};
