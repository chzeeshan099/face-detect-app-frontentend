'use client';
import React, { useEffect, useState } from 'react';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import RoadMapCard from '@/components/cards/road-map-card';
import { Text } from 'rizzui';
import { getRoadMapCards } from '@/apis/dashbord';
import Progressbar from '@/components/progress-bar/progress-bar';
import Image from 'next/image';
import Transactiondog from '@public/images/transactiondog.svg';
import Mytransaction from '@/components/others/my-transaction';
const years: string[] = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
const coins = 5000;


const MuttTrail = () => {
  const [RoadMapCards, setRoadMapCards] = useState<any>([]);
  const [selectedYear, setSelectedYear] =
    useState<keyof typeof RoadMapCards>('Year 1');

  const fetchReferralStreak = async () => {
    try {
      const response = await getRoadMapCards();
      setRoadMapCards(response);
    } catch (err) {
      console.error('Error fetching buy bark data:', err);
    }
  };

  useEffect(() => {
    fetchReferralStreak();
  }, []);
  return (
    <>
      <Progressbar
        coins={coins}
        levelData={{ level: 2, requiredCoins: 10000 }}
      />
      <Text className="mb-2 mt-4 text-2xl font-semibold text-black-light dark:text-white">
        Roadmap Viewer
      </Text>
      <Text className="mb-6 text-sm font-normal text-gray-1200 dark:text-white">
        Track our journey by year. From token launch to NFT drops, governance,
        and metaverse integration—see where we’re headed.
      </Text>
      <CustomWidgetCard title="Road Map Viewer" shadow="left" className="mb-5 font-bold text-base">
        <div className="flex flex-col items-center justify-center bg-lightgray-primary px-5 py-5 dark:bg-greenPrimary-secodarydark">
          <div className="relative flex flex-wrap items-center justify-center gap-4 overflow-x-auto sm:gap-6  md:gap-10 ">
            {years.map((year, index) => (
              <React.Fragment key={year}>
                <div
                  className={` z-50 cursor-pointer  rounded-md px-6 py-2 transition-all
                ${selectedYear === year
                      ? 'border-yellow-400 bg-yellow-400 font-bold text-xs text-gray-950'
                      : ' text-greenPrimary-100 bg-white dark:bg-greenPrimary-200 font-bold text-xs'
                    }
              `}
                  onClick={() => setSelectedYear(year)}
                >
                  {year === 'Year 5' ? (
                    <>
                      <span>Year 5</span> <span className="font-semibold text-xs text-black-light dark:text-white"> &nbsp;
                        Coming Soon
                      </span>
                    </>
                  ) : (
                    year
                  )}
                </div>
                {index < years.length - 1 && (
                  <div className="absolute hidden w-full border-2 border-b border-white dark:border-greenPrimary-100 md:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {RoadMapCards[selectedYear]?.length > 0 ? (
          RoadMapCards[selectedYear].map((item: any, idx: any) => (
            <RoadMapCard
              key={idx}
              title=""
              className="mx-auto mb-4 mt-4 w-[97%]"
            >
              <div className="mb-4 mt-4 flex items-center justify-between px-6">
                <Text className="text-base font-semibold text-black-light dark:text-white md:text-base">
                  {item.title}
                </Text>
                <Text className="flex items-center gap-2 text-sm font-medium text-greenPrimary-100 md:text-base">
                  Status:
                  <Text className="whitespace-nowrap text-sm font-semibold text-black-light dark:text-white md:text-sm">
                    {item.status}
                  </Text>
                </Text>
              </div>
              <div className="text-gary-1200 mb-4 px-6 text-sm font-normal dark:text-gray-1100">
                {item.description}
              </div>
            </RoadMapCard>
          ))
        ) : (
          <div className="text-gary-1200 px-6 text-center dark:text-gray-1100">
            No roadmap items available.
          </div>
        )}
      </CustomWidgetCard>
      <RoadMapCard
        title=""
        className="mx-auto mb-4 w-full border border-white bg-white dark:!border-greenPrimary-300 dark:!bg-greenPrimary-300 "
      >
        <Text className="my-4 px-6 text-base font-semibold text-black-light dark:text-white">
          Future Vision
        </Text>
        <Text className="text-gary-1200 mb-4 px-6 text-sm font-normal dark:text-gray-1100">
          Explore our longer-term plans including cross-chain compatibility, DAO
          evolution, charity programs, and full gamification.”
        </Text>
      </RoadMapCard>
      <RoadMapCard
        title=""
        shadow="right"
        className="flex h-screen flex-col items-center justify-center bg-lightgray-primary"
      >
        <Image
          src={Transactiondog}
          alt="Shadow image"
          width={100}
          height={106}
          className=" mb-4  rounded-md dark:block"
        />
        <Text className="px-3 text-center text-base font-normal text-black-light dark:text-white">
          You haven’t thrown the $MUTT ball yet — once you do, it always comes
          back.
        </Text>
      </RoadMapCard>
      {/* <RoadMapCard title="" className="bg-lightgray-primary mt-5">
        <Mytransaction/>
      </RoadMapCard> */}
    </>
  );
};

export default MuttTrail;
