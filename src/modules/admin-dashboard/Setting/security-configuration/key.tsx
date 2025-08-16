import React, { useState } from 'react'
import { Button, Text, Input, Checkbox } from 'rizzui'
import Table from './table/table'
import { IoCloseOutline, IoCalendarOutline, IoTimeOutline } from 'react-icons/io5'

const External = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expirationDate, setExpirationDate] = useState('');
    const [expirationTime, setExpirationTime] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Custom date picker handler
    const handleDateChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setExpirationDate(e.target.value);
    };

    // Custom time picker handler
    const handleTimeChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setExpirationTime(e.target.value);
    };

    return (
        <div className='dark:border-t dark:border-greenPrimary-300 p-4 relative'>
            <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4'>
                <div className='flex items-center flex-wrap gap-2'>
                    <Text className="text-base font-bold dark:text-greenPrimary-100">
                        Keys
                    </Text>
                    <Text className="text-base font-bold dark:text-white">
                        (External Integrations)
                    </Text>
                </div>
                <div className="flex justify-end">
                    <Button
                        className="bg-yellow-primary hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6"
                        onClick={openModal}
                    >
                        Generate New Key
                    </Button>
                </div>
            </div>
            <div>
                <Table />
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white dark:bg-greenPrimary-200 rounded-md w-full max-w-[650px] my-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-5 relative top-0 dark:bg-greenPrimary-200 z-10">
                            <div className="absolute inset-x-0 text-center">
                                <Text className="dark:text-white text-greenPrimary-100 text-base font-roboto font-medium">Generate New Key</Text>
                            </div>
                            <div className="invisible">
                            </div>
                            <button onClick={closeModal} className="text-white z-10">
                                <IoCloseOutline size={24} className='dark:text-white text-gray-950' />
                            </button>
                        </div>
                        <div className="p-5 pt-0">
                            <div className="mb-4">
                                <input
                                    placeholder="Key name/ Identifier"
                                    className="w-full rounded-md dark:bg-greenPrimary-secodarydark dark:border border-none text-white bg-lightgray-secondary focus:outline-none focus:ring-0"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Custom Date Input */}
                                <div className="w-full">
                                    <label className="block mb-1.5 text-sm ml-1 dark:text-greenPrimary-100">Expiration date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full rounded-md dark:bg-greenPrimary-secodarydark border-none dark:text-white bg-lightgray-secondary p-2.5 pr-10 focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:bottom-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:z-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            value={expirationDate}
                                            onChange={handleDateChange}
                                            style={{
                                                colorScheme: 'dark',
                                            }}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <IoCalendarOutline className="dark:text-white text-greenPrimary-200" size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Custom Time Input */}
                                <div className="w-full">
                                    <label className="block mb-1.5 ml-1 dark:text-greenPrimary-100">Expiration time</label>
                                    <div className="relative">
                                        <input
                                            type="time"
                                            className="w-full rounded-md dark:bg-greenPrimary-secodarydark border-none dark:text-white bg-lightgray-secondary p-2.5 pr-10 focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:bottom-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:z-10 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            value={expirationTime}
                                            onChange={handleTimeChange}
                                            style={{
                                                colorScheme: 'dark',
                                            }}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <IoTimeOutline className="dark:text-white text-greenPrimary-200" size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dark:bg-greenPrimary-150 rounded-lg p-4 my-6 bg-lightgray-secondary">
                                <h3 className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 mb-4">Permissions/ Scope</h3>
                                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-y-3">
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="border-yellow-primary"
                                            variant="outline"
                                            inputClassName='border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none'
                                        />
                                        <span className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 ml-2">Read User Data</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="border-yellow-primary"
                                            variant="outline"
                                            inputClassName='border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none'
                                        />
                                        <span className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 ml-2">Write User Data</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="border-yellow-primary"
                                            variant="outline"
                                            inputClassName='border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none'
                                        />
                                        <span className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 ml-2">Trigger Webhooks</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="border-yellow-primary"
                                            variant="outline"
                                            inputClassName='border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none'
                                        />
                                        <span className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 ml-2">View Analytics</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="border-yellow-primary"
                                            variant="outline"
                                            inputClassName='border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none'
                                        />
                                        <span className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 ml-2">Manage Presale</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Checkbox
                                            className="border-yellow-primary"
                                            variant="outline"
                                            inputClassName='border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none'
                                        />
                                        <span className="dark:text-white text-sm font-medium font-roboto text-greenPrimary-200 ml-2">Access Logs</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <Button
                                    className="bg-transparent border-gray-200 text-black dark:text-white font-semibold px-4 py-2 w-full text-sm sm:text-base order-2 sm:order-1"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-yellow-primary hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-4 py-2 w-full text-sm sm:text-base order-1 sm:order-2">
                                    Generate Key
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default External;