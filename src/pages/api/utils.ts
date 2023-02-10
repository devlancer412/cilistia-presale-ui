import { utils, Wallet } from "ethers";
import { NETWORK } from "@/constants";
import WHITELISTS from "./whitelists";

export const whitelists: string[] = WHITELISTS[NETWORK];

const PRIVATE_KEY: string = process.env.NEXT_SIGNER_PRIVATEKEY ?? "";
const signer = new Wallet(PRIVATE_KEY);

export const isWhitelisted = (address: string): boolean => {
  return !!whitelists.find((x) => x.toLowerCase() === address.toLowerCase());
};

export const getSignature = async (
  address: string,
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
