import { utils, Wallet } from 'ethers';
import { PRESALE_WHITELIST, AIRDROP_WHITELIST } from '@/constants';

export const presaleWhitelists: `0x${string}`[] = PRESALE_WHITELIST;
export const airdropWhitelists: `0x${string}`[] = AIRDROP_WHITELIST;

const PRIVATE_KEY: string = process.env.NEXT_SIGNER_PRIVATEKEY ?? '';
const signer = new Wallet(PRIVATE_KEY);

export const isPresaleWhitelisted = (address: `0x${string}`): boolean => {
  return !!presaleWhitelists.find(
    (x) => x.toLowerCase() === address.toLowerCase()
  );
};

export const isAirdropWhitelisted = (address: `0x${string}`): boolean => {
  return !!airdropWhitelists.find(
    (x) => x.toLowerCase() === address.toLowerCase()
  );
};

export const getPresaleSignature = async (
  address: `0x${string}`,
  amount: string,
  tokenSymbol: string
) => {
  if (!isPresaleWhitelisted(address)) {
    return { result: true, error: 'Not whitelisted' };
  }

  const messageHash = utils.solidityKeccak256(
    ['address', 'uint256', 'string'],
    [address, amount, tokenSymbol]
  );

  const messageHashBinary = utils.arrayify(messageHash);

  const signature = await signer.signMessage(messageHashBinary);
  return { result: true, signature };
};

export const getAirdropSignature = async (address: `0x${string}`) => {
  if (!isAirdropWhitelisted(address)) {
    return { result: true, error: 'Not whitelisted' };
  }

  const messageHash = utils.solidityKeccak256(['address'], [address]);

  const messageHashBinary = utils.arrayify(messageHash);

  const signature = await signer.signMessage(messageHashBinary);
  return { result: true, signature };
};
