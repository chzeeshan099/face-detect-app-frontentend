import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Button, Text } from 'rizzui'
import Table from './table/table'


const AmlProvider = () => {
  return (
   <>
<div className='px-4 py-6'>
    <div className='flex justify-between'>
   <Text className='text-base font-bold text-white'> KYC/AML Provider</Text>
   <Button className='!bg-yellow-primary text-sm font-bold'>Add Provider</Button>
    </div>
    <Table />
</div>

   </>
  )
}

export default AmlProvider