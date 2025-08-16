'use client';
import { Checkbox, Input } from "rizzui";
import React, { useState, useEffect } from 'react';
import { Modal, Text, Button } from 'rizzui';
import { Select } from "rizzui";
import { RxCross2 } from "react-icons/rx";
interface BotLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BotLogsModal: React.FC<BotLogsModalProps> = ({ isOpen, onClose }) => {
    const [ruleName, setRuleName] = useState('');
    const [ruleType, setRuleType] = useState(null);
    const [ruleAction, setRuleAction] = useState(null);
    const [ruleStatus, setRuleStatus] = useState(null);
    const [description, setDescription] = useState('');
    const [enableProtection, setEnableProtection] = useState(false);
    const [errors, setErrors] = useState({
        ruleName: '',
        ruleType: '',
        ruleAction: '',
        ruleStatus: '',
        description: ''
    });

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const resetForm = () => {
        setRuleName('');
        setRuleType(null);
        setRuleAction(null);
        setRuleStatus(null);
        setDescription('');
        setEnableProtection(false);
        setErrors({
            ruleName: '',
            ruleType: '',
            ruleAction: '',
            ruleStatus: '',
            description: ''
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            ruleName: '',
            ruleType: '',
            ruleAction: '',
            ruleStatus: '',
            description: ''
        };

        if (!ruleName.trim()) {
            newErrors.ruleName = 'Rule name is required';
            isValid = false;
        }

        if (!ruleType) {
            newErrors.ruleType = 'Rule type is required';
            isValid = false;
        }

        if (!ruleAction) {
            newErrors.ruleAction = 'Rule action is required';
            isValid = false;
        }

        if (!ruleStatus) {
            newErrors.ruleStatus = 'Status is required';
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const formData = { 
                ruleName, 
                ruleType, 
                ruleAction, 
                ruleStatus, 
                description,
                enableProtection 
            };
            console.log('Form data saved successfully:', formData);
            resetForm();
            onClose();
        }
    };

    const action = [
        { label: 'Allow', value: 'allow' },
        { label: 'Block', value: 'block' },
        { label: 'Monitor', value: 'monitor' },
    ];
    const status = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="xl"
            containerClassName="w-11/12 sm:w-10/12 md:w-4/5 lg:w-2/4 max-w-full mx-auto"
        >
            <div className='dark:bg-greenPrimary-200 bg-white w-full p-3 sm:p-5 rounded-lg relative'>
                <div className="relative mb-4 sm:mb-8">
                    <Text className='text-center text-base font-medium dark:text-white text-greenPrimary-100  w-full'>DDoS Protection Settings</Text>
                    <button 
                        onClick={handleClose}
                        className="absolute right-0 top-0 text-white hover:text-gray-300 transition-colors"
                    >
                        <RxCross2 size={20} className="dark:text-white  text-gray-950"/>
                    </button>
                </div>
    
                <div>
                    <Input 
                        placeholder="Traffic threshold for detection (requests/second)"
                        value={ruleName}
                        onChange={(e) => setRuleName(e.target.value)}
                        className=""
                        inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none resize-none rounded-md  !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                    />
                    {errors.ruleName && (
                        <p className="text-red-500 text-xs mt-1">{errors.ruleName}</p>
                    )}
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4">
                    <div className="flex-1">
                        <Select
                            label="Mitigation Action"
                            labelClassName="text-gray-950 dark:text-white"
                            options={[
                                { label: 'IP Based', value: 'ip_based' },
                                { label: 'Request Based', value: 'request_based' },
                                { label: 'Behavior Based', value: 'behavior_based' }
                            ]}
                            value={ruleType}
                            onChange={setRuleType}
                            selectClassName='!border-none !hover:border-none resize-none rounded-md  !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 ring-0'
                        />
                        {errors.ruleType && (
                            <p className="text-red-500 text-xs mt-1">{errors.ruleType}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <Select
                            label="Mitigation Duration"
                            labelClassName="text-gray-950 dark:text-white"
                            options={action}
                            value={ruleAction}
                            onChange={setRuleAction}
                            selectClassName='!border-none !hover:border-none resize-none rounded-md  !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 ring-0'
                        />
                        {errors.ruleAction && (
                            <p className="text-red-500 text-xs mt-1">{errors.ruleAction}</p>
                        )}
                    </div>
                    
                </div>
                <div className="mt-4">
                    <textarea
                        placeholder="Whitelisted IP addresses (comma separated)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-20 sm:h-24 p-3 dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none resize-none rounded-md  !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                    )}
                </div>
                <div className="mt-4">
                    <Checkbox 
                    size="sm"
                        label="Enable Protection"  
                        className="dark:text-white text-gray-950 text-sm font-medium"
                        checked={enableProtection}
                        onChange={() => setEnableProtection(!enableProtection)}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-10">
                    <Button 
                        type="button"
                     
                        onClick={handleClose}
                        className='border-gray-300 w-full dark:border-greenPrimary-700 dark:text-white text-black-light dark:!bg-transparent bg-white hover:!bg-gray-100 dark:hover:bg-greenPrimary-700 text-xs md:text-sm'
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="button"
                        variant="solid" 
                        onClick={handleSubmit}
                        className='!bg-yellow-primary border-none !hover:bg-yellow-primary w-full dark:text-white text-gray-950 text-xs md:text-sm'
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default BotLogsModal;