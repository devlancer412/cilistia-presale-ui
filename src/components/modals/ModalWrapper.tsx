import { FC, PropsWithChildren, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalWrapper: FC<PropsWithChildren<Props>> = ({
  title,
  isOpen,
  setIsOpen,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-500'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Dialog.Panel className='fixed top-1/2 left-1/2 bg-slate-900 -translate-x-1/2 -translate-y-1/2 w-[300px] min-[375px]:w-[350px] md:w-[450px] rounded-lg opacity-100 scale-100 border-2 border-gray-600'>
            <Dialog.Title className='flex items-center justify-between p-6'>
              <div className='flex items-center gap-3'>
                <div className='text-slate-200 text-md 2xl:text-lg'>
                  {title}
                </div>
              </div>
              <span
                className='opacity-50 cursor-pointer hover-transition hover:opacity-100 text-white'
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className='w-6 h-6' aria-hidden='true' />
              </span>
            </Dialog.Title>
            <div className='flex w-full h-px border border-gray-600 bg-slate-600' />
            <Dialog.Description>{children}</Dialog.Description>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default ModalWrapper;
