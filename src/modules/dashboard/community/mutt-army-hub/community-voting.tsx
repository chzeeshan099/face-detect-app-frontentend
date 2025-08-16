'use client';

import CustomWidgetCard from '@/components/cards/custom-widget-card';
import { Button, Text } from 'rizzui';
import Image from 'next/image';
import { MdArrowDropUp } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { getCommunityCardsData } from '@/apis/dashbord';
import { CommunityCardsItem } from '@/constants/dashbord';

export default function CommunityVoting() {
   const [defaultData , setDefaultData] = useState<CommunityCardsItem[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getCommunityCardsData();
            setDefaultData(data);

        } catch (error) {
            console.error('Error fetching community cards data:', error);
        } finally {
        setLoading(false);
      }
    }
    fetchData();
    }
    , []);
    
    return (
        <CustomWidgetCard title="Community Voting" shadow="left" className='mt-4'>
            <div className="p-6 flex flex-wrap gap-2 justify-between text-white">
                {defaultData.map((card, index) => (
                    <div key={index} className="relative dark:bg-greenPrimary-200 bg-white rounded-xl overflow-hidden shadow-sm flex flex-col w-full md:w-[32%]">

                        <div className=" px-3 py-2 text-xs flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Image src="/money-mutt/monkey-avatar.svg" alt="User Avatar" width={30} height={30} className="rounded-md" />
                                <Text className='text-greenPrimary-100 dark:text-greenPrimary-100 font-semibold text-sm'>{card.user}</Text>
                                <Text className='text-gray-800 dark:text-primary-white text-sm font-medium'>{card.address}</Text>
                            </div>
                            <Text className={card.tagColor}>
                                {card.tag}
                            </Text>
                        </div>

                        <div className="w-full px-2">
                            <Image
                                src={card.image}
                                alt="Card Image"
                                width={300}
                                height={200}
                                className="w-full h-[300px] object-contain  rounded-md"
                            />
                        </div>

                        <Text className=" px-4 py-3 text-sm text-black-light dark:text-primary-white font-normal">
                            {card.description}
                        </Text>

                        <div className="px-4 py-3 flex justify-between items-center text-xs text-gray-300">
                            <div className="flex items-center gap-1">
                            <MdArrowDropUp size={26} className='text-green-500' />
                                <Text className='text-gray-1100 text-xs font-bold'>{card.views} Views</Text>
                            </div>
                            <Button
                                className="!bg-yellow-primary text-black-light dark:text-gray-850 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600"
                                aria-label="Vote Now"
                            >
                                Vote Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </CustomWidgetCard>
    );
}
