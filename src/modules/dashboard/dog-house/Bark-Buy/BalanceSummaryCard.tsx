'use client';
import React, { useEffect, useState } from 'react';
import { Text } from 'rizzui';
import { getSummaryCardData } from '@/apis/dashbord';

const BalanceSummaryCard = () => {
  const [summaryData, setSummaryData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const data = await getSummaryCardData();
        setSummaryData(data);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        Array(3).fill(0).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="flex flex-row w-full dark:bg-greenPrimary-secodarydark bg-lightgray-primary justify-between dark:border p-4 sm:p-6 dark:border-greenPrimary-300 border-white rounded-lg animate-pulse"
          >
            <div className="w-full">
              <div className="h-4 bg-gray-300 dark:bg-greenPrimary-300 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-300 dark:bg-greenPrimary-300 rounded w-3/4"></div>
            </div>
            <div className="dark:bg-greenPrimary-200 bg-white h-12 w-12 rounded-2xl"></div>
          </div>
        ))
      ) : summaryData && summaryData?.length > 0 ? (
        summaryData?.map((item:any, index:any) => (
          <div
            key={index}
            className="flex flex-row w-full dark:bg-greenPrimary-secodarydark bg-lightgray-primary justify-between dark:border p-4 sm:p-6 dark:border-greenPrimary-300 border-white rounded-lg"
          >
            <div>
              <Text className="font-medium text-greenPrimary-100 text-sm sm:text-base">{item?.title}</Text>
              <Text className="dark:text-white text-black text-xl sm:text-2xl font-semibold mt-1">
                {item?.balance} <span>{item?.currency}</span>
              </Text>
            </div>
            <div className="dark:bg-greenPrimary-200 bg-white py-2 sm:py-3 px-3 sm:px-4 inline-flex items-center justify-center rounded-2xl mt-4 sm:mt-0">
              {item.icon && <item.icon className="h-5 w-5 sm:h-6 sm:w-6 dark:text-white text-black" />}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-4">
          <Text>No data available</Text>
        </div>
      )}
    </div>
  );
};

export default BalanceSummaryCard;
