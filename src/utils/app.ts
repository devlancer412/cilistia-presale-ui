import {
  Contract,
  utils,
  constants,
  BigNumber,
  Signer,
  providers,
} from 'ethers';
import { PRESALE_CONTRACT_ADDRESS, CIL_TOKEN } from '@/constants';
import ERC20_ABI from '@/contracts/abis/ERC20.json';
import PRESALE_ABI from '@/contracts/abis/Presale.json';
import { AirdropType } from './api';

export const getWhitelistStatus = async (
  address: `0x${string}`
): Promise<any> => {
  const res = await fetch(`/api/isWhitelisted?address=${address}`);
  const data = await res.json();

  return data;
};

export const getPresaleSignature = async (
  address: `0x${string}`,
  amount: string,
  token: string
): Promise<SignatureRes> => {
  const res = await fetch(
    `/api/signPresale?address=${address}&amount=${amount}&token=${token}`
  );
  const data = await res.json();

  return data;
};

export const getAirdropSignature = async (
  address: `0x${string}`,
  type: AirdropType
): Promise<SignatureRes> => {
  const res = await fetch(`/api/signAirdrop?address=${address}?type=${type}`);
  const data = await res.json();

  return data;
};

export const approve = (token: Token, signer: Signer) => {
  const tokenContract = new Contract(token.address, ERC20_ABI, signer);

  return tokenContract.approve(PRESALE_CONTRACT_ADDRESS, constants.MaxUint256);
};

export const getAllowance = async (
  token: Token,
  address: string,
  signer: Signer
): Promise<BigNumber> => {
  const tokenContract = new Contract(token.address, ERC20_ABI, signer);

  return tokenContract.allowance(address, PRESALE_CONTRACT_ADDRESS);
};

export const getRemainCil = async (
  provider: providers.BaseProvider
): Promise<number> => {
  const cilToken = CIL_TOKEN;
  const tokenContract = new Contract(CIL_TOKEN.address, ERC20_ABI, provider);

  const balance = await tokenContract.balanceOf(PRESALE_CONTRACT_ADDRESS);
  return Number(utils.formatUnits(balance, cilToken.decimals));
};

export const getPresaleContract = (
  provider: Signer | providers.BaseProvider
) => {
  const presaleContract = new Contract(
    PRESALE_CONTRACT_ADDRESS,
    PRESALE_ABI,
    provider
  );

  return presaleContract;
};
