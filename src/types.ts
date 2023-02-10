export enum PresaleStatus {
  NOT_STARTED,
  OPEN,
  CLOSED,
}

export type Token = {
  address: string;
  decimals: number;
  symbol: string;
};

export type SignatureRes = {
  result: boolean;
  error?: string;
  signature?: string;
};
