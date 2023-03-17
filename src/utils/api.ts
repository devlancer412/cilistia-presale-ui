import { utils, Wallet } from "ethers";
import { PRESALE_WHITELIST } from "@/constants";

export const whitelists: `0x${string}`[] = PRESALE_WHITELIST;

const PRIVATE_KEY: string = process.env.NEXT_SIGNER_PRIVATEKEY ?? "";
const signer = new Wallet(PRIVATE_KEY);

export const isWhitelisted = (address: `0x${string}`): boolean => {
  return !!whitelists.find((x) => x.toLowerCase() === address.toLowerCase());
};

export const getSignature = async (
  address: `0x${string}`,
  amount: string,
  tokenSymbol: string
) => {
  if (!isWhitelisted(address)) {
    return { result: true, error: "Not whitelisted" };
  }

  const messageHash = utils.solidityKeccak256(
    ["address", "uint256", "string"],
    [address, amount, tokenSymbol]
  );

  const messageHashBinary = utils.arrayify(messageHash);

  const signature = await signer.signMessage(messageHashBinary);
  return { result: true, signature };
};
