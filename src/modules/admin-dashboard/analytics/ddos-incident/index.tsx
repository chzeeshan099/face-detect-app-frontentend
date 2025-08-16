import Table from './table/table';
import React, { ReactNode, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Text } from 'rizzui';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
import BotLogsModal from '../models/ddosprotection';
interface DDosLogsProps {
  title?: string;
  attackTypeOptions?: Array<{ label: string; value: string }>;
  statusOptions?: Array<{ label: string; value: string }>;
  additionalButton?: ReactNode;
  onSearch?: (value: string) => void;
  onAttackTypeSelect?: (value: string) => void;
  onStatusSelect?: (value: string) => void;
  onBack: () => void;
}
const incidentData = [
  { id: 1, title: 'Total Incidents', count: 459 },
  { id: 2, title: 'Incidents Today', count: 159 },
  { id: 3, title: 'Mitigated Incidents', count: 234 },
];

const defaultAttackTypeOptions = [
  { label: 'Attack Type', value: 'attackType' },
  { label: 'SYN Flood', value: 'synFlood' },
  { label: 'HTTP Flood', value: 'httpFlood' },
  { label: 'UDP Amplification', value: 'udpAmplification' },
];

const defaultStatusOptions = [
  { label: 'Status', value: 'status' },
  { label: 'Mitigated', value: 'mitigated' },
];
const DDoSLogs: React.FC<DDosLogsProps> = ({
  onBack,
  title = 'DDoS Incident Logs',
  attackTypeOptions = defaultAttackTypeOptions,
  statusOptions = defaultStatusOptions,
  additionalButton,
  onSearch,
  onAttackTypeSelect,
  onStatusSelect,
}) => {
  const [selectedAttackType, setSelectedAttackType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBotLogsModalOpen, setIsBotLogsModalOpen] = useState(false);

  const handleOpenBotLogsModal = () => {
    setIsBotLogsModalOpen(true);
  };

  const handleCloseBotLogsModal = () => {
    setIsBotLogsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleTokenSelect = (value: string) => {
    setSelectedAttackType(value);
    if (onAttackTypeSelect) {
      onAttackTypeSelect(value);
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
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {incidentData.map((item) => (
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
          <Text className="w-full whitespace-nowrap text-xs font-semibold text-greenPrimary-700 dark:text-white md:text-sm lg:w-auto">
            List of {title}
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
                options={attackTypeOptions}
                selectedValue={selectedAttackType}
                onSelect={handleTokenSelect}
                placeholder="Attack Type"
                className="w-full "
              />
              <Dropdown
                options={statusOptions}
                selectedValue={selectedStatus}
                onSelect={handleStatusSelect}
                placeholder="Status"
                className="w-full "
              />
              <Button
                size="md"
                className="whitespace-nowrap !bg-yellow-primary  px-2 text-xs font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
                onClick={handleOpenBotLogsModal}
              >
                Configure DDoS Protection Settings
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
            selectedAttackType={selectedAttackType}
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <BotLogsModal
        isOpen={isBotLogsModalOpen}
        onClose={handleCloseBotLogsModal}
      />
    </>
  );
};

export default DDoSLogs;
