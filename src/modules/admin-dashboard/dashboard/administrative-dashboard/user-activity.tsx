'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Button, Text } from 'rizzui'

interface UserActivityProps {
  totalUsers?: number;
  newSignUps?: number;
  onViewUserList: () => void;
}

const UserActivity: React.FC<UserActivityProps> = ({
  totalUsers = 3456,
  newSignUps = 123,
  onViewUserList
}) => {
  return (
    <CustomWidgetCard title='User Activity' shadow='right' className="w-full">
      <div className="flex flex-col gap-4 p-4">
        <div>
          <Text className="text-sm font-medium text-greenPrimary-100">Total Participants</Text>
          <Text className="text-base font-semibold text-greenPrimary-700 dark:text-white mt-1">{totalUsers.toLocaleString()} Users</Text>
        </div>
        
        <div>
          <Text className="text-sm font-medium text-greenPrimary-100">New Sign-ups (Last 24h)</Text>
          <Text className="text-base font-semibold text-greenPrimary-700 dark:text-white mt-1">+{newSignUps}</Text>
        </div>
      </div>
      <div className="py-5 px-4 md:mt-16">
        <Button 
          className="!bg-yellow-primary w-full !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6"
          onClick={onViewUserList}
        >
          View User List
        </Button>
      </div>
    </CustomWidgetCard>
  )
}

export default UserActivity