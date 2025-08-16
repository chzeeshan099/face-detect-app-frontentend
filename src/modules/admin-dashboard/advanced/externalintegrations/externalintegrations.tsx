import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Button, Text } from 'rizzui'
import Table from './table/table'
import AmlproviderData from '../aml-provider'
import MarketingTool from '../marketing-tool/marketingtool'


const ExternalIntegrations = () => {
  return (
   <>
   <CustomWidgetCard title="External Integrations" shadow='left' className='mt-2 overflow-hidden relative'>
    <div className='border-t border-greenPrimary-200 '>

    <div className='flex justify-between px-4 pt-6'>
   <Text className='text-base font-bold text-white'> Webhooks</Text>
   <Button className='!bg-yellow-primary text-sm font-bold'>Add Webhooks</Button>
    </div>
    <div className='mb-1'>
    <Table />
    </div>
    <AmlproviderData />
</div>
<MarketingTool />
   </CustomWidgetCard>
   </>
  )
}

export default ExternalIntegrations