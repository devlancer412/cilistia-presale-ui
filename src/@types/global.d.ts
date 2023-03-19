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
  status: PresaleState;
  remainingSeconds: number;
  total: number;
  sold?: number;
  price?: number;
  purchase: (amount: number, token: Token) => Promise<any> | undefined;
}

interface WalletStatsContextType {
  presaleWhitelisted: boolean;
  airdropWhitelisted: boolean;
}

interface AirdropContextType {
  status: AirdropStatus;
  remainingSeconds: number;
  canClaim: boolean;
  claimAmountPerWallet?: number;
  ogNumber?: number;
  lastClaimedTime?: number;
  claim: () => Promise<any> | undefined;
}