'use client';
import React, { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { BurnTracketDataList } from '@/constants/dashbord';
import { Text } from 'rizzui';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import CustomTooltip from '@/components/custom-tooltip/custom-tooltip';

const dailyData = [
    { time: '15:00', burn: 80 },
    { time: '19:00', burn: 60 },
    { time: '23:00', burn: 40 },
    { time: '03:00', burn: 20 },
    { time: '07:00', burn: 0 },
];

const weeklyData = [
    { time: 'Mon', burn: 50 },
    { time: 'Tue', burn: 70 },
    { time: 'Wed', burn: 30 },
    { time: 'Thu', burn: 90 },
    { time: 'Fri', burn: 40 },
    { time: 'Sat', burn: 20 },
    { time: 'Sun', burn: 10 },
];

const fullDataCurrent = [
    { name: 'Jan', uv: 40000 },
    { name: 'Feb', uv: 30000 },
    { name: 'Mar', uv: 20000 },
    { name: 'Apr', uv: 60000 },
    { name: 'May', uv: 0 },
    { name: 'Jun', uv: 0 },
    { name: 'Jul', uv: 0 },
    { name: 'Aug', uv: 0 },
    { name: 'Sep', uv: 0 },
    { name: 'Oct', uv: 0 },
    { name: 'Nov', uv: 0 },
    { name: 'Dec', uv: 0 },
];

const fullDataMax = [
    { name: 'Jan', uv: 60000 },
    { name: 'Feb', uv: 50000 },
    { name: 'Mar', uv: 40000 },
    { name: 'Apr', uv: 60000 },
    { name: 'May', uv: 0 },
    { name: 'Jun', uv: 0 },
    { name: 'Jul', uv: 0 },
    { name: 'Aug', uv: 0 },
    { name: 'Sep', uv: 0 },
    { name: 'Oct', uv: 0 },
    { name: 'Nov', uv: 0 },
    { name: 'Dec', uv: 0 },
];

const supplyOptions = ['Current', 'Max'];
const timePeriodOptions = ['Daily', 'Weekly'];

const BurnTracker = () => {
    const [active, setActive] = useState('Daily');
    const [supplyView, setSupplyView] = useState('Current');
    const burnData = BurnTracketDataList[0];

    const supplyData = supplyView === 'Current' ? fullDataCurrent : fullDataMax;
    const chartData = active === 'Daily' ? dailyData : weeklyData;

    const shouldShowInfo = (index: number, total: number) =>
        index === 0 || index === 1 || index === total - 1;

    const statEntries = Object.values(burnData.stats);

    return (
        <div className="px-4">
            <div className="mb-5 flex flex-col rounded-md">
                <h1 className=" py-2 text-2xl font-semibold dark:text-white text-black md:text-2xl">
                    {burnData.title}
                </h1>
                <p className=" text-sm dark:text-white text-black font-normal">
                    {burnData.description}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {statEntries.map((item, index) => (
                    <div
                        key={index}
                        className=" rounded-md whitespace-nowrap bg-lightgray-primary dark:border border-dashBordBorder dark:bg-dashBordCardsBG p-5 shadow-sm"
                    >
                        <div className="flex items-center gap-1">
                            <p className="text-sm font-medium text-greenPrimary-100 text-black">
                                {item.label}
                            </p>
                            {shouldShowInfo(index, statEntries.length) && (
                                <div className="relative group mt-1">
                                    <CustomTooltip content={'info' in item && item.info}>
                                        <BsInfoCircle className="text-sm text-greenPrimary-100 text-black cursor-pointer" />
                                    </CustomTooltip>
                                </div>
                            )}

                        </div>
                        <p className="text-base font-medium dark:text-white text-black">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="w-full rounded-lg dark:border border-dashBordBorder dark:bg-dashBordCardsBG bg-lightgray-primary">
                    <div>
                        <Text className='border-white text-base border-b dark:border-dashBordBorder py-2 text-center font-bold dark:text-white text-black'>
                            Historical Burn
                        </Text>
                    </div>
                    <div className="mt-4 flex justify-end pe-4">
                        <div className="flex space-x-1 bg-white dark:bg-transparent rounded-md dark:border border-dashBordBorder">
                            {timePeriodOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setActive(option)}
                                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md ${active === option
                                        ? 'bg-yellow-primary dark:text-gray-100 text-black'
                                        : 'bg-transparent dark:text-white text-black'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5 h-[200px] w-full pe-1 sm:pe-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{ left: -20 }}
                                className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                            >
                                <defs>
                                    <linearGradient id="burnChart" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3872FA" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#0B272A" strokeDasharray="3 3" />
                                <XAxis dataKey="time" tick={{ fill: 'white' }} />
                                <YAxis domain={[0, 100]} tick={{ fill: 'white' }} />
                                <Tooltip formatter={(value) => [`${value}`, 'Burned']} />
                                <Area
                                    type="monotone"
                                    dataKey="burn"
                                    stroke="#3872FA"
                                    fill="url(#burnChart)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="w-full rounded-lg dark:border border-dashBordBorder dark:bg-dashBordCardsBG bg-lightgray-primary">
                    <div>
                        <Text className='border-white text-base border-b dark:border-dashBordBorder py-2 text-center font-bold dark:text-white text-black'>
                            $MUTT Supply
                        </Text>
                    </div>
                    <div className="mt-4 flex justify-end pe-4">
                        <div className="flex space-x-1 bg-white dark:bg-transparent rounded-md dark:border border-dashBordBorder">
                            {supplyOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSupplyView(option)}
                                    className={`px-3.5 py-1.5 text-xs font-medium rounded-md ${supplyView === option
                                         ? 'bg-yellow-primary dark:text-gray-100 text-black'
                                        : 'bg-transparent dark:text-white text-black'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5 h-[200px] w-full pe-1 sm:pe-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={supplyData}
                                margin={{ left: -20 }}
                                className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                            >
                                <defs>
                                    <linearGradient id="muttChart" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3872FA" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3872FA" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#0B272A" strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: 'white' }} />
                                <YAxis
                                    domain={[0, 60000]}
                                    tickFormatter={(value) => `${value / 1000}k`}
                                    tick={{ fill: 'white' }}
                                />
                                <Tooltip formatter={(value) => [typeof value === 'number' ? `${value / 1000}k` : value, 'Supply']} />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#3872FA"
                                    fill="url(#muttChart)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BurnTracker;