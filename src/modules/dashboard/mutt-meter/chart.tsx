'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import clsx from 'clsx';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { useMedia } from '@/hooks/use-media';
import { Text } from 'rizzui';

type DataType = {
    name: string;
    Profit: number;
};

const timeframes = ['1D', '1W', '1M', '3M', '1Y', '3Y'];

const data: Record<string, DataType[]> = {
    '1D': [
        { name: '9:00 AM', Profit: 50000 },
        { name: '10:00 AM', Profit: 180000 },
        { name: '11:00 AM', Profit: 120000 },
        { name: '12:00 PM', Profit: 120000 },
        { name: '1:00 PM', Profit: 220000 },
        { name: '2:00 PM', Profit: 60000 },
    ],
    '1W': [
        { name: '1 Jun', Profit: 50000 },
        { name: '2 Jun', Profit: 180000 },
        { name: '3 Jun', Profit: 120000 },
        { name: '4 Jun', Profit: 120000 },
        { name: '5 Jun', Profit: 220000 },
        { name: '6 Jun', Profit: 60000 },
        { name: '7 Jun', Profit: 150000 },
    ],
    '1M': [
        { name: '1 Apr', Profit: 50000 },
        { name: '5 Apr', Profit: 180000 },
        { name: '10 Apr', Profit: 120000 },
        { name: '15 Apr', Profit: 220000 },
        { name: '20 Apr', Profit: 150000 },
        { name: '25 Apr', Profit: 60000 },
        { name: '30 Apr', Profit: 80000 },
    ],
    '3M': [
        { name: '1 Feb', Profit: 50000 },
        { name: '1 Mar', Profit: 100000 },
        { name: '1 Apr', Profit: 150000 },
        { name: '1 May', Profit: 200000 },
        { name: '1 Jun', Profit: 120000 },
    ],
    '1Y': [
        { name: 'Jun 2024', Profit: 50000 },
        { name: 'Mar 2024', Profit: 120000 },
        { name: 'Dec 2023', Profit: 220000 },
        { name: 'Sep 2023', Profit: 180000 },
        { name: 'Jun 2023', Profit: 60000 },
    ],
    '3Y': [
        { name: 'Jun 2022', Profit: 40000 },
        { name: 'Jun 2023', Profit: 150000 },
        { name: 'Jun 2024', Profit: 200000 },
    ],
};

const formatYAxisTick = (value: number): string => {
    return `$${(value / 1000).toFixed(0)}k`;
};

export default function ProfitChart() {
    const isTablet = useMedia('(max-width: 800px)', false);
    const [selected, setSelected] = useState('1W');
    const [chartData, setChartData] = useState<DataType[]>(data['1W']);

    const handleTimeframeChange = (label: string) => {
        setSelected(label);
        setChartData(data[label]);
    };

    return (
        <div className="dark:bg-greenPrimary-secodarydark  bg-lightgray-primary border-white   dark:border-greenPrimary-300 border sm:mx-6 my-8 text-white  rounded-xl dark:bg-[url('/images/projectreturnshadow.svg')] bg-contain bg-no-repeat bg-[right_16px_top_-36px] ">
            <Text className="text-base p-3 text-center border-b  dark:border-greenPrimary-300   border-white font-bold dark:text-white text-gray-800">
                Project Returns
            </Text>
        
            <div className="flex justify-end  mt-2  flex-wrap pr-2 w-full">
                <div className='bg-white dark:bg-transparent dark:border dark:border-greenPrimary-300 rounded-md'>
                {timeframes.map((label, index) => {
                    const isFirst = index === 0;
                    const isLast = index === timeframes.length - 1;

                    return (
                        <button
                            key={label}
                            onClick={() => handleTimeframeChange(label)}
                            className={clsx(
                                'text-xs font-medium px-3 py-1 dark:border-r dark:border-greenPrimary-300 last:border-r-0 text-gray-950 dark:text-white',
                                selected === label
                                    ? 'bg-yellow-400 text-gray-900 dark:text-gray-900'
                                    : 'dark:hover:bg-yellow-700 hover:bg-yellow-200 text-gray-400',
                                {
                                    'rounded-l-md': isFirst,
                                    'rounded-r-md': isLast,
                                }
                            )}
                        >
                            {label}
                        </button>
                    );
                })}
                </div>
            </div>
            <div className="mt-5 h-48 p-4 w-full lg:mt-5 pe-1 sm:pe-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ left: -16 }}
                        className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                    >
                        <defs>
                            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#0B272A" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: '#999', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            ticks={[60000, 120000, 180000, 240000]}
                            tickFormatter={formatYAxisTick}
                            tick={{ fill: '#999', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            
                        />
                         <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ stroke: '#333', strokeWidth: 1 }}
                        />
                        <Area
                            type="linear"
                            dataKey="Profit"
                            stroke="#10b981"
                            fill="url(#profitGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
