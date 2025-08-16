import Table from './table/table';
import React, { ReactNode, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Text } from 'rizzui';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
interface DDosLogsProps {
  title?: string;
  eventTypeOptions?: Array<{ label: string; value: string }>;
  ipAddressOptions?: Array<{ label: string; value: string }>;
  additionalButton?: ReactNode;
  onSearch?: (value: string) => void;
  onEventTypeSelect?: (value: string) => void;
  onIpAddressSelect?: (value: string) => void;
  onBack: () => void;
  onViewDetectionRules: () => void;
}
const botActivityData = [
  { id: 1, title: 'Total Bot Events', count: 75 },
  { id: 2, title: 'Blocked Attempts', count: 24 },
  { id: 3, title: 'Detected IPs', count: 52 },
];
const defaultEventTypeOptions = [
  { label: 'Event Type', value: 'eventType' },
  { label: 'Login Attempt', value: 'loginAttempt' },
  { label: 'Suspicious Registration', value: 'suspiciousRegistration' },
  { label: 'API Request Flood', value: 'apiRequestFlood' },
];

const defaultIpAddressOptions = [
  { label: 'Ip Address', value: 'ipAddress' },
  { label: 'Blocked Ip', value: 'blockedIp' },
  { label: 'Flagged For Review', value: 'laggedforreview' },
  { label: 'Rate Limited', value: 'ratelimited' },
];
const DDoSLogs: React.FC<DDosLogsProps> = ({
  onBack,
  title = 'Bot Activity Log',
  eventTypeOptions = defaultEventTypeOptions,
  ipAddressOptions = defaultIpAddressOptions,
  additionalButton,
  onSearch,
  onEventTypeSelect,
  onIpAddressSelect,
  onViewDetectionRules,
}) => {
  const [selectedEventType, setSelectedAttackType] = useState('');
  const [selectedIPAddress, setSelectedIPAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTokenSelect = (value: string) => {
    setSelectedAttackType(value);
    if (onEventTypeSelect) {
      onEventTypeSelect(value);
    }
  };

  const handleStatusSelect = (value: string) => {
    setSelectedIPAddress(value);
    if (onIpAddressSelect) {
      onIpAddressSelect(value);
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
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {botActivityData.map((item) => (
          <div
            key={item.id}
            className="rounded-md border-greenPrimary-300 bg-lightgray-primary px-5 py-5 dark:border dark:bg-dashBordCardsBG"
          >
            <Text className="text-sm font-medium text-greenPrimary-100">
              {item.title}
            </Text>
            <Text className="text-3xl font-semibold text-black-light dark:text-white">
              {item.count}
            </Text>
          </div>
        ))}
      </div>
      <div className="w-full rounded-md border-greenPrimary-300 bg-lightgray-primary bg-[url('/images/lightMode-shadow-left.svg')] bg-[length:35%_35%] bg-no-repeat dark:border dark:bg-dashBordCardsBG dark:bg-[url('/images/shadow-left.svg')]">
        <div className="flex flex-col gap-4 border-b border-white p-4 pb-4 dark:border-greenPrimary-300 lg:flex-row lg:items-center lg:justify-between">
          <Text className="w-full text-xs font-semibold text-greenPrimary-700 dark:text-white md:text-sm lg:w-auto">
            {title}
          </Text>
          <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row lg:items-center ">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center ">
              <Input
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search"
                className="w-full "
              />
              <Dropdown
                options={eventTypeOptions}
                selectedValue={selectedEventType}
                onSelect={handleTokenSelect}
                placeholder="Event Type"
                className="w-full "
              />
              <Dropdown
                options={ipAddressOptions}
                selectedValue={selectedIPAddress}
                onSelect={handleStatusSelect}
                placeholder="Ip Address"
                className="w-full "
              />
              <Button
                size="md"
                className="whitespace-nowrap !bg-yellow-primary  px-2 text-xs font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
                onClick={onViewDetectionRules}
              >
                Configure Bot Detection Rules
              </Button>
              <Button
                size="md"
                className="!bg-yellow-primary px-3 text-xs  font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
              >
                Export
              </Button>
              {additionalButton && <div className=" ">{additionalButton}</div>}
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <Table
            selectedEventType={selectedEventType}
            selectedIPAddress={selectedIPAddress}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </>
  );
};

export default DDoSLogs;
