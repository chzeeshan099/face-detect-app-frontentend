'use client';

import { IoIosSearch, IoIosClose } from 'react-icons/io';
import { Input } from 'rizzui';
import { ChangeEvent } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  inputClassName?: string;
}

export default function SearchInput({
  placeholder = 'search',
  value = '',
  onChange,
  className = '',
  inputClassName = '',
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <div
      className={`w-full rounded-md border border-white dark:border-greenPrimary-300 ${className}`}
    >
      <Input
        prefix={
          <IoIosSearch className="h-5 w-5 text-black-light dark:text-white" />
        }
        suffix={
          value && (
            <button
              onClick={handleClear}
              className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-greenPrimary-200"
            >
              <IoIosClose className="h-4 w-4 text-black-light dark:text-white" />
            </button>
          )
        }
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="dark:!placeholder:text-white w-full border-none shadow-none placeholder:text-black-light"
        inputClassName={`dark:!text-white !text-black-light 
          dark:!placeholder:text-white 
          !placeholder:text-black-light
          !border-none 
          !ring-0 
          !shadow-none 
          focus:!ring-0 
          focus:!border-none 
          focus-visible:!ring-0 
          focus-visible:!border-transparent 
          focus:!outline-none 
          ${inputClassName}`}
      />
    </div>
  );
}
