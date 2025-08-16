import CustomWidgetCard from '@/components/cards/custom-widget-card';
import { statusData } from '@/constants/presale';
import React from 'react';
import { Text } from 'rizzui';


const CurrentStatus = () => {
  return (
    <CustomWidgetCard
      title="Current Status"
      shadow="left"
      button={{
        text: "End Current Stage & Activate Next",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full py-7 px-4 sm:px-7 gap-4 sm:gap-0">
        <div className="w-full sm:w-1/2">
          <Text className="text-sm font-medium text-greenPrimary-100">
          Active Stage
          </Text>
          <Text className="text-base font-medium dark:text-white text-greenPrimary-700">
            {statusData.activeStageValue}
          </Text>
        </div>
        <div className="w-full">
          <Text className="text-sm font-medium text-greenPrimary-100">
          End Time
          </Text>
          <Text className="text-base font-medium dark:text-white text-greenPrimary-700">
            {statusData.endTimeValue}
          </Text>
        </div>
      </div>
    </CustomWidgetCard>
  );
};

export default CurrentStatus;
