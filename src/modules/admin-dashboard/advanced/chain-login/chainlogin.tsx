import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Button, Text } from 'rizzui'
import Table from './table/table'

const ChainLogin = () => {
  return (
   <>
   <CustomWidgetCard title="On-Chain Logging  " shadow='left' button= {{text:'Export'}} className='w-full'>
  <Table />
</CustomWidgetCard>
   </>
  )
}

export default ChainLogin