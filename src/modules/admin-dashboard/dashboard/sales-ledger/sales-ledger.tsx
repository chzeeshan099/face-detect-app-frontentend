'use client';
import React, { useState, ReactNode } from 'react';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
import { Button, Text } from 'rizzui';
import Table from './table/table';
import { FaArrowLeft } from 'react-icons/fa';

interface SalesLedgerProps {
  onBack: () => void;
}

const defaultTokenOptions = [
  { label: 'Token Type', value: 'tokenType' },
  { label: 'ETH', value: 'eth' },
  { label: 'USD', value: 'usd' },
  { label: 'BTC', value: 'btc' },
];

const defaultStatusOptions = [
  { label: 'Status', value: 'status' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];
interface SalesLedgerProps {
  title?: string;
  tokenOptions?: Array<{ label: string; value: string }>;
  statusOptions?: Array<{ label: string; value: string }>;
  additionalButton?: ReactNode;
  onSearch?: (value: string) => void;
  onTokenSelect?: (value: string) => void;
  onStatusSelect?: (value: string) => void;
  onBack: () => void;
}

const SalesLedger = ({
  onBack,
  title = 'Sales Ledger',
  tokenOptions = defaultTokenOptions,
  statusOptions = defaultStatusOptions,
  additionalButton,
  onSearch,
  onTokenSelect,
  onStatusSelect,
}: SalesLedgerProps) => {
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTokenSelect = (value: string) => {
    setSelectedToken(value);
    if (onTokenSelect) {
      onTokenSelect(value);
    }
  };

  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value);
    if (onStatusSelect) {
      onStatusSelect(value);
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
           List of {title}
          </Text>
          <div className="flex flex-col gap-4 md:flex-row md:items-center ">
            <div className="flex flex-col gap-4 md:flex-row md:items-center ">
              <Input
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search"
                className="w-full "
              />
              <Dropdown
                options={tokenOptions}
                selectedValue={selectedToken}
                onSelect={handleTokenSelect}
                placeholder="Token Type"
                className="w-full "
              />
              <Dropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onSelect={handleStatusSelect}
                placeholder="Status"
                className="w-full "
              />

              {additionalButton && <div className=" ">{additionalButton}</div>}
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
    </>
  );
};

export default SalesLedger;
