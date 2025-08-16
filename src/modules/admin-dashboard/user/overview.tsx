import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React from 'react'
import { Button, Text } from 'rizzui'

const Overview = () => {
    return (
        <>
            <CustomWidgetCard title='Overview' shadow='right' className="w-full">
                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <Text className="text-sm font-medium text-greenPrimary-100">Total Contributors</Text>
                        <Text className="text-base font-semibold text-greenPrimary-700 dark:text-white">2.5 BNB</Text>
                    </div>

                    <div>
                        <Text className="text-sm font-medium text-greenPrimary-100">Wallet Address</Text>
                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2'>
                            <Text className="text-base font-semibold text-greenPrimary-700 dark:text-white">REFCODE50
                            </Text>
                            <Text className="text-sm break-words w-full sm:w-auto">
                                Referred by: 0x987....6897
                            </Text>
                        </div>
                    </div>

                    <div>
                        <textarea
                            className="w-full p-2 border dark:border-greenPrimary-300 border-none rounded-sm bg-white resize-none
                            dark:bg-greenPrimary-200 dark:text-white text-greenPrimary-700"
                            placeholder="Admin Note.."
                        ></textarea>
                    </div>

                    <div className="flex justify-end items-center mt-7">
                        <Button className="!bg-yellow-primary hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6">
                            Add Note
                        </Button>
                    </div>
                </div>
            </CustomWidgetCard>
        </>
    )
}

export default Overview