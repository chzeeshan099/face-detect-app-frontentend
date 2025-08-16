'use client';

import React, { useState } from 'react';
import { Button, Text } from 'rizzui';
import DDoSModal from './models/ddosprotection';

interface SecurityProps {
  onViewDDoSLogs: () => void;
  onViewBotLogs: () => void;
}

const analyticsData = [
  { label: 'Failed Transaction Rate', value: '2.5%' },
  { label: 'Blocked Address', value: '42' },
  { label: 'Flagged Patterns', value: '82' },
  { label: 'Blocked Request', value: '92' },
];

const Security: React.FC<SecurityProps> = ({
  onViewDDoSLogs,
  onViewBotLogs,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModel = () => {
    setIsModelOpen(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  return (
    <>
      <div className="w-full rounded-t-md  bg-lightgray-primary bg-[url('/images/lightMode-shadow-left.svg')] bg-[length:35%_35%] bg-no-repeat border-b dark:border-greenPrimary-300 border-white dark:bg-dashBordCardsBG dark:bg-[url('/images/shadow-left.svg')]">
        <div className="flex flex-col gap-4 p-4 pb-4  md:flex-row md:items-center md:justify-between">
          <Text className="text-sm font-semibold text-greenPrimary-700 dark:text-white md:text-base">
            Security
          </Text>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="md"
              className="whitespace-nowrap !bg-yellow-primary px-6 font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
              onClick={onViewBotLogs}
              
            >
                View Bot Logs
           
            </Button>
            <Button
              size="md"
              className="!bg-yellow-primary px-6 font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
              onClick={onViewDDoSLogs}
            >
               View DDoS Logs
            </Button>
          </div>
        </div>
      </div>

      <div className=" bg-lightgray-primary  dark:bg-greenPrimary-secodarydark ">
        <div className="grid grid-cols-2 gap-y-4 p-6 text-sm sm:grid-cols-4">
          {analyticsData.map((item, index) => (
            <div key={index}>
              <div className="mb-1 text-[#20655D] dark:text-[#40c5aa]">
                {item.label}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <DDoSModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <DDoSModal isOpen={isModelOpen} onClose={handleCloseModel} />
    </>
  );
};

export default Security;