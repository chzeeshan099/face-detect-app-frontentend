'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import FileUpload from './upload';
import { Button, Input, Text } from 'rizzui';
import CommunityVoting from './community-voting';
import Chat from '@/components/chat/chat';
import TopContributor from './Top-Contributor';


const formSchema = z.object({
    caption: z.string().min(1, "This field is required").max(120, 'Max 120 characters'),
    images: z.array(
        z.object({
            id: z.string(),
            file: z.instanceof(File),
            preview: z.string(),
            progress: z.number(),
        })
    ).min(1, 'Please upload at least one image'),
});

type FormData = {
    caption?: string;
    images: any[];
};

const MuttArmy = () => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            images: [],
        },
    });

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
    };

    return (
        <>
           <Text className="text-2xl py-4 font-bold text-gray-800 dark:text-gray-800">$Mutt Army Hubb</Text>
            <CustomWidgetCard title="Meme Upload" shadow="left">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-4 mt-2">
                        <div className='relative mb-8'>
                            <FileUpload
                                control={control}
                                setValue={setValue}
                                name="images"
                                errors={errors}
                                value={[]}
                            />
                            <div className='absolute -bottom-6'>
                                {errors.images && <p className="text-red-500">{errors.images.message}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <Controller
                                name="caption"
                                control={control}
                                
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Caption"
                                       
                                        inputClassName="w-full bg-white dark:bg-greenPrimary-200 !border-none dark:!border-greenPrimary-300 !shadow-none !ring-0 focus:ring-0 focus:shadow-none rounded-md p-2 text-gray-900 dark:text-white placeholder-gray-1100 dark:placeholder-white" 
                                    />
                                )}
                            />
                            {errors.caption && (
                                <p className="text-red-500">{errors.caption.message}</p>
                            )}
                            <Text className='text-xs font-normal py-1 text-gray-1100'>Keep captions short and fun. Max 120 characters per meme.</Text>
                        </div>


                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="!bg-yellow-primary !hover:bg-yellow-primary text-gray-900 font-medium py-2 px-4 rounded-md dark:text-greenPrimary-secodarydark"
                            >
                                Wallet Signature
                            </Button>
                        </div>
                    </div>
                </form>
            </CustomWidgetCard>
            <CommunityVoting/>
            <div className='flex md:flex-row flex-col gap-4'>
            <TopContributor/>
            <Chat/>
            
            </div>
        </>
    );
};

export default MuttArmy;
