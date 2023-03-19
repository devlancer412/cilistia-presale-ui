import { FC, useState } from 'react';
import { ACCEPTED_TOKENS } from '@/constants';
import ModalWrapper from './ModalWrapper';
import { usePresale, usePurchaseToken } from '@/hooks';
import { PresaleState } from '@/contexts/PresaleContext';
import { formatAmountWithUnit } from '@/utils/math';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const PurchaseModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { status, purchase } = usePresale();
  const [amount, setAmount] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<Token>(ACCEPTED_TOKENS[0]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const { balance, allowance, approve } = usePurchaseToken(selectedToken);

  const handleMax = () => {
    setAmount(balance);
  };

  const handleApprove = async () => {
    try {
      setIsWaiting(true);
      const tx = await approve(amount);
      await tx.wait();

      // add success alert here
    } catch (err) {
      console.log(err);

      // add error alert here
    } finally {
      setIsWaiting(false);
    }
  };

  const handlePurchase = async () => {
    try {
      setIsWaiting(true);
      const tx = await purchase(amount, selectedToken);
      await tx.wait();

      // add success alert here
    } catch (err) {
      console.log(err);

      // add error alert here
    } finally {
      setIsWaiting(false);
    }
  };

  return (
    <ModalWrapper title='Purchase Token' isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className='flex flex-col w-full items-center py-4 text-slate-200'>
        <span className='mb-1'>Select token below:</span>
        <div className='flex flex-row rounded-lg mb-3'>
          {ACCEPTED_TOKENS.map((token, index) => (
            <button
              key={token.symbol}
              className={`px-7 py-3 ${index === 0 ? 'rounded-l-lg' : ''} ${
                index === ACCEPTED_TOKENS.length - 1 ? 'rounded-r-lg' : ''
              } ${
                token.symbol === selectedToken.symbol
                  ? 'bg-blue'
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
              <span className='text-md leading-5'>
                {formatAmountWithUnit(balance, 2)}
              </span>
              <button className='text-sm underline' onClick={handleMax}>
                Max
              </button>
            </div>
          </div>
          <div className='border-2 px-2 rounded-md bg-opacity-[0.06] bg-white'>
            <input
              value={amount}
              type='number'
              className='focus:border-transparent focus:ring-0 p-2 bg-transparent border-0'
              placeholder='0.0'
              onChange={(e) => setAmount(parseFloat(e.target.value) ?? 0)}
            />
            <span>{selectedToken.symbol}</span>
          </div>
        </div>
        <button
          className='bg-blue px-7 py-3 rounded-lg mt-2 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={status !== PresaleState.OPEN || isWaiting}
          onClick={allowance >= amount ? handlePurchase : handleApprove}
        >
          {allowance >= amount
            ? isWaiting
              ? 'Purchasing...'
              : 'Purchase'
            : isWaiting
            ? 'Approving...'
            : 'Approve'}
        </button>
      </div>
    </ModalWrapper>
  );
};
