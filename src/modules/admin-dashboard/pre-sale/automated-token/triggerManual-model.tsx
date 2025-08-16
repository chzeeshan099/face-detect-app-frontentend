import React from 'react'
import { Button, Modal, Text, Input } from 'rizzui'
import { IoClose } from 'react-icons/io5'

interface TriggerModelProps {
    isOpen: boolean;
    onClose: () => void;
    syncOption: string | null;
    setSyncOption: (value: string | null) => void;
    fromDate: string;
    setFromDate: (value: string) => void;
    toDate: string;
    setToDate: (value: string) => void;
    onSubmit: () => void;
}

const TriggerModel: React.FC<TriggerModelProps> = ({
    isOpen,
    onClose,
    syncOption,
    setSyncOption,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    onSubmit
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-xl mx-auto"
        >
            <div className="p-6 bg-white dark:bg-greenPrimary-200 rounded-lg relative">
                <div className="flex justify-center relative items-center mb-5">
                    <Text className="text-md font-semibold text-greenPrimary-100 text-center dark:text-white">Trigger Manual Token Sync</Text>
                    <button
                        onClick={onClose}
                        className="text-gray-500 absolute right-0 top-0 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                    >
                        <IoClose className="text-xl" />
                    </button>
                </div>

                <div className="mb-6 p-4 dark:bg-greenPrimary-950/20 bg-sky-light text-sm rounded-md">
                    <Text className="text-gray-700 text-sm dark:text-white">
                        This will manually trigger the token distribution sync process. Ensure you understand the implications before proceeding.
                    </Text>
                </div>

                <div className="flex justify-between gap-5 sm:flex-row flex-col mb-6">
                    <div className='w-full'>
                        <label className="block text-xs mb-2 text-greenPrimary-100 dark:text-greenPrimary-100">
                            Sync data from date
                        </label>
                        <Input
                            type="date"
                            className="w-full"
                            inputClassName="border dark:!border-greenPrimary-300 border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none text-sm bg-lightgray-primary dark:bg-greenPrimary-secodarydark dark:text-white focus:outline-none focus:border-none"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    <div className='w-full'>
                        <label className="block text-xs mb-2 text-greenPrimary-100 dark:text-greenPrimary-100">
                            Sync data to date
                        </label>
                        <Input
                            type="date"
                            className="w-full"
                            inputClassName="border dark:!border-greenPrimary-300 border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none text-sm bg-lightgray-primary dark:bg-greenPrimary-secodarydark dark:text-white focus:outline-none focus:border-none"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>
              
                <div className="space-y-4 mb-6 px-1">
                    <label className="flex items-center cursor-pointer space-x-3">
                        <div className="relative flex items-center">
                            <input
                                type="radio"
                                name="syncOption"
                                value="all"
                                checked={syncOption === 'all'}
                                onChange={() => setSyncOption('all')}
                                className="sr-only" 
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${syncOption === 'all' ? 'border-yellow-primary' : 'border-yellow-primary'}`}>
                                {syncOption === 'all' && (
                                    <div className="w-3 h-3 rounded-full bg-yellow-primary"></div>
                                )}
                            </div>
                        </div>
                        <span className="text-sm font-medium dark:text-white">Sync All Users</span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer space-x-3">
                        <div className="relative flex items-center">
                            <input
                                type="radio"
                                name="syncOption"
                                value="pending"
                                checked={syncOption === 'pending'}
                                onChange={() => setSyncOption('pending')}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${syncOption === 'pending' ? 'border-yellow-primary' : 'border-yellow-primary'}`}>
                                {syncOption === 'pending' && (
                                    <div className="w-3 h-3 rounded-full bg-yellow-primary"></div>
                                )}
                            </div>
                        </div>
                        <span className="text-sm font-medium dark:text-white">Sync Pending Only</span>
                    </label>
                </div>
                
                <div className="flex justify-between gap-4 mt-6 sm:flex-row flex-col">
                    <Button
                
                        onClick={onClose}
                        className="border-gray-300 w-full dark:border-greenPrimary-700 dark:text-white text-black-light dark:!bg-transparent bg-white hover:!bg-gray-100 dark:hover:bg-greenPrimary-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        type='submit'
                        className="!bg-yellow-primary w-full hover:!bg-yellow-600 text-greenPrimary-secodarydark font-semibold"
                        disabled={!syncOption || !fromDate || !toDate}
                    >
                        Start Manual Sync
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default TriggerModel