import React from 'react'
import DogtagsCard from './dogtagsCard'
import ProgressBar from '@/components/progress-bar/progress-bar';
const Index = () => {
    const levelData = { level: 2, requiredCoins: 10000 };
    const coins = 1000;
    return (
      <>
        <ProgressBar coins={coins} levelData={levelData} />
            <DogtagsCard />
        </>
    )
}

export default Index