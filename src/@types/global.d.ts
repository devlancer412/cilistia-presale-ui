type Token = {
  address: `0x${string}`;
  decimals: number;
  symbol: string;
};

type SignatureRes = {
  result: boolean;
  error?: string;
  signature?: Signature;
};

interface PresaleContextType {
  openingTime?: number;
  closingTime?: number;
  total: number;
  sold?: number;
  price?: number;
  purchase: (amount: number, token: Token) => Promise<any> | undefined;
}

interface AppStatsContextType {
  presaleWhitelisted: boolean;
  airdropWhitelisted: boolean;
  totalHolderCount?: number;
  refetch: () => Promise<void>;
}

interface AirdropContextType {
  openingTime?: number;
  closingTime?: number;
  claimAmountPerWallet?: number;
  ogNumber?: number;
  lastClaimedTime?: number;
  claim: () => Promise<any> | undefined;
}
