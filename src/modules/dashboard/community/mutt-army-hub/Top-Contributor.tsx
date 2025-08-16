'use client';
import React, { useState, useEffect } from 'react';
import { Text } from 'rizzui';
import { MdErrorOutline } from 'react-icons/md';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import Pagination from '@/components/others/pagination';
import { getTopContributorData } from '@/apis/dashbord';
import { TopContributorItem } from '@/constants/dashbord';

const ITEMS_PER_PAGE = 10;

const TopContributor = () => {
  const [contributors, setContributors] = useState<TopContributorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopContributorData();
        setContributors(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top contributor data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-5 w-full ">
      <CustomWidgetCard title="Top Contributors" shadow="left">
        <Pagination
          className="pb-5 pt-4"
          variant="solid"
          total={contributors.length}
          pageSize={ITEMS_PER_PAGE}
          limit={ITEMS_PER_PAGE}
          data={contributors}
          paginationProps={{
            showItemsPerPage: false,
            showInfo: true,
            simplify: true,
            infoFormatter: (activePage, totalPages) =>
              `${activePage}/${totalPages}`,
          }}
          renderContent={(currentPageContributors) => (
            <div className="flex flex-row justify-between px-5 pt-8">
              <div className="h-500px">
                <Text className="text-sm font-medium text-greenPrimary-100">
                  Wallet Address
                </Text>
                {loading ? (
                  <Text className="text-black mt-7 text-center dark:text-white">
                    Loading...
                  </Text>
                ) : (
                  <>
                    <div className="flex flex-col">
                      {currentPageContributors.map((contributor, index) => {
                        const truncatedAddress = `${contributor.walletAddress.slice(0, 5)}...${contributor.walletAddress.slice(-4)}`;
                        return (
                          <Text
                            className="text-black mt-7 text-center text-sm font-medium dark:text-white"
                            key={index}
                          >
                            {truncatedAddress}
                          </Text>
                        );
                      })}
                      {currentPageContributors.length === 0 && (
                        <Text className="text-black mt-7 text-center text-sm dark:text-white">
                          No contributors found
                        </Text>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-1 sm:gap-5 md:gap-8">
                <div className="h-[500px]">
                  <Text className="text-center text-sm font-medium text-greenPrimary-100">
                    Total Posts
                  </Text>
                  {loading ? (
                    <Text className="text-black  mt-7 text-center dark:text-white">
                      Loading...
                    </Text>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        {currentPageContributors.map((contributor, index) => (
                          <Text
                            className="text-black mt-7 text-center text-sm font-medium dark:text-white "
                            key={index}
                          >
                            {contributor.totalposts}
                          </Text>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="h-[500px]">
                  <Text className="flex gap-0 text-center text-sm font-medium text-greenPrimary-100 sm:gap-1">
                    Total Points
                    <span className="">
                      <MdErrorOutline size={20} className="" />
                    </span>
                  </Text>
                  {loading ? (
                    <Text className="text-black mt-7 text-center dark:text-white">
                      Loading...
                    </Text>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        {currentPageContributors.map((contributor, index) => (
                          <Text
                            className="text-black mt-7 text-center text-sm font-medium dark:text-white"
                            key={index}
                          >
                            {contributor.totalpoints}
                          </Text>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      </CustomWidgetCard>
    </div>
  );
};

export default TopContributor;
