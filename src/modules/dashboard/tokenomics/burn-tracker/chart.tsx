'use client';
import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface ChartDataPoint {
    [key: string]: string | number;
}

interface BurnTrackerProps {
    dataSets: {
        [key: string]: ChartDataPoint[];
    };
    xKey: string;
    yKey: string;
    colors?: {
        stroke: string;
        fillStart?: string;
        fillEnd?: string;
    };
}

const BurnTracker: React.FC<BurnTrackerProps> = ({
    dataSets,
    xKey,
    yKey,
    colors = {
        stroke: '#3872FA',
        fillStart: '#3872FA',
        fillEnd: '#3872FA',
    },
}) => {
    const timePeriodOptions = Object.keys(dataSets);
    const [active, setActive] = useState(timePeriodOptions[0]);
    const chartData = dataSets[active];

    return (
        <>
            <div className="mt-4 flex justify-end pe-4">
                <div className="flex space-x-1 rounded-md border border-dashBordBorder">
                    {timePeriodOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setActive(option)}
                            className={`px-3.5 py-1.5 text-xs font-medium rounded-md ${active === option
                                    ? 'bg-yellow-primary dark:text-white text-black'
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
                                <stop offset="5%" stopColor={colors.fillStart} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={colors.fillEnd} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#0B272A" strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} tick={{ fill: 'white' }} />
                        <YAxis tick={{ fill: 'white' }} />
                        <Tooltip formatter={(value: number) => [`${value}`, 'Burned']} />
                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke={colors.stroke}
                            fill="url(#burnChart)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default BurnTracker;
