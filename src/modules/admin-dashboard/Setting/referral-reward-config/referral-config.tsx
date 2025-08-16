'use client';

import CustomWidgetCard from '@/components/cards/custom-widget-card';
import React, { useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { Button, Input, Dropdown, Text, Select } from 'rizzui';
import { FaAngleDown } from 'react-icons/fa';

interface ReferralConfig {
  referrerBonus: number;
  referredUserBonus: number;
  vestingPeriod: number;
  vestingTimeUnit: 'day' | 'week' | 'month';
  vestingType: 'Linear' | 'Cliff';
}

// Add this interface for select options
interface SelectOption {
  value: string;
  label: string;
}

const timeUnitOptions = [
  { value: 'day', label: 'Days' },
  { value: 'week', label: 'Weeks' },
  { value: 'month', label: 'Months' },
];

const vestingTypeOptions = [
  { value: 'Linear', label: 'Linear' },
  { value: 'Cliff', label: 'Cliff' },
];

const DropdownSelector = ({ selected, setSelected, options }: any) => (
  <Dropdown>
    <Dropdown.Trigger>
        
      <Button
        size="sm"
        variant="text"
        className="rounded-none px-3 flex items-center gap-1 text-greenPrimary-700 dark:text-white min-w-[80px] justify-center"
      >
        <div className='   h-6 border-l dark:border-white border-greenPrimary-700 mr-3'></div>
        {options.find((opt: any) => opt.value === selected)?.label || selected}
        <FaAngleDown className="text-xs" />
      </Button>
    </Dropdown.Trigger>
    <Dropdown.Menu className="min-w-[80px]">
      {options.map((option: any) => (
        <Dropdown.Item
          key={option.value}
          onClick={() => setSelected(option.value)}
          className="text-center justify-center"
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default function ReferralRewardConfig() {
  const [isEditing, setIsEditing] = useState(false);
  const [config, setConfig] = useState<ReferralConfig>({
    referrerBonus: 5,
    referredUserBonus: 2,
    vestingPeriod: 30,
    vestingTimeUnit: 'day',
    vestingType: 'Linear',
  });

  const handleInputChange = <K extends keyof ReferralConfig>(
    field: K,
    value: ReferralConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    console.log('Saving config:', config);
    setIsEditing(false);
  };
  const handleCancel = () => setIsEditing(false);

  return (
    <CustomWidgetCard
      title="Referral & Reward Configuration"
      button={
        !isEditing
          ? {
              text: <TbEdit size={20} />,
              variant: 'text',
              onClick: handleEdit,
              className: 'bg-transparent dark:text-white',
            }
          : { text: '', variant: 'text', className: 'hidden' }
      }
      shadow="left"
      className="w-full"
    >
      <div className="p-6">
        <Text className="text-greenPrimary-100 text-center text-xs font-semibold dark:text-white">
          Reward Percentage
        </Text>

        <div className="mt-4 space-y-4">
          <div>
            <Text className="text-sm text-greenPrimary-100 font-medium">
              Referrer Bonus (% of referred contribution)
            </Text>
            {isEditing ? (
              <Input
                type="number"
                suffix={
                    <div className="h-full border-l border-greenPrimary-700 dark:border-white text-greenPrimary-700 dark:text-white px-3 flex items-center">%</div>
                  }
                value={config.referrerBonus}
                onChange={(e) =>
                  handleInputChange('referrerBonus', Number(e.target.value))
                }
                inputClassName="placeholder:text-white bg-white dark:bg-greenPrimary-200 border-none"
                className=" border-none"
              />
            ) : (
              <p className="dark:text-white text-greenPrimary-1000">
                {config.referrerBonus}%
              </p>
            )}
          </div>

          <div>
            <Text className="text-sm text-greenPrimary-100 font-medium">
              Referred User Bonus (% discount/bonus)
            </Text>
            {isEditing ? (
              <Input
                type="number"
                suffix={
                    <div className="h-full border-l border-greenPrimary-700 dark:border-white dark:text-white px-3 flex items-center">%</div>
                  }
                value={config.referredUserBonus}
                onChange={(e) =>
                  handleInputChange('referredUserBonus', Number(e.target.value))
                }
                inputClassName="placeholder:text-white bg-white dark:bg-greenPrimary-200 border-none"
                className=""
              />
            ) : (
              <p className="dark:text-white text-greenPrimary-1000">
                {config.referredUserBonus}%
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-b dark:border-greenPrimary-200 border-white"></div>

      <div className="p-6">
        <Text className="text-greenPrimary-100 text-center text-xs font-semibold dark:text-white">
          Bonus Vesting
        </Text>

        <div className="mt-4 space-y-4">
          <div>
            <Text className="text-sm text-greenPrimary-100 font-medium">
              Vesting Period
            </Text>
            {isEditing ? (
              <Input
                type="number"
                value={config.vestingPeriod}
                onChange={(e) =>
                  handleInputChange('vestingPeriod', Number(e.target.value))
                }
                inputClassName="placeholder:text-white bg-white dark:bg-greenPrimary-200 border-none"
                className=""
                suffix={
                  <DropdownSelector
                    selected={config.vestingTimeUnit}
                    setSelected={(val: any) =>
                      handleInputChange('vestingTimeUnit', val)
                    }
                    options={timeUnitOptions}
                  />
                }
              />
            ) : (
              <p className="dark:text-white text-greenPrimary-1000">
                {config.vestingPeriod}{' '}
                {
                  timeUnitOptions.find(
                    (opt) => opt.value === config.vestingTimeUnit
                  )?.label
                }
              </p>
            )}
          </div>

          <div>
            <Text className="text-sm text-greenPrimary-100 font-medium">
              Vesting Type
            </Text>
            {isEditing ? (
              <Select
                value={config.vestingType}
                onChange={(selected: string | SelectOption | null) => {
                  if (selected === null) {
                    handleInputChange('vestingType', 'Linear' as ReferralConfig['vestingType']);
                  } else if (typeof selected === 'string') {
                    handleInputChange('vestingType', selected as ReferralConfig['vestingType']);
                  } else {
                    handleInputChange('vestingType', selected.value as ReferralConfig['vestingType']);
                  }
                }}
                options={vestingTypeOptions}
                className="dark:bg-greenPrimary-200 bg-white border-none"
              />
            ) : (
              <p className="dark:text-white text-greenPrimary-1000">
                {config.vestingType}
              </p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="p-6 flex justify-end gap-4 border-t dark:border-greenPrimary-200 border-white">
          <Button
            onClick={handleSave}
            className="!bg-yellow-primary text-greenPrimary-secodarydark hover:bg-greenPrimary-600"
          >
            Save Changes
          </Button>
        
        </div>
      )}
    </CustomWidgetCard>
  );
}
