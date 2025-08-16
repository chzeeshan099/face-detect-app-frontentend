'use client'
import Image from 'next/image';
import React from 'react';
import { Button, Input, Text, Textarea, Tooltip } from 'rizzui';
import ReactSelect from '@/components/react-select/react-select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proposalSchema, ProposalFormValues } from '@/schema/proposal-schema';
import CustomWidgetCard from '@/components/cards/custom-widget-card';
import Table from './table/table';
import Listofproposals from '../listofproposals';
import CustomTooltip from '@/components/custom-tooltip/custom-tooltip';


const contactCategoryOptions = [
    { label: "Category 1", value: "category1" },
    { label: "Category 2", value: "category2" },
    { label: "Category 3", value: "category3" },
    { label: "Category 4", value: "category4" },

];

const Proposal = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<ProposalFormValues>({
        resolver: zodResolver(proposalSchema),
    });

    const onSubmit = (data: ProposalFormValues) => {
        console.log("Validated Data:", data);
    };

    return (
        <>
         <Text className="text-2xl py-2 font-bold text-gray-800 dark:text-gray-800">Governance</Text>
         <p className='text-gray-800 pb-4 text-sm font-normal dark:text-gray-800'>Participate in decentralized decision-making. Submit proposals, vote on active initiatives, and review past outcomes.</p>
            <CustomWidgetCard title="Submit New Proposal" shadow='left'>
                <div className='p-4'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 text-gray-1200 dark:text-gray-1100 text-sm'>
                        <div className='relative'>
                            <input
                                type='text'
                                {...register('title')}
                                placeholder="Proposal title"
                               className='appearance-none border-none shadow-none ring-0 focus:ring-0 focus:shadow-none bg-white dark:bg-greenPrimary-200 text-gray-1200 dark:text-gray-1100 text-sm w-full p-3 rounded-md placeholder:gray-1100'
                            />
                            {errors.title && <Text className="text-red-500 text-xs absolute -bottom-5">{errors.title.message}</Text>}
                        </div>

                        <div className='relative'>
                            <textarea
                                {...register('description')}
                                placeholder="Proposal description"
                                className="w-full h-32 p-3 rounded-md border-none shadow-none focus:shadow-none bg-white dark:bg-greenPrimary-200 !text-gray-1200 dark:!text-gray-1100 resize-none [&::placeholder]:text-gray-500 [&::placeholder]:opacity-100 text-sm"
                            />
                            {errors.description && <Text className="text-red-500 text-xs absolute -bottom-4">{errors.description.message}</Text>}
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 -mt-1'>
                            <div className='relative'>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <ReactSelect
                                                {...field}
                                                isLoading={false}
                                                options={contactCategoryOptions}
                                                placeholder="Choose Category"
                                                 components={{ IndicatorSeparator: () => null }}
                                            />
                                            {errors.category && (
                                                <Text className="text-red-500 text-xs font-bold absolute -bottom-4">
                                                    {errors.category.message}
                                                </Text>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <div className='relative'>
                                <Input
                                    type="date"
                                    {...register('date')}
                                    inputClassName="appearance-none border-none shadow-none ring-0 focus:ring-0 focus:shadow-none bg-white dark:bg-greenPrimary-200  text-gray-1200 dark:text-gray-1100 !placeholder-white text-sm"
                                />
                                {errors.date && <Text className="text-red-500 text-xs absolute -bottom-5">{errors.date.message}</Text>}
                            </div>
                        </div>

                        <div className='flex items-center justify-end'>
                            <CustomTooltip content="Sign with your connected wallet to authenticate this proposal." position='left'>
                                <Button
                                    type="submit"
                                    className='bg-yellow-primary text-dashBordCardsBG font-bold text-xs sm:text-sm hover:bg-yellow-primary hover:dark:bg-yellow-primary'
                                >
                                    Wallet Signature
                                </Button>
                            </CustomTooltip>
                        </div>
                    </form>
                </div>
            </CustomWidgetCard>
            
            < Listofproposals />

            {/* Table Section */}
            <Table />

        </>
    );
};

export default Proposal;
