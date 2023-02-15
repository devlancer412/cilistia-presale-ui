import {
  Contract,
  utils,
  constants,
  BigNumber,
  Signer,
  providers,
} from "ethers";
import { SignatureRes, Token } from "@/types";
import { NETWORK, PRESALE_ADDRESS, CIL_TOKEN } from "@/constants";
import PRESALE_ABI from "@/abis/Presale.json";
import ERC20_ABI from "@/abis/ERC20.json";

export const getWhitelistStatus = async (address: string): Promise<boolean> => {
  const res = await fetch(`/api/isWhitelisted?address=${address}`);
  const data = await res.json();

  return data.isWhitelisted;
};

export const getSignature = async (
  address: string,
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
  userAddr: string,
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

  return tokenContract.approve(PRESALE_ADDRESS[NETWORK], constants.MaxUint256);
};

export const getAllowance = async (
  token: Token,
  address: string,
  signer: Signer
): Promise<BigNumber> => {
  const tokenContract = new Contract(token.address, ERC20_ABI, signer);

  return tokenContract.allowance(address, PRESALE_ADDRESS[NETWORK]);
};

export const getRemainCil = async (
  provider: providers.BaseProvider
): Promise<number> => {
  const cilToken = CIL_TOKEN[NETWORK];
  const tokenContract = new Contract(
    CIL_TOKEN[NETWORK].address,
    ERC20_ABI,
    provider
  );

  const balance = await tokenContract.balanceOf(PRESALE_ADDRESS[NETWORK]);
  return Number(utils.formatUnits(balance, cilToken.decimals));
};

export const getPresaleContract = (
  provider: Signer | providers.BaseProvider
) => {
  const presaleContract = new Contract(
    PRESALE_ADDRESS[NETWORK],
    PRESALE_ABI,
    provider
  );

  return presaleContract;
};
