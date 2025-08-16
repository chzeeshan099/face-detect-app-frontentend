'use client';
import { IoIosSearch } from 'react-icons/io';
import { FaAngleUp } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { getAlphaBarkData } from '@/apis/dashbord';
import { AlphaBarkItem } from '@/constants/dashbord';
import { Dropdown, Button, Text } from 'rizzui';

export default function AlphaBark() {
  const [alphaBarkData, setAlphaBarkData] = useState<AlphaBarkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [openState, setOpenState] = useState<any>(() => {
    return {};
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Category Filter');
  useEffect(() => {
    const fetchAlphaBarkData = async () => {
      try {
        setLoading(true);
        const data = await getAlphaBarkData();
        setAlphaBarkData(data);
        
        const initialState: { [key: string]: boolean } = {};
        data.forEach((item) => {
          initialState[item.id] = true;
        });
        setOpenState(initialState);
      } catch (error) {
        console.error('Error fetching AlphaBark data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlphaBarkData();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleItem = (id: any) => {
    setOpenState((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="h-auto w-full">
      <div className='w-full rounded-md text-center dark:bg-greenPrimary-light bg-greenPrimary-darker p-4 mb-4 text-white font-semibold text-sm'><Text>Coming Soon</Text></div>
   
      <div className="mb-5 flex flex-col rounded-md  p-2 dark:bg-transparent md:flex-row md:justify-between">
           <Text className="text-2xl font-semibold text-black-light dark:text-white ">Dev Releases</Text>
  
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex w-full rounded-md border-2 border-white dark:border-greenPrimary-200 sm:w-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-black dark:text-white">
              <IoIosSearch size={20} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border-none bg-transparent py-2.5 pl-10 pr-4 font-roboto text-sm font-medium leading-[120%] tracking-[-0.08px] text-black outline-none placeholder:text-black dark:text-white dark:placeholder:text-white"
            />
          </div>
          <div className="w-full lg:w-auto">
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  variant="outline"
                  className="w-full text-sm font-medium text-black dark:bg-greenPrimary-secodarydark bg-lightgray-primary dark:text-white sm:w-auto border-0 dark:border border-greenPrimary-300"
                >
                  {selectedCategory}{' '}
                  <FaAngleDown className="ml-2 w-5 font-roboto text-sm font-medium" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCategorySelect('Account Settings')}>
                  Account Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Support')}>
                  Support
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('License')}>
                  License
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCategorySelect('Sign Out')}>
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <Text>Loading...</Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {alphaBarkData?.map((item) => (
            <div
              key={item.id}
              className="flex w-full dark:border border-greenPrimary-300 flex-col rounded-md dark:bg-transparent"
            >
              <div
                className={`flex items-center justify-between rounded-t-md bg-white px-4 py-3 transition-all duration-300 dark:bg-greenPrimary-200`}
              >
                <div className="flex items-center gap-2">
                  <Text className="font-extrabold text-xl text-black dark:text-white">
                    {item?.id}
                  </Text>
                  <Text className="text-yellow-500 text-sm font-medium">{item?.title}</Text>
                </div>
                <div
                  className={`transform cursor-pointer text-black transition-transform duration-300 dark:text-white ${
                    openState[item?.id] ? 'rotate-180' : ''
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <FaAngleDown  size={22}/>
                </div>
              </div>


              <div>
                {openState[item.id] && (
                  <div className="gap-4  rounded-b-md bg-lightgray-primary dark:bg-greenPrimary-secodarydark  px-4 py-4 text-black dark:text-white sm:px-6 sm:py-6">
                    <Text className="font-roboto text-xs font-medium sm:text-sm">
                      {item?.date}
                    </Text>
                    <Text className="pt-3 font-roboto text-sm font-medium sm:pt-5">
                      {item?.description.split(',')?.map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}