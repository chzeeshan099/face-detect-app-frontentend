'use client'
import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

interface PortalNotificationProps {
  amount: number;
}

const PortalNotification: React.FC<PortalNotificationProps> = ({ amount }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center justify-between mt-4 gap-2 bg-greenPrimary-50 dark:bg-greenPrimary-350 dark:border border-greenPrimary-300 rounded-lg px-4 py-3 z-50 transition-opacity duration-300 ease-in-out opacity-100 transform translate-y-0">
      <div className='flex item-center gap-4'>
      <FaCheckCircle className="h-5 w-5 text-white" />
      <span className="dark:text-gray-900 text-white  font-semibold text-sm">
        You've brought in {amount.toLocaleString()} $MUTT
      </span>
      </div>

      <button
        onClick={handleClose}
        className="ml-2 text-gray-100 dark:text-gray-800 hover:text-red-700 transition-colors"
      >
        <RxCross2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PortalNotification;
