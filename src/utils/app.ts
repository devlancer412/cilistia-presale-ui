import {
  Contract,
  utils,
  constants,
  BigNumber,
  Signer,
  providers,
} from "ethers";
import { SignatureRes, Token } from "@/types";
import { PRESALE_ADDRESS, CIL_TOKEN } from "@/constants";
import ERC20_ABI from "@/contracts/abis/ERC20.json";
import PRESALE_ABI from "@/contracts/abis/Presale.json";

export const getWhitelistStatus = async (
  address: `0x${string}`
): Promise<boolean> => {
  const res = await fetch(`/api/isWhitelisted?address=${address}`);
  const data = await res.json();

  return data.isWhitelisted;
};

export const getSignature = async (
  address: `0x${string}`,
  amount: string,
  token: string
): Promise<SignatureRes> => {
  const res = await fetch(
    `/api/sign?address=${address}&amount=${amount}&token=${token}`
  );
  const data = await res.json();

  return data;
};

export const purchase = async (
  userAddr: `0x${string}`,
  amount: number,
  token: Token,
  signer: Signer
) => {
  const amountBN = utils.parseUnits(amount.toString(), token.decimals);

  const signatureRes = await getSignature(
    userAddr,
    amountBN.toString(),
    token.symbol
  );

  if (!signatureRes.result) {
    return;
  }

  const presaleContract = getPresaleContract(signer);

  const sign = utils.splitSignature(signatureRes.signature!);

  return presaleContract.buy(amountBN, token.symbol, {
    r: sign.r,
    s: sign.s,
    v: sign.v,
  });
};

export const approve = (token: Token, signer: Signer) => {
  const tokenContract = new Contract(token.address, ERC20_ABI, signer);

  return tokenContract.approve(PRESALE_ADDRESS, constants.MaxUint256);
};

export const getAllowance = async (
  token: Token,
  address: string,
  signer: Signer
): Promise<BigNumber> => {
  const tokenContract = new Contract(token.address, ERC20_ABI, signer);

  return tokenContract.allowance(address, PRESALE_ADDRESS);
};

export const getRemainCil = async (
  provider: providers.BaseProvider
): Promise<number> => {
  const cilToken = CIL_TOKEN;
  const tokenContract = new Contract(CIL_TOKEN.address, ERC20_ABI, provider);

  const balance = await tokenContract.balanceOf(PRESALE_ADDRESS);
  return Number(utils.formatUnits(balance, cilToken.decimals));
};

export const getPresaleContract = (
  provider: Signer | providers.BaseProvider
) => {
  const presaleContract = new Contract(PRESALE_ADDRESS, PRESALE_ABI, provider);

  return presaleContract;
};
