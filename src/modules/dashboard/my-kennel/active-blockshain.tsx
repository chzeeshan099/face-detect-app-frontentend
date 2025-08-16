'use client';

import { useState } from 'react';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import { FaInfoCircle } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CiCircleInfo } from 'react-icons/ci';

const coins = [
  {
    id: '1',
    name: 'Ethereum',
    symbol: 'ETH',
    image: '/money-mutt/ethariam.svg',
    value: 0.9272,
    change: 2.45,
  },
  {
    id: '2',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: '/money-mutt/bitcoin.svg',
    value: 1.3821,
    change: -1.14,
  },
  {
    id: '3',
    name: 'Litecoin',
    symbol: 'ITC',
    image: '/money-mutt/litecoin.svg',
    value: 0.7532,
    change: 4.3,
  },
  {
    id: '4',
    name: 'Solana',
    symbol: 'SOL',
    image: '/money-mutt/solana.svg',
    value: 0.5213,
    change: -2.18,
  },
  {
    id: '5',
    name: 'Polygon',
    symbol: 'MATIC',
    image: '/money-mutt/polygon.svg',
    value: 0.3476,
    change: 1.78,
  },
  {
    id: '6',
    name: 'Avalanche',
    symbol: 'AVAX',
    image: '/money-mutt/avalanche.svg',
    value: 0.6245,
    change: -0.91,
  },
  {
    id: '7',
    name: 'Polygon',
    symbol: 'MATIC',
    image: '/money-mutt/polygon.svg',
    value: 0.3476,
    change: 1.78,
  },
  {
    id: '8',
    name: 'Avalanche',
    symbol: 'AVAX',
    image: '/money-mutt/avalanche.svg',
    value: 0.6245,
    change: -0.91,
  },
 
];

const ITEMS_PER_PAGE = 5;

const ActiveBlockchain = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(coins.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCoins = coins.slice(start, start + ITEMS_PER_PAGE);

  return (
    <CustomWidgetCard title="Active Blockchain Network" shadow="left" className=" relative w-full">
      <div className=" flex flex-col space-y-4 p-4 ">
        {paginatedCoins.map((coin) => (
          <div key={coin.id} className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center space-x-3">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <span className="text-base font-medium text-gray-800 dark:text-gray-800">{coin.name}</span>
              < CiCircleInfo size={16} className="text-greenPrimary-100 cursor-pointer" title="More info" />
            </div>

            <div className={`text-base font-medium ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {coin.value.toFixed(4)} {coin.symbol}
            </div>
          </div>
        ))}

        <div className="absolute bottom-2 left-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-600 hover:text-black disabled:text-gray-300"
          >
            <IoIosArrowBack size={20} />
          </button>
        </div>
        <div className="absolute bottom-2 right-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-gray-600 hover:text-black disabled:text-gray-300"
          >
            <IoIosArrowForward size={20} />
          </button>
        </div>
      </div>
    </CustomWidgetCard>
  );
};

export default ActiveBlockchain;
