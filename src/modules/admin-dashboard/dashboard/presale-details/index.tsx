import React from 'react'
import PresaleDetail from './presaledetail'
import Table from './table/table'

import CustomWidgetCard from '@/components/cards/custom-widget-card'


interface PreDetailProps {
  onBack: () => void;
}

const PreDetail: React.FC<PreDetailProps> = ({ onBack }) => {
  return (
 <>
 <PresaleDetail onBack={onBack} />

 <div className=''> 
  <CustomWidgetCard title="Recent Contributions" shadow='left' className='mt-5 overflow-hidden'>
  <Table/>
 </CustomWidgetCard>
 </div>
 </>
  )
}

export default PreDetail