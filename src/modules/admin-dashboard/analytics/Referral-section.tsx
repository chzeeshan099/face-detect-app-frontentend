'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import CustomWidgetCard from '@/components/cards/custom-widget-card';

const data = [
  { name: '11 Apr', referrals: 200, signups: 120 },
  { name: '18 Apr', referrals: 400, signups: 340 },
  { name: '25 Apr', referrals: 370, signups: 260 },
  { name: '2 Mar', referrals: 460, signups: 390 },
  { name: '9 Mar', referrals: 300, signups: 180 },
  { name: '16 Mar', referrals: 260, signups: 190 },
];

export default function ReferralChart({ className }: { className?: string }) {
  const isMediumScreen = useMedia('(max-width: 1200px)', false);

  return (
    <CustomWidgetCard title="Referral Conversion Rate"   shadow='left'
      className='w-full'
    >
     

      <ResponsiveContainer width="100%" height="85%" className='px-1'>
        <BarChart
          data={data}
          barSize={isMediumScreen ? 18 : 24}
          margin={{ top: 20, right: 30, left: -10, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-[#0f2a30]"
          />
          <XAxis
            dataKey="name"
            tick={{ fill: '#1f2937' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
            className="dark:[&_text]:fill-white dark:[&_line]:stroke-[#0f2a30]"
          />
          <YAxis
            tick={{ fill: '#1f2937' }}
            axisLine={{ stroke: '#d1d5db' }}
            tickLine={false}
            className="dark:[&_text]:fill-white dark:[&_line]:stroke-[#0f2a30]"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#d1d5db',
              color: '#111827',
            }}
            itemStyle={{ color: '#10b981' }}
            labelStyle={{ color: '#6b7280' }}
            formatter={(value: number, name: string) => [
              value,
              name === 'referrals' ? 'Referrals' : 'Signups',
            ]}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          <Bar
            dataKey="referrals"
            fill="#45B65F"
            radius={[4, 4, 0, 0]}
            name="Referrals"
          />
          <Bar
            dataKey="signups"
            fill="#0D2E33"
            radius={[4, 4, 0, 0]}
            name="Signups"
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-8 mt-1 pb-3 text-sm font-medium text-gray-700 dark:text-white">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-sm bg-greenPrimary-darker" />
          Referrals
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-sm bg-[#0D2E33]" />
          Signups
        </div>
      </div>
  
    </CustomWidgetCard>
  );
}
