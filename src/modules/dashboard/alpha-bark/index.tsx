import React from 'react'
import ProgressBar from '@/components/progress-bar/progress-bar'
import AlphaBark from './alpha-bark-card'

const Index = () => {
    const levelData = { level: 2, requiredCoins: 10000 };
    const coins = 1340;
    return (
        <>
            <ProgressBar coins={coins} levelData={levelData} />
            <AlphaBark />
        </>
    )
}

export default Index