import React, { useState } from 'react'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import { Button } from 'rizzui'
import ContractTabs from '../smart-contract/contract-tabs'
import ContractSelector from '../smart-contract/contract-selector'
import InputField from '../smart-contract/input-field'

const SmartContractInteraction = () => {
    const [activeTab, setActiveTab] = useState('read');
    const [selectedContract, setSelectedContract] = useState('');
    const [input, setInput] = useState('');
    const [contractOptions, setContractOptions] = useState([
        { value: 'contract1', label: 'Token Contract', inputs: [] as string[] },
        { value: 'contract2', label: 'Presale Contract', inputs: [] as string[] },
        { value: 'contract3', label: 'Staking Contract', inputs: [] as string[] },
    ]);
    const [uncategorizedInputs, setUncategorizedInputs] = useState<string[]>([]);
    const [selectedStoredValue, setSelectedStoredValue] = useState('');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setSelectedContract('');
        setInput('');
        setSelectedStoredValue('');
    };

    const handleExecute = () => {
        if (activeTab === 'write' && input.trim()) {
            if (selectedContract) {
                const updatedOptions = contractOptions.map(option => {
                    if (option.value === selectedContract) {
                        if (!option.inputs.includes(input.trim())) {
                            return {
                                ...option,
                                inputs: [...option.inputs, input.trim()]
                            };
                        }
                    }
                    return option;
                });

                setContractOptions(updatedOptions);
            } else {
                if (!uncategorizedInputs.includes(input.trim())) {
                    setUncategorizedInputs([...uncategorizedInputs, input.trim()]);
                }
            }

            console.log('Executing write function with:', {
                contract: selectedContract || 'none',
                input
            });
        } else {
            console.log('Executing read function with:', {
                contract: selectedContract || 'none',
                input
            });
        }
    };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;

        if (selected.includes(':')) {
            const parts = selected.split(':');
            const contractId = parts[0];
            const storedValue = parts.slice(1).join(':');

            if (contractId) {
                setSelectedContract(contractId);
            } else {
                setSelectedContract('');
            }

            setInput(storedValue);
            setSelectedStoredValue(selected);
        } else {
            setSelectedContract(selected);
            setInput('');
            setSelectedStoredValue('');
        }
    };

    const handleInputChange = (value: string) => {
        setInput(value);
        if (selectedStoredValue) {
            setSelectedStoredValue('');
        }
    };

    return (
        <CustomWidgetCard title='Smart Contract Interaction' shadow='left' className="w-full">
            <ContractTabs 
                activeTab={activeTab} 
                onTabChange={handleTabChange} 
            />
            <div className="my-2 sm:my-4 p-3 sm:p-5">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center w-full">
                    <div className="w-full sm:w-1/3 md:w-1/4">
                        <ContractSelector 
                            selectedValue={selectedStoredValue || selectedContract}
                            contractOptions={contractOptions}
                            uncategorizedInputs={uncategorizedInputs}
                            onChange={handleDropdownChange}
                        />
                    </div>
                    <div className="w-full sm:w-2/3 md:w-3/4">
                        <InputField 
                            value={input}
                            onChange={handleInputChange}
                            readOnly={activeTab === 'read'}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center sm:justify-end px-3 sm:px-5 pb-3 sm:pb-5">
                <Button
                    onClick={handleExecute}
                    className="!bg-yellow-primary !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6"
                >
                    Execute
                </Button>
            </div>
        </CustomWidgetCard>
    );
};

export default SmartContractInteraction;
