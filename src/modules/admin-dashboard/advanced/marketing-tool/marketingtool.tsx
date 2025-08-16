import React from 'react'
import { Button, Text } from 'rizzui'
import Table from './table/table'


const MarketingTool = () => {
  return (
   <>
<div className=' border-t border-greenPrimary-200'>
    <div className='flex justify-between px-4 mt-4 '>
   <Text className='text-base font-bold text-white'> CRM / Marketing Tools</Text>
   <Button className='!bg-yellow-primary text-sm font-bold'>Add New Tool </Button>
    </div>
    <div className='mb-1'>
    <Table />
    </div>
</div>

   </>
  )
}

export default MarketingTool