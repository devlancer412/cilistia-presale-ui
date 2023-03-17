import { SignatureRes } from "@/types";

const getWhitelistStatus = async (address: `0x${string}`): Promise<boolean> => {
  const res = await fetch(`/api/airdrop/isWhitelisted?address=${address}`);
  const data = await res.json();

  return data.isWhitelisted;
};

const getSignature = async (address: `0x${string}`): Promise<SignatureRes> => {
  const res = await fetch(`/api/airdrop/sign?address=${address}`);
  const data = await res.json();

  return data;
};

export { getWhitelistStatus, getSignature };
