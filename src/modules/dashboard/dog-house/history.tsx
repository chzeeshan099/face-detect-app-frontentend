"use client"
import React, { useEffect, useState } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { getHistoryDataByRangeApi } from '@/apis/dashbord';
import { Button } from 'rizzui';
import CustomWidgetCard from '@/components/cards/custom-widget-card'

const History = () => {
    const [active, setActive] = useState<'1D' | '1M' | '1Y'>('1Y');
    const [historyDataByRange, setHistoryDataByRange] = useState<any>({});
    const timePeriodOptions = ['1D', '1M', '1Y'];
    const chartData = historyDataByRange ? historyDataByRange[active] : [];


    const fetchHistoryData = async () => {
        try {
            const data = await getHistoryDataByRangeApi();
            setHistoryDataByRange(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
        fetchHistoryData();
    }, []);
    return (
        <>
            <CustomWidgetCard title="Referral History" shadow='right'>
                <div className='flex items-center justify-end mt-4 pe-4'>
                    <div className="relative z-10 flex rounded-md space-x-1 w-fit dark:border border-dashBordBorder overflow-hidden bg-white dark:bg-transparent">
                        {timePeriodOptions.map((option) => (
                            <Button
                                key={option}
                                onClick={() => setActive(option as '1D' | '1M' | '1Y')}
                                type="button"
                                className={`px-3.5 py-1.5 text-xs font-medium rounded-none	 
                             ${active === option
                                        ? 'bg-yellow-primary hover:bg-yellow-primary dark:hover:bg-yellow-primary text-black-light'
                                        : 'bg-transparent hover:bg-transparent dark:hover:bg-transparent  text-black-light dark:text-primary-white border border-transparent'
                                    } `}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="mt-5 h-48 w-full lg:mt-5 pe-1 sm:pe-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{ left: -20 }}
                            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
                        >
                            <defs>
                                <linearGradient id="simpleAreaChart" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid stroke="#0B272A" strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                                ticks={[0, 20, 40, 60, 80, 100, 120, 140]}
                                tick={{ fill: 'white' }}
                            />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#FF0000" // 👈 Red color
                                fill="url(#simpleAreaChart)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CustomWidgetCard>
        </>
    )
}

export default History;