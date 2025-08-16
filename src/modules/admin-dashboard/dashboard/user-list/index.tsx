'use client';

import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Text } from 'rizzui';
import Input from '@/components/input/input';
import Dropdown from '@/components/dropdown/dropdown';
import Table from './table/table';

interface UserListProps {
    onBack: () => void;
}


const statusOptions = [
    { label: 'Status', value: 'status' },
    { label: 'Pending KYC', value: 'pendingKyc' },
    { label: 'Active', value: 'active' },
    { label: 'Deactive', value: 'deactive' },
];

const UserList: React.FC<UserListProps> = ({ onBack }) => {
    const [selectedToken, setSelectedToken] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };
    return (
        <div className="w-full">
            <div className="flex items-center my-4">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center mr-4  hover:bg-gray-100 dark:hover:bg-greenPrimary-200 rounded-full transition-colors"
                >
                    <FaArrowLeft className="text-greenPrimary-700 dark:text-white" />
                </button>
                <Text className="font-semibold text-2xl dark:text-white text-greenPrimary-secodarydark">User List</Text>
            </div>

            <div className="rounded-md dark:border border-greenPrimary-300 bg-lightgray-primary dark:bg-dashBordCardsBG bg-[url('/images/lightMode-shadow-left.svg')] dark:bg-[url('/images/shadow-left.svg')]  bg-no-repeat bg-[length:35%_35%]">
                <div className="flex flex-col md:flex-row items-center justify-between border-b dark:border-greenPrimary-300 border-white p-4 pb-4">
                    <Text className="text-sm md:text-base w-full md:w-auto  font-bold text-greenPrimary-700 dark:text-white my-2 md:my-0">
                        List of Users
                    </Text>
                    <div className="flex flex-col gap-4 w-full md:w-auto md:flex-row md:items-center md:gap-4">
                        <Input
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                        <Dropdown
                            options={statusOptions}
                            selectedValue={selectedStatus}
                            onSelect={setSelectedStatus}
                            placeholder="Status"
                        />
                  
                    <Button size='md' className='!bg-yellow-primary whitespace-nowrap hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6'>
                        Add New User
                    </Button>
                    <Button size='md' className='!bg-yellow-primary hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6'>
                        Export
                    </Button>
                    </div>
                </div>
                <div className='overflow-x-auto'>
                    <Table
                        selectedToken={selectedToken}
                        selectedStatus={selectedStatus}
                        searchQuery={searchQuery}
                    />
                </div>
            </div>

        </div>
    );
};

export default UserList;