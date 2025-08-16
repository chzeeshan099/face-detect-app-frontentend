'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Text } from 'rizzui';
import { Earn, position } from '../../../../constants/dashbord';
import { IoCopyOutline } from 'react-icons/io5';
import { RxLink2 } from 'react-icons/rx';
import TopDogs from './TopDogs';
import CustomWidgetCard from '@/components/cards/custom-widget-card';

const FetchEarn = () => {
  const [copied, setCopied] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  const linkText = "https://money$Mutt.com/trio/";
  const walletAddress = '0x2410981990491dCEC86d0E0BB2E9fddB1601821';

  const handleCopyClick = () => {
    navigator.clipboard.writeText(linkText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        setCopiedWallet(true);
        setTimeout(() => setCopiedWallet(false), 3000);
      })
      .catch((err) => console.error('Failed to copy wallet address: ', err));
  };

  return (
    <>

      <div className='flex  md:flex-row flex-col gap-4 mt-4 '>
        <div className='w-full'>



          <div className="w-full rounded-xl overflow-hidden dark:bg-greenPrimary-secodarydark bg-lightgray-primary">

            <CustomWidgetCard title='Fetch & Earn' shadow='left'>
              <div className="flex flex-col justify-center items-center mt-7 border-b dark:border-dashBordBorder border-white">
                <Image
                  src="/money-mutt/tdiamiond.svg"
                  alt="Dummy Image"
                  width={24}
                  height={24}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <Text className="dark:text-greenPrimary-600 opacity-70 text-greenPrimary-600 font-medium mt-4 text-xs">Total (BNB) Rewards</Text>
                <Text className="text-4xl dark:text-white text-black mt-3 font-bold">
                  <span>{Earn.totalReward}</span> $BNB
                </Text>
                <Text className="mt-4 dark:text-white text-black font-normal text-xs text-center">Reward sent to your BEP-20 Wallet Address!</Text>


                <Text className="flex flex-row gap-2 items-center dark:text-white text-xs text-black mt-2 mb-8 font-normal">
                  <span>
                    {walletAddress}
                  </span>
                  {!copiedWallet && (
                    <IoCopyOutline
                      className="cursor-pointer"
                      onClick={handleCopyWallet}
                    />
                  )}
                  {copiedWallet && <span className="text-green-500 text-sm ml-2">Copied!</span>}
                </Text>
              </div>


              <div className="flex items-center justify-center border-b dark:border-dashBordBorder border-white">
                <div className="text-center my-6">
                  <Text className="dark:text-fray-300 font-medium text-300 text-xs">You and your referrals get 5% for every purchase</Text>
                  <Button
                    variant="outline"
                    className="border-4 border-greenPrimary-600 my-4 text-greenPrimary-600 hover:border-greenPrimary-600 rounded-full dark:shadow-yellowGlow py-6 px-8 font-bold dark:bg-yellow-400/40 bg-yellow-100/40 shadow-xl text-sm"
                  >
                    Get 5% Reward
                  </Button>


                  <Text className="dark:text-white mt-2 text-black text-xs font-normal">
                    You and your referrals get <span className="text-greenPrimary-600">5%</span> for every purchase
                  </Text>
                </div>
              </div>

              <div className="mt-4">
                <Text className="text-center dark:text-white text-black font-medium text-xs">
                  Referrals must spend at least 30 BNB to unlock each level
                </Text>
                <div className="mt-4 text-white dark:bg-greenPrimary-200 bg-white p-6">
                  <div className="px-3 flex justify-between items-center">
                    <span className='dark:text-white text-gray-800 text-xs font-medium'>{linkText}</span>
                    <div className="flex items-center dark:text-white text-black font-medium">
                      {!copied && (
                        <IoCopyOutline
                          size={16}
                          className="ml-2 cursor-pointer dark:white text-gray-800"
                          onClick={handleCopyClick}
                        />
                      )}
                      {copied && <span className="ml-2 text-green-500">Copied!</span>}
                      <RxLink2 size={16} className="ml-2 dark:white text-gray-800" />
                    </div>
                  </div>

                </div>

              </div>
            </CustomWidgetCard>
          </div>
        </div>
        <div className='w-full '>
          <TopDogs
            title="Winner"
            subtitle="Top 5 Holders"
            showImages={false}
            data={position}
            showBottom={true}
            bottomAddress="Ox815b...652"
            fullAddress="Ox815b1C3A74D9A1a263DdA9629FdA362A1164652"
            coinWorth="4567"
            bottomText='Your Address'
            Reward='Total Reward'
            style={" rounded-b-md"}
            attachToBottom={true}
          />
        </div>
      </div>
    </>
  );
};

export default FetchEarn;
