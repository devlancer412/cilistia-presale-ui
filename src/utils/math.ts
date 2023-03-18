import { BigNumber } from 'ethers';
import { bignumber, round, number, divide } from 'mathjs';

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

export const formatAmountWithUnit = (
  amount: number,
  displayDecimals: number
) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return amount >= item.value;
    });

  if (amount > 1000 * (item?.value as number)) {
    let i = 21;
    for (; ; i++) {
      if (amount < Math.pow(10, i + 1)) {
        break;
      }
    }

    return `${(amount / Math.pow(10, i)).toFixed(displayDecimals)}*1e${i}`;
  }

  return (
    (amount / (item?.value ?? 1)).toFixed(displayDecimals).replace(rx, '$1') +
    (item?.symbol ?? '')
  );
};

export { bnToReadableString, fourDp, formatNumberSring };
