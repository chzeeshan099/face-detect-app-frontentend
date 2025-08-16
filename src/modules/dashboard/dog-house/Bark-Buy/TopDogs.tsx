'use client'
import React, { useState } from 'react';
import { Text } from 'rizzui';
import Image from 'next/image';
import WidgetCard from '@/components/cards/widget-card';
import { IoCopyOutline } from 'react-icons/io5';
import { position } from '../../../../constants/dashbord';
import ShadowLeftImage from '@public/images/shadow-left.svg'
interface Dog {
    rank: number;
    name: string;
    transactions: number;
    medal?: string;
}

interface TopDogsProps {
    title?: string;
    subtitle?: string;
    showImages?: boolean;
    data?: any;
    showBottom?: boolean;
    bottomAddress?: string;
    fullAddress?: string;
    coinWorth?: string | number;
    bottomText?: string;
    Reward?: string
    style?: any
    attachToBottom?: boolean;
}

export default function TopDogs({
    title = 'Top Dogs',
    subtitle = 'Top 5 Holders',
    showImages = true,
    data = position,
    showBottom = true,
    bottomAddress = 'Ox815b...652',
    fullAddress = 'Ox815b1C3A74D9A1a263DdA9629FdA362A1164652',
    coinWorth = '4567',
    bottomText = 'Your pLace',
    Reward = 'Current coin worth',
    style = null,
    attachToBottom = false
}: TopDogsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullAddress)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 6000);
            })
            .catch(err => console.error('Copy failed', err));
    };

    return (
        <>
            <WidgetCard className='!p-0 relative w-full h-full flex flex-col dark:!bg-greenPrimary-secodarydark bg-lightgray-primary border dark:border-greenPrimary-300 border-white' title={
                <>
                    <div className="text-center text-lg font-semibold text-black dark:text-white pt-4 ">

                        <Image src={ShadowLeftImage} alt="ShadowImage" className='absolute top-0 left-0 rounded-md dark:block hidden' />
                        {title}
                    </div>

                </>
            }>
                {subtitle && <div className='text-center mb-6 border-b dark:border-dashBordBorder border-white pb-2 pt-1 font-normal text-sm'>{subtitle}</div>}

                <div className="flex flex-col gap-6 px-4 flex-grow">
                    {data?.map((dog: any) => (
                        <div key={dog.rank} className='flex items-center  justify-between'>
                            <div>
                                <div className='flex gap-1 items-center'>
                                    {showImages && [1, 2, 3].includes(dog.rank) && dog.medal && (
                                        <Image
                                            src={dog.medal}
                                            alt={`Medal ${dog.rank}`}
                                            width={25}
                                            height={25}
                                            className="rounded-full"
                                        />
                                    )}
                                    <Text className="text-sm text-greenPrimary-100 font-semibold">
                                        #{dog.rank}
                                    </Text>
                                </div>
                                <Text className="font-medium p-1 dark:text-white text-black text-base ">{dog.name}</Text>
                            </div>

                            <div className="text-right mr-3">
                                <Text className="text-greenPrimary-100 dark:text-greenPrimary-100 font-semibold mb-1 text-sm">
                                    Total Transactions
                                </Text>
                                <Text className="font-medium text-gray-900 dark:text-white text-base">
                                    {dog.transactions}
                                </Text>
                            </div>
                        </div>
                    ))}
                </div>

                {!attachToBottom && <div className="flex-grow"></div>}

                {showBottom && (
                    <div className={`
                    ${attachToBottom ? 'mt-auto w-full' : 'sm:mb-5 sm:mx-4 sm:w-[calc(100%-32px)] mb-0 mx-0 w-full'} 
                    ${style ? style : 'sm:rounded-md rounded-none'} 
                    flex flex-row justify-between items-center 
                    bg-gray-50 dark:bg-greenPrimary-200 py-4 
                    ${attachToBottom ? 'sm:px-4 px-2' : 'px-5'}
                    
                `}>
                        <div className={`${attachToBottom ? 'px-3' : ''}`}>
                            <Text className="dark:text-greenPrimary-100 text-sm text-greenPrimary-100 font-medium">{bottomText}</Text>
                            <div className="flex items-center flex-row-reverse gap-2 text-base font-medium text-gray-900 dark:text-white">
                                {!copied && (
                                    <span onClick={handleCopy} className="cursor-pointer mr-2">
                                        <IoCopyOutline />
                                    </span>
                                )}

                                {copied && <span className="ml-2 text-green-500 text-xs">Copied!</span>}
                                {bottomAddress}
                            </div>
                        </div>

                        <div className={`${attachToBottom ? 'px-3' : ''}`}>
                            <Text className="text-greenPrimary-100 dark:text-greenPrimary-100 font-medium  text-sm sm:text-center text-end ">{Reward}</Text>
                            <Text className="text-base font-medium text-end text-gray-900 dark:text-white ">
                                {coinWorth}
                            </Text>
                        </div>
                    </div>
                )}
                {!attachToBottom && <div className="pb-2"></div>}

            </WidgetCard>
        </>
    );
}
