'use client';

import React, { useState } from 'react';
import CustomSlider from './CustomSlider/CustomSlider';
import Image from 'next/image';
import { Text } from 'rizzui';
import ProjectedReturnsChart from './chart';
import ProgressBar from './progress-bar';
import { GoDotFill } from 'react-icons/go';

const InvestmentCalculator = () => {
  const [amount, setAmount] = useState(10);
  const [holdingPeriod, setHoldingPeriod] = useState(1);
  const [projectedPrice, setProjectedPrice] = useState(1);
  const levelData = { level: 2, requiredCoins: 10000 };
  const coins = 1000;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4">
        <Text className="text-2xl font-semibold text-gray-800 dark:text-gray-800">Muttmeter</Text>
        <div className="flex items-center gap-2 text-center">
          <GoDotFill size={16} className="text-green-800 dark:text-green-800" />
          <p className="text-gray-800 dark:text-gray-800 text-sm font-bold">
            1 $MUTT = 0.0248 BNB &nbsp;&nbsp; Mar 28, 2025, 10:55 UTC
          </p>
        </div>
      </div>

      <div className="bg-lightgray-primary dark:bg-greenPrimary-secodarydark border-white dark:border-greenPrimary-300 w-full shadow-lg rounded-lg dark:border mx-auto py-4">
        <Text className="text-base text-center font-bold text-gray-800 dark:text-white border-b pb-3 border-white dark:border-greenPrimary-300">
          Calculate your profits on coin launch
        </Text>

        <div className="flex flex-col lg:flex-row gap-10 mt-6 px-6">
     
          <div className="w-full flex flex-col gap-8">
            {[{
              label: 'Amount of $MUTT',
              icon: '/money-mutt/amount.svg',
              value: amount,
              onChange: setAmount,
              max: 100,
              displayValue: `${amount} $MUTT`
            },
            {
              label: 'Holding Period',
              icon: '/money-mutt/calender.svg',
              value: holdingPeriod,
              onChange: setHoldingPeriod,
              max: 10,
              min: 1,
              displayValue: `${holdingPeriod} Year${holdingPeriod > 1 ? 's' : ''}`
            },
            {
              label: 'Projected Price',
              icon: '/money-mutt/dollar.svg',
              value: projectedPrice,
              onChange: setProjectedPrice,
              max: 10,
              min: 0.5,
              step: 0.1,
              displayValue: `$${projectedPrice.toFixed(2)}`
            }].map((item, idx) => (
              <div key={idx}>
                <Text className="text-base flex gap-2 items-center font-semibold text-gray-800 dark:text-gray-800 mb-2">
                  <Image src={item.icon} alt={item.label} width={34} height={34} />
                  {item.label}
                </Text>
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4 items-center">
                  <div className="w-full pl-4">
                    <CustomSlider
                      value={item.value}
                      min={item.min ?? 0}
                      max={item.max}
                      step={item.step}
                      onChange={item.onChange}
                      trackBeforeColor="#FFC000"
                
                      trackAfterColor="#092522"
                      thumbIcon={
                        <Image src="/coin.svg" alt="Slider Dot" width={34} height={34} className="cursor-pointer" />
                      }
                    />
                  </div>
                  <div className="w-full sm:w-1/3 rounded-md bg-white dark:bg-greenPrimary-200 text-gray-800 dark:text-white text-sm font-normal px-4 py-3 text-center">
                    {item.displayValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="bg-white dark:bg-greenPrimary-200 rounded-lg p-6 shadow-sm transition-colors duration-300 flex-grow">
              <Text className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Investment Summary</Text>

              <div>
                <span className="text-sm py-1 text-greenPrimary-100 font-medium">ROI</span>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-800 py-1">115.89%</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-6">
                <div>
                  <span className="text-sm py-1 text-greenPrimary-100 font-medium">Total $MUTT</span>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-800 py-1">1,250 $MUTT</p>
                </div>
                <div>
                  <span className="text-sm py-1 text-greenPrimary-100 font-medium">Total USD</span>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-800 py-1">$312.50</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-6">
                <div>
                  <span className="text-sm py-1 text-greenPrimary-100 font-medium">Profit ($MUTT)</span>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-800 py-1">+250 $MUTT</p>
                </div>
                <div>
                  <span className="text-sm py-1 text-greenPrimary-100 font-medium">Profit (USD)</span>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-800 py-1">+$62.50</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ProjectedReturnsChart />
        </div>

       
      </div>
      <div className="">
          <ProgressBar coins={coins} levelData={levelData} />
        </div>
    </>
  );
};

export default InvestmentCalculator;
