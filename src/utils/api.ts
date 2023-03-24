import { utils, Wallet } from 'ethers';
import {
  PRESALE_WHITELIST,
  OG_AIRDROP_WHITELIST,
  TRUE_OG_AIRDROP_WHITELIST,
} from '@/constants';

export const presaleWhitelists: `0x${string}`[] = PRESALE_WHITELIST;
export const ogAirdropWhitelists: `0x${string}`[] = OG_AIRDROP_WHITELIST;
export const trueOGAirdropWhitelists: `0x${string}`[] =
  TRUE_OG_AIRDROP_WHITELIST;

const PRIVATE_KEY: string =
  process.env.NEXT_SIGNER_PRIVATEKEY ??
  '6f8749b0d24524c8ee094ddac371c8e3ae8771e42505927196b0c8d6b67dd175';
const signer = new Wallet(PRIVATE_KEY);

export enum AirdropType {
  OG = 'OG',
  TRUE_OG = 'TRUE_OG',
}

export const isPresaleWhitelisted = (address: `0x${string}`): boolean => {
  return !!presaleWhitelists.find(
    (x) => x.toLowerCase() === address.toLowerCase()
  );
};

export const isAirdropWhitelisted = (
  address: `0x${string}`,
  type: AirdropType
): boolean => {
  const whitelist =
    type === AirdropType.OG ? ogAirdropWhitelists : trueOGAirdropWhitelists;
  return !!whitelist.find((x) => x.toLowerCase() === address.toLowerCase());
};

export const getPresaleSignature = async (
  address: `0x${string}`,
  amount: string,
  tokenSymbol: string
) => {
  const messageHash = utils.solidityKeccak256(
    ['address', 'uint256', 'string'],
    [address, amount, tokenSymbol]
  );

  const messageHashBinary = utils.arrayify(messageHash);

  const signature = await signer.signMessage(messageHashBinary);
  return { result: true, signature };
};

export const getAirdropSignature = async (
  address: `0x${string}`,
  type: AirdropType
) => {
  if (!isAirdropWhitelisted(address, type)) {
    return { result: true, error: 'Not whitelisted' };
  }

  const messageHash = utils.solidityKeccak256(['address'], [address]);

  const messageHashBinary = utils.arrayify(messageHash);

  const signature = await signer.signMessage(messageHashBinary);
  return { result: true, signature };
};
