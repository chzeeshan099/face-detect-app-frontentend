'use client';
import React from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import Rate from '@/components/rate/rate';
import { FaCheck } from 'react-icons/fa';
import { Text } from 'rizzui';

const streakDays = 5; 

const streakBonuses = [
  { title: '3-Day Streak', bonus: '+2% Bonus', daysRequired: 3 },
  { title: '7-Day Streak', bonus: '+5% Bonus', daysRequired: 7 },
];

const ReferralsStreak = () => {
  return (
    <CustomWidgetCard title="Referral Streak" className="">
      <div className="mx-auto mt-10 w-full max-w-md px-3 text-center text-gray-1200 dark:text-white">
        <Text className="mb-4 flex items-center justify-center">
          <Text className="mr-1 text-3xl font-bold ">{streakDays}</Text> Days
          Streak
        </Text>

        <div className="mb-7">
          <Rate
            rateClassName="gap-1 md:gap-0 lg:gap-1"
            className="flex items-center justify-center"
            character={Array.from({ length: 7 }).map((_, index) => (
              <Text key={index} className="">
                {index < streakDays ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-yellow-500 bg-yellow-100 shadow-md dark:bg-yellow-900">
                    <FaCheck />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-white dark:bg-greenPrimary-200" />
                )}
              </Text>
            ))}
            value={streakDays}
            count={7}
            disabled
            size="xl"
          />
        </div>
        <div className="mb-6 space-y-2">
          {streakBonuses.map((item, index) => {
            const isAchieved = streakDays >= item.daysRequired;
            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 dark:bg-greenPrimary-200"
              >
                <div className="flex items-center gap-1 text-yellow-500 ">
                  <CiCalendarDate className="h-5 w-5" />
                  <Text className="text-blackk-light text-base font-medium dark:text-white">
                    {item.title}
                  </Text>
                </div>
                <Text
                  className={`text-sm font-normal ${
                    isAchieved ? 'text-greenPrimary-500' : 'text-gray-1100'
                  }`}
                >
                  {item.bonus}
                </Text>
              </div>
            );
          })}
        </div>

        <Text className=" text-blackk-light mb-4 text-xs font-medium dark:text-white">
          Refer at least one friend daily to maintain your streak!
        </Text>
      </div>
    </CustomWidgetCard>
  );
};

export default ReferralsStreak;
