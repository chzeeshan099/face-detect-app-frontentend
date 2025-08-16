'use client';

import { useState } from 'react';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import clsx from 'clsx';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const dailyData = [
  { date: '11 Apr', value: 30 },
  { date: '', value: 20 },
  { date: '', value: 15 },
  { date: '', value: 25 },
  { date: '18 Apr', value: 27 },
  { date: '', value: 18 },
  { date: '', value: 25 },
  { date: '25 Apr', value: 17 },
  { date: '', value: 25 },
  { date: '', value: 30 },
  { date: '2 Mar', value: 35 },
  { date: '', value: 30 },
  { date: '', value: 25 },
  { date: '9 Mar', value: 27 },
  { date: '', value: 40 },
  { date: '16 Mar', value: 45 },
];

const hourlyData = [
  { date: '01:00', value: 5 },
  { date: '04:00', value: 8 },
  { date: '08:00', value: 20 },
  { date: '12:00', value: 25 },
  { date: '14:00', value: 22 },
  { date: '16:00', value: 30 },
  { date: '18:00', value: 28 },
  { date: '20:00', value: 35 },
  { date: '22:00', value: 32 },
];

const Contribution = () => {
  const [active, setActive] = useState('Daily');
  const data = active === 'Daily' ? dailyData : hourlyData;

  return (
    <CustomWidgetCard title="Contribution" shadow='left' className="w-full">
      <div className="flex justify-end mt-4 mb-6 px-6">
        {/* <div className="flex rounded-md overflow-hidden">
          {['Hourly', 'Daily'].map((label) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`px-4 py-1.5 text-sm  transition-all duration-200 ${active === label
                  ? 'bg-yellow-primary chtext-webPrimary-dark'
                  : 'bg-transparent text-gray-800 dark:text-white'
                }`}
            >
              {label}
            </button>
          ))}
        </div> */}
        <div className='bg-white dark:bg-transparent dark:border dark:border-greenPrimary-300 rounded-md'>
          {['Hourly', 'Daily'].map((label, index) => {
            const isFirst = index === 0;
            const isLast = index === ['Hourly', 'Daily'].length - 1;

            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={clsx(
                  'text-xs font-medium px-3 py-1 dark:border-r dark:border-greenPrimary-300 last:border-r-0 text-gray-950 dark:text-white',
                  active === label
                    ? 'bg-yellow-primary text-gray-900 dark:text-greenPrimary-1000'
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
      <div className="h-[340px] w-full pr-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }} className=''>
            <defs>
              <linearGradient id="contributionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1ea88a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1ea88a" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-[#1a2e30] border border-red-600" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#4B5563' }}
              axisLine={{ stroke: '#9CA3AF' }}
              tickLine={false}
              className="dark:[&_*]:!fill-white dark:[&_*]:"
            />
            <YAxis
              domain={[0, 50]}
              // tick={{ fill: '#4B5563' }}
              // axisLine={{ stroke: '#9CA3AF' }}
              
              tickLine={false}
              tickCount={6}
              className="dark:[&_*]:!fill-white dark:[&_*] border-4 my-16 border-red-400:"
            />
            <Tooltip
            content={<CustomTooltip/>}
            />
            <Area type="monotone" dataKey="value" stroke="#1ea88a"  fill="url(#contributionGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CustomWidgetCard>
  );
};

export default Contribution;
