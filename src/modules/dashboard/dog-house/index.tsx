import React from 'react'
import RoadMap from '@/modules/dashboard/dog-house/roadMap'
import LastTransactions from '@/modules/dashboard/dog-house/lastTransactions'
import History from '@/modules/dashboard/dog-house/history'
import BarkBuy from '@/modules/dashboard/dog-house/Bark-Buy/bark-buy'
import ProgressBar from '@/components/progress-bar/progress-bar'
import PortalNotification from './notification'
import BalanceSummaryCard from './Bark-Buy/BalanceSummaryCard'
import FetchEarn from './Bark-Buy/fetch-earn'
import TopDogs from './Bark-Buy/TopDogs'


const Index = () => {
    const levelData = { level: 2, requiredCoins: 10000 };
    const coins = 1000;

    return (

        <>
            <PortalNotification amount={12000} />
            <ProgressBar coins={coins} levelData={levelData} />
            <BalanceSummaryCard />
            <div className='w-full grid grid-cols-1 md:grid-cols-2 mt-4 gap-4'>
                <BarkBuy />
                <TopDogs />
            </div>
            <div>
                <FetchEarn />

            </div>


            <div className='w-full grid grid-cols-1 md:grid-cols-2 mt-4 gap-4'>
                <RoadMap />
                <div className=" flex flex-col gap-4">
                    <LastTransactions />
                    <History />
                </div>
            </div>


        </>
    )
}

export default Index