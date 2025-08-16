'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Text, Button } from 'rizzui'
import { MdShield, MdWarning, MdSecurity, MdBlock } from 'react-icons/md'
import { TbShieldCheck, TbSkull } from 'react-icons/tb'

interface SecurityAlertsProps {
  onViewSecurity: () => void;
}

const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ onViewSecurity }) => {
  const emergencyStopStatus = 'Success';
  const suspiciousFlagsCount = 2;
  const ddosProtectionStatus = 'MITIGATING';

  return (
    <>
      <CustomWidgetCard title='Security Alerts' shadow='right' className="w-full">
        <div className="p-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex-1">
              <Text className="text-sm font-medium text-greenPrimary-100 dark:text-greenPrimary-100">Emergency Stop</Text>
              <Text className="text-sm font-medium text-greenPrimary-100 dark:text-greenPrimary-100">Status: <span className='text-greenPrimary-50'>{emergencyStopStatus}</span></Text>
            </div>
            
            <div className="flex items-center justify-center h-10 w-10 bg-white dark:bg-greenPrimary-200 rounded-md">
              <MdBlock className="h-6 w-6 text-greenPrimary-700 dark:text-white" />
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <div className="flex-1">
              <Text className="text-sm font-medium text-greenPrimary-100 dark:text-greenPrimary-100">Suspicious Activity</Text>
              <Text className="text-sm text-yellow-primary">
                {suspiciousFlagsCount > 0 
                  ? `${suspiciousFlagsCount} Flags Detected` 
                  : 'No Flags'}
              </Text>
            </div>
            
            <div className="flex items-center justify-center h-10 w-10 bg-white dark:bg-greenPrimary-200 rounded-md">
              <TbSkull className="h-6 w-6 text-greenPrimary-700 dark:text-white" />
            </div>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <div className="flex-1">
              <Text className="text-sm font-medium text-greenPrimary-100 dark:text-greenPrimary-100">DDoS Protection</Text>
              <Text className="text-sm font-medium text-greenPrimary-100 dark:text-greenPrimary-100 mt-1">status: <span className='text-red-100'>{ddosProtectionStatus}</span></Text>
            </div>
            
            <div className="flex items-center justify-center h-10 w-10 bg-white dark:bg-greenPrimary-200 rounded-md">
              <TbShieldCheck className="h-6 w-6 text-greenPrimary-700 dark:text-white" />
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={onViewSecurity}
              type="button"
              className="!bg-yellow-primary w-full !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6"
            >
              View Security Center
            </Button>
          </div>
        </div>
      </CustomWidgetCard>
    </>
  )
}

export default SecurityAlerts