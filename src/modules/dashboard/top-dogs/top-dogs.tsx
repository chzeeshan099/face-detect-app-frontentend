'use client';

import { useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import clsx from 'clsx';
import Image from 'next/image';
import { Text } from 'rizzui';

type User = {
    id: number;
    avatar: string;
    address: string;
    amount: string;
    isPositive: boolean;
};

const filters = ['Top Holders', 'Top Referrers', 'Top Earners'] as const;
type Filter = typeof filters[number];

const dummyData: Record<Filter, User[]> = {
    'Top Holders': [
        { id: 1, avatar: '/money-mutt/monkey-avatar.svg', address: '0x815b...652', amount: '$3,601,201.49', isPositive: true },
        { id: 2, avatar: '/money-mutt/monkey-avatar.svg', address: '0x83fc...a12', amount: '$2,431,888.21', isPositive: false },
        { id: 3, avatar: '/money-mutt/monkey-avatar.svg', address: '0xab12...ff1', amount: '$1,894,112.00', isPositive: true },
        { id: 4, avatar: '/money-mutt/monkey-avatar.svg', address: '0x12ac...5bd', amount: '$1,212,984.75', isPositive: false },
        { id: 5, avatar: '/money-mutt/monkey-avatar.svg', address: '0x9bf3...001', amount: '$1,009,382.11', isPositive: true },
    ],
    'Top Referrers': [
        { id: 6, avatar: '/money-mutt/monkey-avatar.svg', address: '0x712e...998', amount: '$2,210,499.59', isPositive: true },
        { id: 7, avatar: '/money-mutt/monkey-avatar.svg', address: '0xfa67...3aa', amount: '$1,973,203.88', isPositive: false },
        { id: 8, avatar: '/money-mutt/monkey-avatar.svg', address: '0x04ef...a2c', amount: '$1,722,800.00', isPositive: true },
        { id: 9, avatar: '/money-mutt/monkey-avatar.svg', address: '0x99dd...c10', amount: '$1,118,490.50', isPositive: false },
        { id: 10, avatar: '/money-mutt/monkey-avatar.svg', address: '0x421c...ee7', amount: '$950,000.00', isPositive: true },
    ],
    'Top Earners': [
        { id: 11, avatar: '/money-mutt/monkey-avatar.svg', address: '0x98ac...b32', amount: '$4,500,000.00', isPositive: true },
        { id: 12, avatar: '/money-mutt/monkey-avatar.svg', address: '0xdeaf...999', amount: '$3,850,250.43', isPositive: true },
        { id: 13, avatar: '/money-mutt/monkey-avatar.svg', address: '0x5a1d...2a2', amount: '$3,010,210.90', isPositive: false },
        { id: 14, avatar: '/money-mutt/monkey-avatar.svg', address: '0x219b...ccc', amount: '$2,421,012.33', isPositive: true },
        { id: 15, avatar: '/money-mutt/monkey-avatar.svg', address: '0x811b...b21', amount: '$1,790,999.89', isPositive: false },
    ],
};

const currentUser = {
    id: 999,
    avatar: '/avatars/you.png',
    address: '0xYou1...23F',
    amount: '$0.00',
    isPositive: false,
    rank: 78,
};

const TopDogs = () => {
    const [selectedFilter, setSelectedFilter] = useState<Filter>('Top Holders');
    const users = dummyData[selectedFilter];

    const getMedalOrRank = (index: number) => {
        const medals = ['/money-mutt/medal1.svg', '/money-mutt/medal2.svg', '/money-mutt/medal3.svg'];
        return index < 3 ? (
            <Image src={medals[index]} alt={`Rank ${index + 1}`} width={24} height={24} />
        ) : (
            <span className="text-gray-700 font-semibold w-6 py-1 dark:bg-greenPrimary-300 bg-white rounded-md text-center">{index + 1}</span>
        );
    };

    const renderUserCard = (user: User, index?: number, isSticky = false) => (
        <div
            key={user.id}
            className={clsx(
                'flex items-center justify-between p-2 rounded-md',
                isSticky && 'sticky bottom-0 z-10 border-t border- bg-gray-50'
            )}
        >
            <div className="flex items-center space-x-1 sm:space-x-4">
                {typeof index === 'number' ? getMedalOrRank(index) : <span className="w-6 text-gray-500 font-semibold">--</span>}

                <Image src={user.avatar} alt="Avatar" width={48} height={48} className="rounded-md" />

                <div className="flex flex-col">
                    <span className="text-sm text-greenPrimary-100 font-semibold">money$Mutt</span>
                    <span className="text-base font-medium text-gray-800">{user.address}</span>
                </div>

                {typeof index === 'number' && index >= 3 && (
                    user.isPositive ? (
                        <IoMdArrowDropup size={20} className="text-green-500 ml-1" />
                    ) : (
                        <IoMdArrowDropdown size={20} className="text-red-500 ml-1" />
                    )
                )}
            </div>

            <div className="text-right">
                <div className="text-sm text-greenPrimary-100 font-semibold">Total Holds</div>
                <div className="text-base text-gray-800 font-medium">{user.amount}</div>
            </div>
        </div>
    );

    const renderCurrentUser = () => (
        <div className="sticky bottom-0 z-10 dark:bg-greenPrimary-300 bg-white px-4 py-3 rounded-md  flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                    <span className="text-sm text-greenPrimary-100 font-medium">Your Rank</span>
                    <span className="text-base font-medium text-gray-800 ">{currentUser.rank}</span>
                </div>
            </div>
            <div className="text-right">
                <span className="text-sm text-greenPrimary-100 font-medium">Wallet Balance</span>
                <div className="text-base font-medium text-gray-800">{currentUser.amount}</div>
            </div>
        </div>
    );

    return (
        <>
            <Text className='text-2xl font-semibold pb-3 text-gray-800 dark:text-gray-800'>
                Leaderboard
            </Text>
            <section className=" dark:bg-greenPrimary-secodarydark bg-lightgray-primary rounded-lg  xs:p-2 md:p-6">
                <div className="flex justify-end m-2">
                    {filters.map((filter, index) => {
                        const isFirst = index === 0;
                        const isLast = index === filters.length - 1;
                        return (
                            <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={clsx(
                                'p-2 text-xs dark:border border-greenPrimary-300 font-medium',
                                selectedFilter === filter
                                    ? 'bg-yellow-primary text-gray-800 dark:text-gray-100 dark:bg-yellow-primary'
                                    : 'bg-white text-gray-700 hover:bg-gray-200 dark:bg-greenPrimary-secodarydark dark:text-gray-800',
                                isFirst && 'rounded-l-md',
                                isLast && 'rounded-r-md',
                                !isFirst && !isLast && 'border-gray-300'
                            )}
                        >
                            {filter}
                        </button>
                        
                        );
                    })}
                </div>

                <div className="space-y-4 overflow-y-auto pb-24  custom-scroll">
                    {users.map((user, index) => renderUserCard(user, index))}
                </div>
                <div className="mt-4">{renderCurrentUser()}</div>
            </section>
        </>
    );
};

export default TopDogs;
