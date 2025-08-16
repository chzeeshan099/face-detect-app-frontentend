'use client';
import React, { useEffect, useState } from 'react';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import { Progressbar, Text } from 'rizzui';
import { FaCheck } from 'react-icons/fa';
import { getReferralData } from '@/apis/dashbord';

const currentReferrals = 23;

const ReferralsMilestones = () => {
  const [referralData, setReferralData] = useState<any[]>([]);
  const [progressInfo, setProgressInfo] = useState({
    startRef: 0,
    endRef: 0,
    reward: '',
    progressPercent: 0,
  });

  useEffect(() => {
    const fetchReferralsMilestones = async () => {
      try {
        const response = await getReferralData();
        setReferralData(response);
        if (response && response.length > 0) {
          let startRef = 0;
          let endRef = response[0].referrals;
          let reward = response[0].reward;

          for (let i = 0; i < response.length; i++) {
            if (currentReferrals < response[i].referrals) {
              endRef = response[i].referrals;
              reward = response[i].reward;
              startRef = i === 0 ? 0 : response[i - 1].referrals;
              break;
            } else if (currentReferrals === response[i].referrals) {
              endRef = response[i + 1]?.referrals || response[i].referrals + 10;
              reward = response[i + 1]?.reward || response[i].reward;
              startRef = response[i].referrals;
              break;
            }
          }

          const progress = ((currentReferrals - startRef) / (endRef - startRef)) * 100;
          const progressPercent = Math.min(Math.max(progress, 0), 100);

          setProgressInfo({ startRef, endRef, reward, progressPercent });
        }
      } catch (err) {
        console.error('Error fetching referral data:', err);
      }
    };

    fetchReferralsMilestones();
  }, []);

  const { endRef, reward, progressPercent } = progressInfo;

  return (
    <CustomWidgetCard title="Referral Milestones" className="">
      <div className="mx-auto mt-10 w-full max-w-md px-3">
        <Text className="mb-3 text-right text-gray-1200 dark:text-gray-1100">{currentReferrals} referrals</Text>

        <div className="relative mb-10 h-8">
          <Progressbar
            variant="solid"
            barClassName="bg-yellow-500"
            value={progressPercent}
            className="h-2 bg-white dark:bg-greenPrimary-200"
          />
          <div
            className="absolute top-4 -translate-x-1/2 transform rounded bg-black-light dark:bg-white  px-2 py-0.5 text-xs font-semibold text-white dark:text-black-light shadow-sm transition-all duration-300"
            style={{ left: `${progressPercent}%` }}
          >
            {currentReferrals}
          </div>
        </div>

        <div className="mb-4 text-center text-xs font-medium">
          {currentReferrals < endRef && (
            <Text className='flex items-center justify-center gap-1'>
              <Text className="text-yellow-500 ">{endRef - currentReferrals} more</Text> referrals to
              earn <Text className="text-yellow-500">{reward}</Text>
            </Text>
          )}
        </div>

        <div className="mb-4 space-y-2">
          {referralData.map((item: any, index: number) => {
            const isAchieved = currentReferrals >= item.referrals;
            return (
              <div
                key={index}
                className="flex items-center justify-between text-sm font-medium"
              >
                <Text className={`text-greenPrimary-dark dark:text-greenPrimary-100`}>
                  {item.referrals} referrals
                </Text>
                <div
                  className={`flex items-center gap-1 ${isAchieved ? 'text-yellow-500' : 'text-blackk-light dark:text-white'
                    }`}
                >
                  {isAchieved && <FaCheck className="text-yellow-500" />}
                  <Text className='font-semibold'>{item.reward}</Text>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </CustomWidgetCard>
  );
};

export default ReferralsMilestones;
