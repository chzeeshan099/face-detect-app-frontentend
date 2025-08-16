'use client';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import { cardsData } from '@/constants/admindashboard';
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Text } from 'rizzui';
import { Progressbar } from 'rizzui';

const TOKENS_SOLD_PERCENTAGE = 35;

interface PresaleDetailProps {
  onBack?: () => void;
}

const PresaleDetail: React.FC<PresaleDetailProps> = ({ onBack }) => {
  return (
    <>
      <div className=''>
        <div className='flex items-center gap-2 my-4'>
          <FaArrowLeft 
            size={16} 
            className='dark:text-white text-greenPrimary-700 cursor-pointer' 
            onClick={onBack}
          />
          <Text className='text-xl md:text-2xl font-semibold dark:text-white text-greenPrimary-700'>Presale Details</Text>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-6 '>
          {cardsData.map((card, index) => (
            <div
              key={index}
              className='w-full p-4 md:p-6 items-center dark:border border-greenPrimary-300   dark:bg-greenPrimary-secodarydark bg-lightgray-primary rounded-lg'
            >
              <Text className='text-greenPrimary-100 text-xs md:text-sm font-medium'>{card.title}</Text>
              <Text className='dark:text-white text-greenPrimary-700 text-sm md:text-base font-medium'>{card.value}</Text>
            </div>
          ))}
        </div>

        <CustomWidgetCard title="Progress (% of Tokens Sold)" shadow='left' className='mt-5 overflow-hidden relative'>
            <div className='px-3 md:px-6'>
            {/* <img 
              src="/money-mutt/rshadow.svg" 
              alt="Right shadow dark mode" 
              className="absolute top-0 z-100 right-0 dark:block hidden"
            />
            <img 
              src="/money-mutt/rlightshadow.svg" 
              alt="Right shadow" 
              className="absolute top-0 z-100 right-0 dark:hidden block"
            /> */}
            <div className="relative">
              <Progressbar
              value={TOKENS_SOLD_PERCENTAGE}
              className="dark:bg-greenPrimary-200 bg-white [&>div:first-child]:!bg-yellow-primary mt-6 mb-12"
              />
              <div
              className="absolute"
              style={{
                left: `${TOKENS_SOLD_PERCENTAGE}%`,
                top: '14px',
                transform: 'translateX(-50%)'
              }}
              >
              <Text className="dark:text-white text-greenPrimary-700 text-sm font-bold">{TOKENS_SOLD_PERCENTAGE}%</Text>
              </div>
            </div>
            </div>
        </CustomWidgetCard>
      </div>
    </>
  );
};

export default PresaleDetail;
