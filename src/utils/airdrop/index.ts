import { utils } from "ethers";
import { AIRDROP_WHITELIST } from "@/constants";
import { signer } from "../common";
import { Signature } from "ethers";

export const whitelists: `0x${string}`[] = AIRDROP_WHITELIST;

const isWhitelisted = (address: `0x${string}`): boolean => {
  return !!whitelists.find((x) => x.toLowerCase() === address.toLowerCase());
};

const generateSignature = async (address: `0x${string}`) => {
  if (!isWhitelisted(address)) {
    return { result: true, error: "Not whitelisted for airdrop" };
  }

  const messageHash = utils.solidityKeccak256(["address"], [address]);

  const messageHashBinary = utils.arrayify(messageHash);

  const signature = await signer.signMessage(messageHashBinary);
  const splitSignature = utils.splitSignature(signature) as Signature;
  return { result: true, signature: splitSignature };
};

export { isWhitelisted, generateSignature };
