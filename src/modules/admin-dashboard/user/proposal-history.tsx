'use client';
import React, { useState } from 'react';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
import { Text } from 'rizzui';
import Table from './table/table';

interface UserManagementProps {

    onviewAcount: () => void;
}

const tokenOptions = [
    { label: 'Status', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Whitelisted', value: 'Whitelisted' },
    { label: 'Banned', value: 'Banned' },
];

const statusOptions = [
    { label: 'Filter By KYC', value: 'all' },
    { label: 'Verified', value: 'Verified' },
    { label: 'Pending', value: 'Pending' },
    { label: 'No', value: 'No' },
];

const UserManagement: React.FC<UserManagementProps> = ({ onviewAcount }) => {
    const [selectedToken, setSelectedToken] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <>
            <div className='flex justify-between md:flex-row flex-col items-center mb-4'>
                <div className="greenPrimary-300 p-4 pb-4 w-full md:w-1/2">
                    <Text className="text-2xl font-semibold dark:text-white">
                        User Management
                    </Text>
                </div>
                <div className="rounded-md w-full">
                    <div className="flex  flex-col sm:flex-row items-center justify-evenly gap-4 w-full">
                        <Input
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Wallet Address, Email, Username"
                            className="dark:border dark:border-greenPrimary-300  rounded-md bg-transparent"
                        />
                        <div className='w-full md:w-1/2'>
                        <Dropdown
                            options={tokenOptions}
                            selectedValue={selectedToken}
                            onSelect={setSelectedToken}
                            placeholder="Status"
                            className="rounded-md"
                        
                        />
                        </div>
                        <div className='w-full md:w-1/2'>
                        <Dropdown
                            options={statusOptions}
                            selectedValue={selectedStatus}
                            onSelect={setSelectedStatus}
                            placeholder="Filter By KYC"
                            className="rounded-md"
                        />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className='bg-lightgray-primary border border-white dark:border dark:border-greenPrimary-300 rounded-xl relative dark:bg-dashBordCardsBG dark:bg-[url("/ellipse.svg")] bg-[url("/ellipse2.svg")] bg-top-left bg-no-repeat'
            >
                <div className="greenPrimary-300 border-t-0 border-l-0 border-r-0 dark:border-r-0 dark:border-t-0 dark:border-l-0 border border-b-white dark:border dark:border-b-greenPrimary-300 p-4 pb-4">
                    <Text className="text-base text-center font-bold dark:text-white">
                        Proposal History
                    </Text>
                </div>
                <div>
                    <Table
                        selectedToken={selectedToken}
                        selectedStatus={selectedStatus}
                        searchQuery={searchQuery}
                        onviewAcount={onviewAcount}
                    />
                </div>
            </div>
        </>
    );
};

export default UserManagement;
