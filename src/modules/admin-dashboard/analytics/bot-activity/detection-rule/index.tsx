'use client';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Text } from 'rizzui';
import Table from '../detection-rule/table/table';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
import DDoSModal from '../../models/newrule';

interface DetectionRuleProps {
  onBack: () => void;
  onSearch: (value: string) => void;
  title: string;
}

const DetectionRule: React.FC<DetectionRuleProps> = ({
  onBack,
  onSearch,
  title = 'Detection Rules Configuration',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  return (
    <>
      <div className="my-4 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-greenPrimary-200"
        >
          <FaArrowLeft className="text-greenPrimary-700 dark:text-white" />
        </button>
        <Text className="text-xl font-semibold text-greenPrimary-700 dark:text-white md:text-2xl">
          {title}
        </Text>
      </div>
      <div className="w-full rounded-md border-greenPrimary-300 bg-lightgray-primary bg-[url('/images/lightMode-shadow-left.svg')] bg-[length:35%_35%] bg-no-repeat dark:border dark:bg-dashBordCardsBG dark:bg-[url('/images/shadow-left.svg')]">
        <div className="flex flex-col gap-4 border-b border-white p-4 pb-4 dark:border-greenPrimary-300 md:flex-row md:items-center md:justify-between">
          <Text className="text-sm font-semibold text-greenPrimary-700 dark:text-white md:text-base">
            {title}
          </Text>
          <div className="flex flex-col gap-4 md:flex-row md:items-center ">
            <div className="flex flex-col gap-4 md:flex-row md:items-center ">
              <Input
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search"
                className="w-full "
              />
              <Button
                size="md"
                className="whitespace-nowrap !bg-yellow-primary px-6 font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
                onClick={handleOpenModal}
              >
                Add New Rule
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <Table
            selectedToken={selectedToken}
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <DDoSModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DetectionRule;
