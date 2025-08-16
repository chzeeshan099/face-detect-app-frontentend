'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React, { useState } from 'react'
import { Button, Text } from 'rizzui'
import EmergencyActivePause from './active-pause-model'

const EmergencyControl = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [modalType, setModalType] = useState<'emergency' | 'maintenance'>('emergency')

    const handleOpenModal = (type: 'emergency' | 'maintenance') => {
        setModalType(type)
        setModalOpen(true)
    }

    return (
        <>
            <CustomWidgetCard title='Emergency Control' shadow='left' className='w-full '>
                <div className='flex justify-between items-center p-4'>
                    <div className=''>
                        <Text className='text-sm font-semibold text-greenPrimary-1000  dark:text-white'>
                            <span className='text-xs text-greenPrimary-100'>Emergency Pause </span> On-Chain Contract
                        </Text>
                        <Text className='text-xs text-gray-1100 mt-2 max-w-xl'>
                            Immediately suspends ALL buy, claim, and potentially transfer functions in the smart contract. Requires admin action to unpause.
                        </Text>
                        <Text className='text-sm font-medium text-greenPrimary-100 mt-4'>Current Status</Text>
                        <Text className='text-base dark:text-white text-greenPrimary-1000'>Active</Text>
                    </div>
                    <Button 
                        className='!bg-yellow-primary hover:!bg-yellow-600 text-greenPrimary-secodarydark font-semibold'
                        onClick={() => handleOpenModal('emergency')}
                    >
                        Activate Emergency Pause
                    </Button>
                </div>
                <div className='w-full border-b dark:border-greenPrimary-200 border-white'></div>

                <div className='flex justify-between items-center p-4'>
                    <div className=''>
                        <Text className='text-sm font-semibold text-greenPrimary-1000  dark:text-white'>
                            <span className='text-xs text-greenPrimary-100'>Maintenance Mode </span> Frontend Only
                        </Text>
                        <Text className='text-xs text-gray-1100 mt-2 max-w-xl'>
                            Displays a maintenance message on the website/dApp, preventing NEW interactions via the frontend. Does NOT stop the smart contract itself.
                        </Text>
                        <Text className='text-sm font-medium text-greenPrimary-100 mt-4'>Current Status</Text>
                        <Text className='text-base dark:text-white text-greenPrimary-1000'>Active</Text>
                    </div>
                    <Button 
                        className='!bg-yellow-primary hover:!bg-yellow-600 text-greenPrimary-secodarydark font-semibold'
                        onClick={() => handleOpenModal('maintenance')}
                    >
                        Activate Maintenance Mode
                    </Button>
                </div>
            </CustomWidgetCard>

            <EmergencyActivePause 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                type={modalType}
            />
        </>
    )
}

export default EmergencyControl