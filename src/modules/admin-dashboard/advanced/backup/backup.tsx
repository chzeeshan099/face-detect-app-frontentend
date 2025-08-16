import CustomWidgetCard from '@/components/cards/custom-widget-card'
import FileUpload from './upload'
import React from 'react'
import { Button, Text } from 'rizzui'
import { useForm } from 'react-hook-form'

const Backup = () => {
    const { control, setValue, formState: { errors } } = useForm();

    return (
        <>
            <CustomWidgetCard title="Backup & Restore" shadow='right' className='w-full'>
                <div className='flex justify-between items-center px-4 mt-4 py-2 '>
                    <Text className='text-base font-bold text-white'> Download Backup </Text>
                    <Button className='!bg-yellow-primary !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6'> Download </Button>
                </div>
                
                <div className='px-4 my-3 border-t'>
                    <Text className='text-base text-center font-bold text-white my-3'> Restore Data </Text>
                    <FileUpload
                        control={control}
                        setValue={setValue}
                        name="images"
                        errors={errors}
                        value={[]}
                    />
                    <Button className='!bg-yellow-primary !hover:bg-yellow-primary text-greenPrimary-secodarydark font-semibold px-6 w-full'> Download </Button>
                </div>
            </CustomWidgetCard>
        </>
    )
}

export default Backup