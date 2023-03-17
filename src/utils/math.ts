import { BigNumber } from "ethers";
import { bignumber, round, number, divide } from "mathjs";

const bnToReadableString = (bn: BigNumber, decimals: number) => {
  const numStr = bn.toString();
  const parsedUnitBN = bignumber(numStr).div(decimals);
  const parsedUnits2DP = round(parsedUnitBN, 2);
  return parsedUnits2DP;
};

const formatNumberSring = (numStr: string, decimals: number) => {
  const numStrBn = bignumber(numStr);
  const formattedBn = divide(numStrBn, decimals);
  const rounded = round(bignumber(formattedBn.toString()), 2);
  return rounded.toString();
};

const fourDp = (numStr: string) => {
  return round(number(numStr), 4);
};

export { bnToReadableString, fourDp, formatNumberSring };
