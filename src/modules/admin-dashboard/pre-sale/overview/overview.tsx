'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React, { useState } from 'react'
import { Button, Input, Dropdown, Text, Select } from 'rizzui'
import { FaAngleDown } from 'react-icons/fa'
import SuccessModal from './success-modal'

const OverView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [globalCapCoin, setGlobalCapCoin] = useState('BNB')
  const [perWalletCapCoin, setPerWalletCapCoin] = useState('BNB')
  const [whaleLimitCoin, setWhaleLimitCoin] = useState('BNB')
  const [selectedLimitType, setSelectedLimitType] = useState('')
  const [globalCap, setGlobalCap] = useState('')
  const [perWalletCap, setPerWalletCap] = useState('')
  const [whaleLimit, setWhaleLimit] = useState('')

  const coinOptions = [
    { label: 'BNB', value: 'BNB' },
    { label: 'ETH', value: 'ETH' },
    { label: 'USDT', value: 'USDT' },
  ]

  const limitTypeOptions = [
    { label: 'Percentage', value: 'percentage' },
    { label: 'Fixed Amount', value: 'fixed' },
  ]

  const handleSave = () => {
    setIsModalOpen(true)
  }

  const CoinSelector = ({ selectedCoin, setSelectedCoin }: any) => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          size='sm'
          variant="text"
          className=" rounded-none border-l dark:border-white border-greenPrimary-700  px-3  flex items-center gap-1 !text-greenPrimary-700 dark:!text-white   min-w-[80px] justify-center"
        >
          {selectedCoin}
          <FaAngleDown className="text-xs" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="min-w-[80px]">
        {coinOptions.map((option) => (
          <Dropdown.Item
            key={option.value}
            onClick={() => setSelectedCoin(option.value)}
            className="text-center  justify-center"
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
   <>
   <CustomWidgetCard title='Overview' shadow='left' className="w-full">
      <div className=" ">
        <div className='p-6'>
          <Text className=" py-1 text-xs font-medium   text-greenPrimary-100 ">Global Cap 
            <span className='text-sm font-semibold dark:text-white text-greenPrimary-700'> Total Contributions</span>
          </Text>
         
          <div className="w-full">
            <Input 
              type="text"
              placeholder="Enter amount"
              value={globalCap}
              onChange={(e) => setGlobalCap(e.target.value)}
              className="w-full dark:[&_input::placeholder]:text-white ring-0 border-none focus:ring-0 [&_input]:rounded-r-none "
              inputClassName="placeholder:text-white bg-white dark:bg-greenPrimary-200  border dark:!border-greenPrimary-300 border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none"
              suffix={<CoinSelector selectedCoin={globalCapCoin} setSelectedCoin={setGlobalCapCoin} />}
            />
          </div>
        </div>
        <div className="border-t border-white dark:border-greenPrimary-200 my-2"></div>
        <div className='p-6'>
        <Text className=" py-1 text-xs font-medium   text-greenPrimary-100 ">Per-Wallet Cap
            <span className='text-sm font-semibold dark:text-white text-greenPrimary-700'> Max Contribution per Participant</span>
          </Text>
          <div className="w-full">
            <Input 
              type="text"
              placeholder="Enter max amount per wallet"
              value={perWalletCap}
              onChange={(e) => setPerWalletCap(e.target.value)}
              className="w-full dark:[&_input::placeholder]:text-white ring-0 border-none focus:ring-0 [&_input]:rounded-r-none "
              inputClassName="placeholder:text-white bg-white dark:bg-greenPrimary-200 border border-none dark:!border-greenPrimary-300  !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none"
              suffix={<CoinSelector selectedCoin={perWalletCapCoin} setSelectedCoin={setPerWalletCapCoin} />}
            />
          </div>
          </div>
          <div className="border-t border-white dark:border-greenPrimary-200 my-2 w-full"></div>
          <div className="p-6 w-full">
            <Text className=" py-1 text-xs font-medium   text-greenPrimary-100 ">
              Whale Limit Rule
            </Text>
            <div className="flex gap-3 ">
              <div className="w-1/2">
                <Select
                  options={limitTypeOptions}
                  value={selectedLimitType}
                  onChange={(value) => setSelectedLimitType(value as string)}
                  placeholder="Select type"
                  className="w-full bg-white dark:bg-greenPrimary-200 rounded-md dark:text-white text-greenPrimary-700"
                  dropdownClassName="w-full"
                  selectClassName='border dark:!border-greenPrimary-300 border-none rounded-md !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none'
                />
              </div>
              <div className="w-1/2">
                <Input
                  type="text"
                  placeholder={
                    selectedLimitType === 'percentage'
                      ? 'Enter percentage'
                      : 'Enter amount'
                  }
                  value={whaleLimit}
                  onChange={(e) => setWhaleLimit(e.target.value)}
                  className="w-full dark:[&_input::placeholder]:text-white ring-0 border-none focus:ring-0 [&_input]:rounded-r-none "
                  inputClassName="placeholder:text-white bg-white dark:bg-greenPrimary-200 border dark:!border-greenPrimary-300 border-none  !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none"
                  suffix={
                    selectedLimitType === 'percentage' ? (
                      <div className="h-full rounded-none border-l border-gray-200 px-3 flex items-center">
                        %
                      </div>
                    ) : (
                      <CoinSelector
                        selectedCoin={whaleLimitCoin}
                        setSelectedCoin={setWhaleLimitCoin}
                      />
                    )
                  }
                />
              </div>
            </div>
          </div>
       

        <div className="border-t border-white dark:border-greenPrimary-200 my-2"></div>

        <div className="my-6 px-6">
          <Button
            className="!bg-yellow-primary w-full !hover:bg-yellow-600 text-greenPrimary-secodarydark font-semibold px-6"
            onClick={handleSave}
          >
            Save All Cap Settings
          </Button>
        </div>
      </div>
      </CustomWidgetCard>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default OverView