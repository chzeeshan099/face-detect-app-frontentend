'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DogImage from '@public/images/no-data-dog-img.svg'
import { getLastTransactionsApi } from '@/apis/dashbord'
import { Text } from 'rizzui'
import { IoCopyOutline } from 'react-icons/io5'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from '@/components/custom-toaster/CustomToast';
import { Copy } from 'lucide-react'
const LastTransactions = () => {

    const [lastTransactionsData, setlastTransactionsData] = useState<any[]>([]);
    const [copied, setCopied] = useState(false);
    const value = "Ox815b...652";
    const CustomToastMessage = CustomToast();


    const fetchTransactionsData = async () => {
        try {
            const data = await getLastTransactionsApi();
            setlastTransactionsData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
        fetchTransactionsData();
    }, []);
    const calculateTotalAmount = (data: any) => {
        return data?.reduce((total: any, item: any) => {
            const numericAmount = parseFloat(item.amount.replace(/[$,]/g, ''));
            return total + numericAmount;
        }, 0);
    }


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        toast.dismiss();
        CustomToastMessage("Address Copied!", "Your Address has been copied to clipboard.");
    };
    return (
        <>

            <CustomWidgetCard title="Last Transactions" shadow='right'>


                {/* {
                    lastTransactionsData?.length &&
                    <>
                        <div className='flex flex-col gap-y-2 px-5 py-2 min-h-12 max-h-36 overflow-y-auto no-scrollbar'>
                            {lastTransactionsData?.map((item, index) => (
                                <div key={index} className='flex items-center justify-between font-medium'>
                                    <div>
                                        <Text className='text-greenPrimary-100 text-xs sm:text-sm'># {index + 1}</Text>
                                        <Text className='text-black-light dark:text-primary-white text-xs sm:text-base'>{item?.address}</Text>
                                    </div>
                                    <div>
                                        <Text className='text-greenPrimary-100 text-xs sm:text-sm'>Total Earned Amount</Text>
                                        <Text className='text-black-light dark:text-primary-white text-end text-xs sm:text-base'>{item?.amount}</Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='bg-white dark:bg-greenPrimary-200 font-medium flex items-center justify-between px-5 py-2'>
                            <div>
                                <Text className='text-greenPrimary-100 pb-0.5 text-sm font-bold '>Your Address</Text>
                                <Text className='text-black-light dark:text-primary-white font-medium flex items-center gap-2 text-sm sm:text-base'>Ox815b...652 <IoCopyOutline className='cursor-pointer' onClick={handleCopy} /></Text>
                            </div>
                            <div>
                                <Text className='text-greenPrimary-100 pb-0.5 font-bold text-sm'>Total Reward</Text>
                                <Text className='text-right text-black-light dark:text-primary-white'>{calculateTotalAmount(lastTransactionsData)} BNB </Text>
                            </div>

                        </div>
                    </>

                } */}



                {/* {
                    !lastTransactionsData?.length &&  */}
                <div className='flex flex-col items-center justify-center gap-y-3 py-6'>
                    <Image src={DogImage} alt="DogImage" className='w-20 h-24' />
                    <Text className='text-xs font-normal text-black-light dark:text-primary-white text-center px-1'>You haven’t thrown the $MUTT ball yet — once you do, it always comes back.</Text>
                </div>
                {/* }   */}

            </CustomWidgetCard>
        </>
    )
}

export default LastTransactions