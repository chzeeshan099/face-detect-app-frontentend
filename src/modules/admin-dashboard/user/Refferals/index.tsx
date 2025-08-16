import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import Table from './table/table'

const RefferalsPage = () => {
    return (
        <>
            <div className='mt-4 w-full'>
                <CustomWidgetCard
                    title="Refferals"
                    shadow='right'>
                    <Table />
                </CustomWidgetCard>
            </div>
        </>
    )
}

export default RefferalsPage