'use client';

import CustomWidgetCard from '@/components/cards/custom-widget-card';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface Contributor {
  id: number;
  address: string;
  amount: number;
}

const Top = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const contributors: Contributor[] = [
    { id: 1, address: '0x815b...652', amount: 3601201.49 },
    { id: 2, address: '0x815b...652', amount: 1515770.29 },
    { id: 3, address: '0x815b...652', amount: 1515770.29 },
    { id: 4, address: '0x815b...652', amount: 1515770.29 },
    { id: 5, address: '0x815b...652', amount: 1515770.29 },
  ];

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <CustomWidgetCard title="Top Contributors"  shadow='left' className="w-full   mx-auto rounded-lg overflow-hidden border border-gray-200 shadow-lg">
      <div className="  p-6 pb-4">
       

        <div className="space-y-4 ">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-[#20655D] dark:text-[#20655D] text-opacity-80">
                  #{contributor.id}
                </span>
                <span>{contributor.address}</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[#20655D] text-xs dark:text-[#20655D]">
                  Total Earned Amount
                </span>
                <span className="font-medium">
                  ${contributor.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-2">
          <div className="bg-gray-100 dark:bg-[#092522] rounded-full">
            <button
              onClick={handlePrevPage}
              className="p-2 rounded-full transition-colors"
              aria-label="Previous page"
            >
              <FaArrowLeft size={20} className="text-gray-700 dark:text-white" />
            </button>
          </div>

          <span className="text-sm text-gray-700 dark:text-white">
            {currentPage}/{totalPages}
          </span>

          <div className="bg-gray-100 dark:bg-[#092522] rounded-full">
            <button
              onClick={handleNextPage}
              className="p-2 rounded-full transition-colors"
              aria-label="Next page"
            >
              <FaArrowRight size={20} className="text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </CustomWidgetCard>
  );
};

export default Top;
