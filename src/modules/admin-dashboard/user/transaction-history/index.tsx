import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import Table from './table/table'

const TransactionPage = () => {
    return (
        <>
            <div className='mt-4 w-full'>
                <CustomWidgetCard
                    title="Transaction History"
                    shadow='left'>
                    <Table />
                </CustomWidgetCard>
            </div>
        </>
    )
}

export default TransactionPage