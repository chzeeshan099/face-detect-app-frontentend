'use client';
import React from 'react'
import { Text } from 'rizzui'
import ProposalHistory from './proposal-history'
import PendingFailedTransactions from './pending-failed-transactions'
import AuditTrail from './audit-trail'
const Index = () => {
  return (
    <div>
          <Text className="font-semibold text-2xl dark:text-white text-greenPrimary-secodarydark my-4">Transaction Oversight</Text>
          <div className='my-5'>
          <ProposalHistory onBack={() => {}}  />
         
          </div>
          <div className='my-5'>
          <PendingFailedTransactions onBack={() => {}} />
          </div>
          <div className='my-5'>
          <AuditTrail onBack={() => {}} />
          </div>
           

    </div>
  )
}

export default Index
