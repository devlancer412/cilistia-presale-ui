import { FC, useState } from 'react';
import { ACCEPTED_TOKENS } from '@/constants';
import ModalWrapper from './ModalWrapper';
import {
  useCurrentTime,
  usePresale,
  usePresaleCountdown,
  usePurchaseToken,
} from '@/hooks';
import { PresaleState } from '@/contexts/PresaleContext';
import { formatAmountWithUnit } from '@/utils/math';
import { toast } from 'react-hot-toast';

function determinButtonText(
  allowance: number,
  amount: number,
  isWaiting: boolean
) {
  if (amount === 0) {
    return 'Invalid Purchase Amount';
  }

  if (amount < 25) {
    return 'Minimum amount is $25';
  }

  if (amount > 1000) {
    return 'Maximum amount is $1000';
  }

  if (allowance > 0 && allowance >= amount) {
    return isWaiting ? 'Purchasing...' : 'Purchase';
  }

  return isWaiting ? 'Approving...' : 'Approve';
}

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const PurchaseModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { purchase, closingTime, openingTime } = usePresale();
  const currentTime = useCurrentTime();
  const { status } = usePresaleCountdown(currentTime, closingTime, openingTime);
  const [amount, setAmount] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<Token>(ACCEPTED_TOKENS[0]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { balance, allowance, approve } = usePurchaseToken(selectedToken);

  const handleMax = () => {
    setAmount(balance);
  };

  const handleApprove = async () => {
    const toastId = toast.loading(
      `Approving ${selectedToken.symbol} for spend`
    );
    try {
      setIsWaiting(true);
      const tx = await approve(amount);
      await tx.wait();
      toast.dismiss(toastId);
      toast.success(`${selectedToken.symbol} approved for transaction`);
    } catch (err: any) {
      const errorMsg = err?.reason ? err.reason : 'Approval failed';
      toast.dismiss(toastId);
      toast.error(errorMsg);
    } finally {
      setIsWaiting(false);
    }
  };

  const handlePurchase = async () => {
    if (amount > balance) {
      toast.error(`Insufficient ${selectedToken.symbol}`);
      return;
    }
    const toastId = toast.loading(
      `Purchasing ${amount} ${selectedToken.symbol} of CIL`
    );
    try {
      setIsWaiting(true);
      const tx = await purchase(amount, selectedToken);
      await tx.wait();
      toast.dismiss(toastId);
      toast.success('Purchase successful');
    } catch (err: any) {
      const errorMsg = err?.reason ? err.reason : 'Purchase failed';
      toast.dismiss(toastId);
      toast.error(errorMsg);
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <ModalWrapper title='Purchase Token' isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='flex flex-col items-center w-full py-4 text-slate-200'>
        <span className='mb-1'>Select token below:</span>
        <div className='flex flex-row mb-3 rounded-lg'>
          {ACCEPTED_TOKENS.map((token, index) => (
            <button
              key={token.symbol}
              className={`px-7 py-3 ${index === 0 ? 'rounded-l-lg' : ''} ${
                index === ACCEPTED_TOKENS.length - 1 ? 'rounded-r-lg' : ''
              } ${
                token.symbol === selectedToken.symbol
                  ? 'bg-indigo-600'
                  : 'bg-slate-700'
              }`}
              onClick={() => setSelectedToken(token)}
            >
              {token.symbol}
            </button>
          ))}
        </div>
        <div className='flex flex-col my-3'>
          <div className='flex justify-between'>
            <span className='text-sm'>Amount</span>
            <div className='flex flex-row items-end gap-1'>
              <span className='leading-5 text-md'>
                {formatAmountWithUnit(balance, 2)}
              </span>
              <button className='text-sm underline' onClick={handleMax}>
                Max
              </button>
            </div>
          </div>
          <div className='border-1 px-2 rounded bg-opacity-[0.06] bg-white'>
            <input
              value={amount}
              type='number'
              className='p-2 bg-transparent border-0 focus:border-transparent focus:ring-0'
              placeholder='0.0'
              onChange={(e) => setAmount(parseFloat(e.target.value) ?? 0)}
            />
            <span>{selectedToken.symbol}</span>
          </div>
        </div>
        <button
          className='bg-blue px-7 py-3 rounded-lg mt-2 disabled:opacity-25 disabled:cursor-not-allowed'
          disabled={
            status !== PresaleState.OPEN ||
            isWaiting ||
            amount > 1000 ||
            amount < 25
          }
          onClick={
            allowance > 0 && allowance >= amount
              ? handlePurchase
              : handleApprove
          }
        >
          {determinButtonText(allowance, amount, isWaiting)}
        </button>
      </div>
    </ModalWrapper>
  );
};
