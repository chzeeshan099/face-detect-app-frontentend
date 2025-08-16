import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Button, Text } from 'rizzui'

interface TokenFundsProps {
  onViewSalesLedger: () => void;
}

const TokenFunds: React.FC<TokenFundsProps> = ({ onViewSalesLedger }) => {
  const totalTokensSold = "15,345,678";
  const totalFundsRaised = "1,234.56";
  const minPurchaseCap = "0.1";
  const maxPurchaseCap = "5";

 

  return (
   <CustomWidgetCard title='Tokens Sold & Funds Raised' shadow='right' className="w-full">
    <div className="space-y-4 p-6">
      <div>
        <Text className="text-sm font-medium text-greenPrimary-100 ">Total Tokens Sold</Text>
        <Text className="text-base font-medium dark:text-white text-greenPrimary-700  mt-1">{totalTokensSold} TKN</Text>
      </div>

      <div>
        <Text className="text-sm font-medium text-greenPrimary-100">Total Funds Raised</Text>
        <Text className="text-base font-medium mt-1 dark:text-white text-greenPrimary-700">{totalFundsRaised} BNB</Text>
      </div>

      <div className=''>
        <Text className="text-sm font-medium text-greenPrimary-100">Purchase Caps (Per User)</Text>
        <Text className="text-base font-medium mt-1 dark:text-white text-greenPrimary-700">Min - {minPurchaseCap} BNB | Max - {maxPurchaseCap} BNB</Text>
      </div>

      <div className="mt-5">
        <Button 
          className="!bg-yellow-primary w-full !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6"
          onClick={onViewSalesLedger}
        >
          View Sales Ledger
        </Button>
      </div>
    </div>
   </CustomWidgetCard>
  )
}

export default TokenFunds