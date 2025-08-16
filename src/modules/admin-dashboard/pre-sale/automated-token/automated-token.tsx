'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React, { useState } from 'react'
import { Button, Progressbar, Text } from 'rizzui'
import TriggerModel from './triggerManual-model'

const status = "Verified";
const time = 'March 24,2025 - 12:00am'
const TOKENS_SOLD_PERCENTAGE = 90;

const AutomatedToken = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [syncOption, setSyncOption] = useState<string | null>(null);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSyncOption(null);
        setFromDate('');
        setToDate('');
        setIsModalOpen(false);
    };
 
    const handleStartSync = () => {
        console.log('Starting manual sync with:', { syncOption, fromDate, toDate });
        closeModal();
    };

    return (
        <>
            <CustomWidgetCard title='Automated Token Distribution' shadow='right' className="w-full">
                <div className='px-6 py-4'>
                    <Text className='mb-4'>
                        <p className='text-greenPrimary-100 text-sm font-medium '>Overall Status</p>
                        <p className='text-base dark:text-white text-greenPrimary-700 font-medium'>{status}</p>
                    </Text>
                    <Text className='mb-2'>
                        <p className='text-greenPrimary-100 text-sm font-medium '>Scheduled Start</p>
                        <p className='text-base dark:text-white text-greenPrimary-700 font-medium'>{time}</p>
                    </Text>
                </div>
                <div className="border-t border-white dark:border-greenPrimary-200 "></div>
                <div>
                    <Text className='p-6 dark:text-white text-center text-greenPrimary-700 text-xs font-medium'>
                        Post-Distribution Monitoring
                    </Text>
                   
                    <div className="relative px-6 pb-6">
                    <Text className='text-greenPrimary-100 text-sm font-medium'>
                    Tokens Distributed
                    </Text>
                        <Progressbar
                            value={TOKENS_SOLD_PERCENTAGE}
                            className="dark:bg-greenPrimary-200 bg-white [&>div:first-child]:!bg-yellow-primary mt-2"
                        />
                        <div
                            className="absolute"
                            style={{
                                left: `${TOKENS_SOLD_PERCENTAGE}%`,
                                bottom: '0px',
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <Text className="dark:text-white text-greenPrimary-700 text-sm font-bold">{TOKENS_SOLD_PERCENTAGE}%</Text>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white dark:border-greenPrimary-200 mt-6 "></div>
                <div className='flex flex-col md:flex-row gap-4 p-6 justify-between'>
                    <Text className=''>
                        <p  className='text-greenPrimary-100 text-sm font-medium '>
                            Stuck Transactions
                        </p>
                        <p className='text-greenPrimary-700 dark:text-white font-medium'>5</p>
                    </Text>
                    <Text className=''>
                        <p  className='text-greenPrimary-100 text-sm font-medium '>
                        Last Checkpoint
                        </p>
                        <p className='text-greenPrimary-700 dark:text-white font-medium'>March 24,2025 - 12:00am</p>
                    </Text>
                </div>
                <div className="border-t border-white dark:border-greenPrimary-200 mt-2 "></div>
                <div className='px-6'>
                <Button 
                    className='!bg-yellow-primary w-full hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6 mt-5 mb-6'
                    onClick={openModal}
                >
                    Trigger Manual Sync
                </Button>
                </div>
            </CustomWidgetCard>
            
            <TriggerModel 
                isOpen={isModalOpen} 
                onClose={closeModal}
                syncOption={syncOption}
                setSyncOption={setSyncOption}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                onSubmit={handleStartSync}
            />
        </>
    )
}

export default AutomatedToken