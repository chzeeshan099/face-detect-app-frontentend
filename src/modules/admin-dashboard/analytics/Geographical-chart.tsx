'use client';

import { useState } from 'react';
import Image from 'next/image';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import clsx from 'clsx';

const tabs = ['Signups', 'Contributions', 'Referrals'];

const Geographical = () => {
    const [activeTab, setActiveTab] = useState('Signups');

    const dummyData: Record<string, { label: string; top: string; left: string }[]> = {
        Signups: [
            { label: '30%',  top: '30%', left: '50%' },
            { label: '40%', top: '40%', left: '60%' },
            { label: '25%',  top: '25%', left: '70%' },
            { label: '50%', top: '50%', left: '80%' },
        ],
        Contributions: [
            { label: '35%',  top: '35%', left: '15%' },
            { label: '45%',  top: '75%', left: '65%' },
            { label: '38%',  top: '28%', left: '58%' },
            { label: '42%',  top: '42%', left: '62%' },
        ],
        Referrals: [
            { label: '30%',  top: '40%', left: '50%' },
            { label: '40%', top: '50%', left: '60%' },
            { label: '25%',  top: '25%', left: '70%' },
            { label: '50%', top: '60%', left: '90%' },
        ],
    };

    return (
        <CustomWidgetCard
            title="Geographical Distribution" shadow='left'
            className="w-full">
            <div className='flex justify-end my-5'>
                <div className='bg-white dark:bg-transparent dark:border dark:border-greenPrimary-300 rounded-md'>
                    {tabs.map((label, index) => {
                        const isFirst = index === 0;
                        const isLast = index === tabs.length - 1;

                        return (
                            <button
                                key={label}
                                onClick={() => setActiveTab(label)}
                                className={clsx(
                                    'text-xs font-medium px-3 py-1 dark:border-r dark:border-greenPrimary-300 last:border-r-0 text-gray-950 dark:text-white',
                                    activeTab === label
                                        ? 'bg-yellow-primary text-gray-900 dark:text-greenPrimary-1000'
                                        : 'dark:hover:bg-yellow-700 hover:bg-yellow-200 text-gray-400',
                                    {
                                        'rounded-l-md': isFirst,
                                        'rounded-r-md': isLast,
                                    }
                                )}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative w-full h-96">
                <Image
                    src="/images/worldmap.svg"
                    alt="World Map"
                    fill
                    className="object-contain opacity-80"
                />

                {dummyData[activeTab].map((loc: { label: string; top: string; left: string }, index: number) => (
                    <div
                        key={index}
                        className="absolute text-xs p-2 rounded-md bg-gray-800 text-white dark:bg-white dark:text-greenPrimary-1000 shadow-md"
                        style={{
                            top: loc.top,
                            left: loc.left,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="font-bold">{loc.label}</div>
                       
                    </div>
                ))}
            </div>
        </CustomWidgetCard>
    );
};

export default Geographical;
