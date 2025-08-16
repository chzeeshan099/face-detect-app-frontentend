import React from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface ContractOption {
    value: string;
    label: string;
    inputs: string[];
}

interface ContractSelectorProps {
    selectedValue: string;
    contractOptions: ContractOption[];
    uncategorizedInputs: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ContractSelector: React.FC<ContractSelectorProps> = ({
    selectedValue,
    contractOptions,
    uncategorizedInputs,
    onChange
}) => {
    const getDropdownOptions = () => {
        const options = [];

        options.push(<option key="default" value="" disabled className='cursor-pointer'>Select Contract</option>);

        uncategorizedInputs.forEach((input, index) => {
            options.push(
                <option
                    key={`uncategorized-${index}`}
                    value={`:${input}`}
                    className="text-sm italic cursor-pointer"
                >
                    {input}
                </option>
            );
        });

        contractOptions.forEach(contract => {
            options.push(
                <option key={contract.value} value={contract.value} className="cursor-pointer">
                    {contract.label}
                </option>
            );

            if (contract.inputs.length > 0) {
                contract.inputs.forEach((storedInput, index) => {
                    options.push(
                        <option
                            key={`${contract.value}-input-${index}`}
                            value={`${contract.value}:${storedInput}`}
                            className="pl-6 text-sm italic hover:cursor-pointer"
                        >
                            ↳ {storedInput}
                        </option>
                    );
                });
            }
        });

        return options;
    };

    return (
        <div className="relative dark:">
            <select
                id="contract"
                className="text-xs border-none sm:text-sm h-10 sm:h-11 w-full dark:text-greenPrimary-700 text-greenPrimary-700 dark:bg-greenPrimary-200 rounded-md dark:border dark:border-greenPrimary-300 appearance-none pr-8 px-3 cursor-pointer hover:outline-none hover:ring-0 focus:outline-none focus:ring-0"
                value={selectedValue}
                onChange={onChange}
            >
                {getDropdownOptions()}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer">
                <FaAngleDown className="h-3 w-3 sm:h-4 sm:w-4 text-greenPrimary-700 dark:text-greenPrimary-700" />
            </div>
        </div>
    );
};

export default ContractSelector;
