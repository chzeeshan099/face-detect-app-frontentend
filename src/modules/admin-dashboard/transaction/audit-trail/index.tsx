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

const defaultInitiatorOptions = [
  { label: 'Initiator', value: 'initiator' },
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'User' },
];

const defaultEventTypeOptions = [
  { label: 'Event Type', value: 'eventType' },
  { label: 'Emergency Action', value: 'emergencyAction' },

];
interface ProposalHistoryProps {
  title?: string;
  initiatorOptions?: Array<{ label: string; value: string }>;
  eventTypeOptions?: Array<{ label: string; value: string }>;
  additionalButton?: ReactNode;
  onSearch?: (value: string) => void;
  onEventTypeSelect?: (value: string) => void;
  onInitiatorSelect?: (value: string) => void;
  onBack: () => void;
}

const SalesLedger = ({
  onBack,
  title = 'Audit Trail',
  initiatorOptions = defaultInitiatorOptions,
  eventTypeOptions = defaultEventTypeOptions,
  additionalButton,
  onSearch,
  onEventTypeSelect,
  onInitiatorSelect,
}: ProposalHistoryProps) => {
  const [selectedInitiatorOptions, setSelectedInitiatorOptions] = useState('');
  const [selectedEventTypeOptions, setSelectedEventTypeOptions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTypeSelect = (value: string) => {
    setSelectedInitiatorOptions(value);
    if (onEventTypeSelect) {
      onEventTypeSelect(value);
    }
  };

  const handleStatusSelect = (value: string) => {
    setSelectedEventTypeOptions(value);
    if (onInitiatorSelect) {
      onInitiatorSelect(value);
    }
  };

  return (
    <>
      <div className=" w-full rounded-md border-greenPrimary-300 bg-lightgray-primary bg-[url('/images/lightMode-shadow-left.svg')] dark:bg-[url('/images/shadow-left.svg')]  bg-no-repeat bg-[length:35%_35%] dark:border dark:bg-dashBordCardsBG">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white p-4 pb-4 dark:border-greenPrimary-300">
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
             options={eventTypeOptions}
              selectedValue={selectedEventTypeOptions}
              onSelect={handleStatusSelect}
              placeholder="Event Type"
            />
            <Dropdown
             options={initiatorOptions}
             selectedValue={selectedInitiatorOptions}
             onSelect={handleTypeSelect}
              
              placeholder="Initiator"
            />
            <Button size='md' className='!bg-yellow-primary hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6'>
                        Export
                    </Button>
            {additionalButton}
          </div>
        </div>
        <div>
          <Table
            SelectedInitiatorOptions={selectedInitiatorOptions}
            SelectedEventTypeOptions={selectedEventTypeOptions}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default SalesLedger;
