import React from 'react'
import Proposal from './proposal'
import ProgressBar from '@/components/progress-bar/progress-bar';

const Index = () => {
    const levelData = { level: 2, requiredCoins: 10000 };
    const coins = 1000;
    return (

        <>
            <ProgressBar coins={coins} levelData={levelData} />
            <Proposal />

        </>
    )
}

export default Index