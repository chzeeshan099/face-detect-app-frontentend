'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Text } from 'rizzui';

type ProgressBarProps = {
    coins: number;
    levelData: { level: number; requiredCoins: number };
};

const ProgressBar: React.FC<ProgressBarProps> = ({ coins, levelData }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (coins < levelData.requiredCoins) {
            setProgress((coins / levelData.requiredCoins) * 100);
        } else {
            setProgress(100);
        }
    }, [coins, levelData]);

    const formatToK = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(2).replace(/\.?0+$/, '') + 'k';
        }
        return num.toString();
    };

    const showBone = progress < 100;

    return (
        <div className="dark:bg-greenPrimary-secodarydark bg-lightgray-primary border-white dark:border-greenPrimary-300 border  my-6 text-white rounded-xl">
            <Text className="text-xl p-3 text-center border-b dark:border-greenPrimary-300 border-white font-bold dark:text-white text-gray-800">
                Rank Progress
            </Text>

            <Text className="text-sm px-5 pt-5 text-center  font-medium dark:text-white text-gray-800">
                You need <span className="dark:text-yellow-400 text-greenPrimary-100">{formatToK(levelData.requiredCoins - coins)} more $MUTT</span> coins to level up
            </Text>

            <div className="w-full flex flex-col md:flex-row gap-6 items-center px-6 py-4 rounded-lg">
              
                <div className="flex w-full md:w-1/5 items-center space-x-3">
                    <Image src="/money-mutt/cat.svg" alt="Husky" width={50} height={50} />
                    <div className="dark:text-white text-gray-800">
                        <p className="text-sm font-medium">Husky</p>
                        <p className="text-xs dark:text-gray-700 font-bold text-gray-800">Current Rank</p>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
                    <div className='flex w-full gap-4  items-center'>
                    <div className="relative w-full h-10 p-1 bg-white dark:bg-greenPrimary-secodarydark dark:border border-gray-200 dark:border-greenPrimary-300 rounded-md overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-md transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 ml-2 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-xs px-1 py-1 rounded shadow-md"
                            style={{ left: `calc(${progress === 100 ? 98 : progress}% - 10px)` }}
                        >
                            {levelData.level}
                        </div>
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 ml-24 -translate-x-1/2 transition-all duration-500"
                            style={{ left: `calc(${progress}% - 12px)` }}
                        >
                            <Image src="/money-mutt/husky.svg" alt="Dog" width={32} height={32} />
                        </div>
                        {showBone && (
                            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                                <Image src="/money-mutt/bone.svg" alt="Bone" width={22} height={22} />
                            </div>
                        )}
                        <div
                            className="absolute top-1/2 transform -translate-y-1/2 right-2 ml-8 text-xs text-gray-900 dark:text-white font-semibold"
                            style={{ left: `calc(${progress}% - 20px)` }}
                        >
                            {progress.toFixed(2)}%
                        </div>
                    </div>

                    {progress <= 100 && (
                        <div className=" ">
                            <button className="px-4 py-2 dark:text-gray-800 bg-white dark:bg-greenPrimary-secodarydark border border-gray-300 dark:border-greenPrimary-300 hover:bg-blue-700 text-gray-800 text-sm rounded-md font-medium transition-all duration-200">
                                {levelData.level + 1}
                            </button>
                        </div>
                    )}
                    </div>
                </div>

                <div className="flex w-full md:w-1/5 justify-end items-center space-x-3">
                    <div className="dark:text-white text-gray-800 text-right">
                        <p className="text-sm font-medium">Golden Retriever</p>
                        <p className="text-xs font-bold dark:text-gray-800 text-gray-800">Next Rank</p>
                    </div>
                    <Image src="/money-mutt/dog.svg" alt="Dog" width={50} height={50} />
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
