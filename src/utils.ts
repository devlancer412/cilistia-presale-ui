import { Signer, Provider } from "@wagmi/core";
import { Contract, utils, constants } from "ethers";
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

  const tokenContract = new Contract(token.address, ERC20_ABI, signer);

  const presaleContract = new Contract(
    PRESALE_ADDRESS[NETWORK],
    PRESALE_ABI,
    signer
  );

  const allowance = await tokenContract.allowance(
    userAddr,
    presaleContract.address
  );

  if (allowance.lt(amountBN)) {
    await tokenContract.approve(presaleContract.address, constants.MaxUint256);
  }

  const sign = utils.splitSignature(signatureRes.signature!);

  await presaleContract.buy(amountBN, token.symbol, {
    r: sign.r,
    s: sign.s,
    v: sign.v,
  });
};

export const getRemainCil = async (provider: Provider): Promise<number> => {
  const cilToken = CIL_TOKEN[NETWORK];
  const tokenContract = new Contract(
    CIL_TOKEN[NETWORK].address,
    ERC20_ABI,
    provider
  );

  const balance = await tokenContract.balanceOf(PRESALE_ADDRESS[NETWORK]);
  return Number(utils.formatUnits(balance, cilToken.decimals));
};
