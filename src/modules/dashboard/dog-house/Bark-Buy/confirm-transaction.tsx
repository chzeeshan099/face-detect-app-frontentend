import Image from 'next/image';
import { IoArrowForwardOutline, IoCloseOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Modal, Button, Text } from 'rizzui';
import { useState, useEffect } from 'react';

interface ConfirmTransactionProps {
  show: boolean;
  onClose: () => void;
  amount: string;
  selectedCrypto: string;
  muttAmount: string;
  showSuccessStep?: boolean;
}

const ConfirmTransaction = ({
  show,
  onClose,
  amount,
  selectedCrypto,
  muttAmount,
  showSuccessStep = false,
}: ConfirmTransactionProps) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (showSuccessStep) {
      setIsSuccess(true);
    }
  }, [showSuccessStep]);

  const handleConfirm = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={show} onClose={handleClose} size='sm'>
      <div className={isSuccess || showSuccessStep ? 'success-modal' : 'confirm-modal'}>
        <div className="relative p-6 max-w-sm w-full bg-white dark:bg-greenPrimary-200 rounded-lg">
          <button 
            onClick={handleClose} 
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-800 dark:hover:text-gray-300"
          >
            <IoCloseOutline size={20} />
          </button>

          {!isSuccess && !showSuccessStep ? (
            <>
              <Text className="text-xl font-bold text-center mb-8 dark:text-greenPrimary-100">
                Confirm Transaction
              </Text>

              <div className=" mb-8">
                <Text className="font-semibold mb-3 text-3xl text-center dark:text-white">
                  {amount} {selectedCrypto}
                </Text>

                <Text className="font-semibold flex justify-center mb-5 items-center text-md dark:text-white">
                  <Image src="/money-mutt/coin.svg" alt="coin" width={20} height={20} className="mr-3" />
                  {muttAmount} $MUTT
                </Text>

                <div className="flex justify-center items-center gap-3 text-gray-500 dark:text-white">
                  <Text className="font-mono text-sm dark:text-white">0x815b...652</Text>
                  <IoArrowForwardOutline />
                  <Text className="font-mono text-sm dark:text-white">0x815b...652</Text>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 dark:border-gray-600 dark:text-white text-base font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-yellow-primary text-white !hover:bg-yellow-primary text-base font-medium"
                >
                  Confirm
                </Button>
              </div>
            </>
          ) : (
            <div className="py-4 text-center success-message">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse"></div>
                  <IoCheckmarkCircleOutline className="w-20 h-20 text-green-500 relative z-10 animate-[heartbeat_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
              <Text className="text-2xl font-bold mb-3 dark:text-white">
               Success!
              </Text>
              <Text className="text-gray-600 dark:text-gray-500 mb-8">
                Your transaction has been processed successfully
              </Text>
              <Button
                onClick={handleClose}
                className="bg-yellow-primary text-white hover:bg-yellow-600 px-12 py-2.5 text-base font-medium"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};


export default ConfirmTransaction;
