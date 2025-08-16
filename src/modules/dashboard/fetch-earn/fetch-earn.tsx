import React from 'react'
import Referral from './referral'
import QRCodeGenerator from './QRCodeGenerator'
import ReferralsMilestones from './referrals-milestones'
import ReferralsStreak from './referrals-streak'
import TopReffer from './top-reffer'
import { Text } from 'rizzui'
import Progressbar from '@/components/progress-bar/progress-bar'
const FetchEarn = () => {
  const coins = 5000; 
  return (
    <>
    <Progressbar coins={coins} levelData={{ level: 2, requiredCoins: 10000 }} />
    <Text className="text-2xl font-medium text-gray-1200 dark:text-white mb-4">Fetch Earn</Text>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3">
         <ReferralsMilestones/>
         <ReferralsStreak/>
         <TopReffer/>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Referral />
        <QRCodeGenerator />
      </div>
    </>
  )
}

export default FetchEarn
