'use client';
import React, { useEffect, useState } from 'react'
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import Image from 'next/image';
import { Text } from 'rizzui';
import { getTopreffer } from '@/apis/dashbord';


const TopReffer = () => {
      const [Topreffer, setTopreffer] = useState<any>([]);
    
      const fetchTopreffer = async () => {
        try {
          const response = await getTopreffer();
          setTopreffer( response);
        } catch (err) {
          console.error('Error fetching buy bark data:', err);
        } 
      };
    
      useEffect(() => {
        fetchTopreffer();
      }, []);
  return (
    <CustomWidgetCard title="Top Referrer of the Week 🏆" className="">
    <div className="mx-auto mt-10 w-full max-w-md px-3">
      <div className="mb-6 space-y-6">
        {Topreffer?.map((dog: any) => (
          <div
            key={dog.rank}
            className="mt-3 flex items-center justify-between "
          >
            <div>
              <div className="flex items-center gap-1">
                <Image
                  src={dog.medal}
                  alt={`Medal ${dog.rank}`}
                  width={25}
                  height={25}
                  className="rounded-full"
                />

                <Text className="text-sm font-semibold text-greenPrimary-100 ">
                  #{dog.rank}
                </Text>
              </div>
              <Text className="text-semibold p-1 font-semibold text-blackk-light dark:text-white">
                {dog.name}
              </Text>
            </div>

            <div className="text-right">
              <Text className="mb-1 font-bold text-greenPrimary-100">
                Total Transactions
              </Text>
              <Text className="text-sm font-semibold text-blackk-light dark:text-white">
                {dog.transactions}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <Text className="text-center text-xs font-medium text-black-light dark:text-white mb-4">
        Leaderboard resets every Monday at 00:00 UTC
      </Text>
    </div>
  </CustomWidgetCard>
  )
}

export default TopReffer