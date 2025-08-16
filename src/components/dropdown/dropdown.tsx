'use client';

import { FaChevronDown } from 'react-icons/fa';
import { Dropdown, Button } from 'rizzui';
import { useState } from 'react';

interface DropdownProps {
  options: { label: string; value: string }[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDropdown({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select',
  className = '',
}: DropdownProps) {
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <Dropdown className="w-full">
      <Dropdown.Trigger>
        <Button
          as="span"
          variant="solid"
          className={`flex  items-center justify-between gap-2 text-greenPrimary-700 dark:text-white !bg-white dark:!bg-greenPrimary-200 cursor-pointer border  dark:border-greenPrimary-300 rounded-md whitespace-nowrap ${className}`}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <FaChevronDown className="ml-2 w-4" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className='bg-lightgray-primary dark:!bg-greenPrimary-200 border border-white dark:border-greenPrimary-300 text-greenPrimary-700 dark:text-white whitespace-nowrap'>
        {options.map((option) => (
          <Dropdown.Item
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={selectedValue === option.value ? 'dark:bg-greenPrimary-300 bg-white' : 'dark:hover:bg-greenPrimary-300 hover:bg-gray-100'}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
