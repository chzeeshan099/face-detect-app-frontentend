import React from 'react';
import { Text } from 'rizzui';
import { HiOutlineCurrencyDollar, HiOutlineInformationCircle } from "react-icons/hi2";
import { LuWallet } from "react-icons/lu";
import { RiUserAddLine } from 'react-icons/ri';
import CustomTooltip from '@/components/custom-tooltip/custom-tooltip';

export const WalletOverview = [
  {
    title: "Total $MUTT Earned",
    balance: "0.00",
    icon: LuWallet,
    currency: "MUTT",
    tooltip: "Includes $MUTT earned from referrals, staking, contests, and rewards."
  },
  {
    title: "Total Referrals",
    balance: "13",
    icon: RiUserAddLine,
    tooltip: "Number of new wallets you referred using your unique referral code."
  },
  {
    title: "$MUTT from Referrals",
    balance: "0.000000",
    icon: HiOutlineCurrencyDollar,
    currency: "MUTT",
    tooltip: "Total $MUTT brought into the ecosystem from your referral links."
  },
];

const SummaryCard = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 my-4'>
      {WalletOverview?.map((item, index) => (
        <div
          key={index}
          className='flex flex-row w-full dark:bg-greenPrimary-secodarydark bg-lightgray-primary justify-between shadow-sm dark:border p-6 dark:border-greenPrimary-300 border-white rounded-md'
        >
          <div>
            <div className='flex items-center gap-2'>
              <Text className='font-medium text-sm text-greenPrimary-100'>{item.title}</Text>
              {item.tooltip && (
                <CustomTooltip content={item.tooltip}>
                  <HiOutlineInformationCircle className='h-4 w-4 text-greenPrimary-100' />
                </CustomTooltip>
              )}
            </div>
            <Text className='dark:text-white text-black text-2xl font-semibold mt-1'>
              {item.balance} {item.currency}
            </Text>
          </div>
          <div className='dark:bg-greenPrimary-200 bg-white py-3 px-4 inline-flex items-center justify-center rounded-2xl'>
            <item.icon className='h-6 w-6 dark:text-white text-black' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
