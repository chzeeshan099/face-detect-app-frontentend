'use client';
import React, { useState, ReactNode } from 'react';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
import { Button, Text } from 'rizzui';
import Table from './table/table';
import { FaArrowLeft } from 'react-icons/fa';

interface ProposalHistoryProps {
  onBack: () => void;
}

const defaultTypeOptions = [
  { label: 'Type', value: 'type' },
  { label: 'Purchase', value: 'purchase' },
  { label: 'Claim', value: 'claim' },
];

const defaultStatusOptions = [
  { label: 'Status', value: 'status' },
 
  { label: 'Success', value: 'success' },
  { label: 'Fail', value: 'fail' },
];
interface ProposalHistoryProps {
  title?: string;
  typeOptions?: Array<{ label: string; value: string }>;
  statusOptions?: Array<{ label: string; value: string }>;
  additionalButton?: ReactNode;
  onSearch?: (value: string) => void;
  onTypeSelect?: (value: string) => void;
  onStatusSelect?: (value: string) => void;
  onBack: () => void;
}

const SalesLedger = ({
  onBack,
  title = 'Proposal History',
  typeOptions = defaultTypeOptions,
  statusOptions = defaultStatusOptions,
  additionalButton,
  onSearch,
  onTypeSelect,
  onStatusSelect,
}: ProposalHistoryProps) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTypeSelect = (value: string) => {
    setSelectedType(value);
    if (onTypeSelect) {
      onTypeSelect(value);
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
      <div className=" w-full rounded-md border-greenPrimary-300 bg-lightgray-primary bg-[url('/images/lightMode-shadow-left.svg')] dark:bg-[url('/images/shadow-left.svg')]  bg-no-repeat bg-[length:35%_35%] dark:border dark:bg-dashBordCardsBG">
        <div className="flex flex-col md:flex-row  items-center justify-between border-b border-white p-4 pb-4 dark:border-greenPrimary-300">
          <Text className="text-sm md:text-base w-full md:w-auto font-semibold text-greenPrimary-700 dark:text-white">
            {title}
          </Text>
          <div className="flex flex-col md:flex-row w-full md:w-auto mt-2 md:mt-0  md:items-center gap-4">
            <Input
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by address/TxHash"
              inputClassName='min-w-64'
            />
            <Dropdown
             options={statusOptions}
              selectedValue={selectedStatus}
              onSelect={handleStatusSelect}
              placeholder="Status"
            />
            <Dropdown
             options={typeOptions}
             selectedValue={selectedType}
             onSelect={handleTypeSelect}
              
              placeholder="Type"
            />
            {additionalButton}
          </div>
        </div>
        <div>
          <Table
            selectedType={selectedType}
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default SalesLedger;
