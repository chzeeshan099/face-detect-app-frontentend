'use client';

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TbEdit } from 'react-icons/tb'
import { Button, Text, Input, Select } from 'rizzui'
import { z } from 'zod'
import External from './key';
import { FaAngleDown } from 'react-icons/fa';

const securitySchema = z.object({
  apiCalls: z.string().min(1, { message: 'API calls is required' }),
  whitelistIPs: z.string().optional(),
  provider: z.string().min(1, { message: 'Provider is required' }),
  transactionAttempts: z.string().min(1, { message: 'Transaction attempts is required' }),
  blacklistIPs: z.string().optional(),
  status: z.string().min(1, { message: 'Status is required' }),
});
type FormDataType = z.infer<typeof securitySchema>;

const SecuirtyConfig = () => {
  const [isEditing, setIsEditing] = useState(false)

  const defaultValues: FormDataType = {
    apiCalls: '100 | per min',
    whitelistIPs: 'text',
    provider: 'Cloudflare',
    transactionAttempts: '10 | per hour',
    blacklistIPs: 'text',
    status: 'Active',
  }

  const [formData, setFormData] = useState<FormDataType>(defaultValues)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm<FormDataType>({
    resolver: zodResolver(securitySchema),
    defaultValues: formData,
    mode: 'onChange'
  })

  const onSubmit = (data: FormDataType) => {
    console.log('Form submitted with:', data)
    setFormData(data)
    setIsEditing(false)
  }

  const handleEdit = () => {
    reset(formData)
    setIsEditing(true)
  }

  const handleCancel = () => {
    reset(formData)
    setIsEditing(false)
  }

  const getSelectedOption = (value: string, options: { value: string, label: string }[]) => {
    return options.find(option => option.value === value) || options[0];
  }

  const providerOptions = [
    { value: 'Cloudflare', label: 'Cloudflare' },
    { value: 'AWS', label: 'AWS' },
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-lightgray-primary dark:border dark:border-greenPrimary-300 rounded-xl relative dark:bg-dashBordCardsBG dark:bg-[url("/ellipse.svg")] bg-[url("/ellipse2.svg")] bg-top-left bg-no-repeat '
    >
      <div className="greenPrimary-300 border-t-0 border-l-0 border-r-0 dark:border-r-0 dark:border-t-0 dark:border-l-0 border border-b-white dark:border dark:border-b-greenPrimary-300 p-4 pb-4 flex justify-between items-center">
        <Text className="text-base font-bold dark:text-white">
          Security Configuration
        </Text>
        {!isEditing && (
          <TbEdit
            className='w-5 h-5 cursor-pointer'
            onClick={handleEdit}
          />
        )}
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
              API Calls (per min)
            </Text>
            {isEditing ? (
              <div>
                <input
                  {...register('apiCalls')}
                  className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300"
                />
                {errors.apiCalls && (
                  <p className="text-red-500 text-xs mt-1">{errors.apiCalls.message}</p>
                )}
              </div>
            ) : (
              <Text className="text-sm dark:text-white text-greenPrimary-700">
                {formData.apiCalls}
              </Text>
            )}
          </div>
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
              Whitelist IPs/CIDR (one per line)
            </Text>
            {isEditing ? (
              <div>
                <input
                  {...register('whitelistIPs')}
                  placeholder="Enter IP addresses (one per line)"
                  defaultValue={formData.whitelistIPs}
                  className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300"
                />
                {errors.whitelistIPs && (
                  <p className="text-red-500 text-xs mt-1">{errors.whitelistIPs.message}</p>
                )}
              </div>
            ) : (
              <Text className="text-sm dark:text-white text-greenPrimary-700">
                {formData.whitelistIPs || 'None specified'}
              </Text>
            )}
          </div>
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
              Provider
            </Text>
            {isEditing ? (
              <div>
                <Controller
                  control={control}
                  name="provider"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <div className="relative">
                        <select
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300 p-2 appearance-none pr-8"
                        >
                          {providerOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                          <FaAngleDown className="h-4 w-4 text-greenPrimary-700 dark:text-white" />
                        </div>
                      </div>
                      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                    </>
                  )}
                />
              </div>
            ) : (
              <Text className="text-sm dark:text-white text-greenPrimary-700">
                {formData.provider}
              </Text>
            )}
          </div>
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
              Transaction Attempts (per hr)
            </Text>
            {isEditing ? (
              <div>
                <input
                  {...register('transactionAttempts')}
                  className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300"
                />
                {errors.transactionAttempts && (
                  <Text className="text-red-500 text-xs mt-1">{errors.transactionAttempts.message}</Text>
                )}
              </div>
            ) : (
              <Text className="text-sm dark:text-white text-greenPrimary-700">
                {formData.transactionAttempts}
              </Text>
            )}
          </div>
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
              Blacklist IPs/CIDR (one per line)
            </Text>
            {isEditing ? (
              <div>
                <input
                  {...register('blacklistIPs')}
                  placeholder="Enter IP addresses (one per line)"
                  defaultValue={formData.blacklistIPs}
                  className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300"
                />
                {errors.blacklistIPs && (
                  <p className="text-red-500 text-xs mt-1">{errors.blacklistIPs.message}</p>
                )}
              </div>
            ) : (
              <Text className="text-sm dark:text-white text-greenPrimary-700">
                {formData.blacklistIPs || 'None specified'}
              </Text>
            )}
          </div>
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
              Status
            </Text>
            {isEditing ? (
              <div>
                <Controller
                  control={control}
                  name="status"
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <div className="relative">
                        <select
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200 w-full rounded-md border border-greenPrimary-300 p-2 appearance-none pr-8"
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                          <FaAngleDown className="h-4 w-4 text-greenPrimary-700 dark:text-white" />
                        </div>
                      </div>
                      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                    </>
                  )}
                />
              </div>
            ) : (
              <Text className="text-sm dark:text-white text-greenPrimary-700">
                {formData.status}
              </Text>
            )}
          </div>
        </div>
        {isEditing && (
          <div className='flex justify-end items-center mt-4'>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={`bg-yellow-primary ${!isValid ? 'opacity-70' : 'hover:bg-yellow-primary'} text-greenPrimary-secodarydark font-semibold px-6`}
            >
              {isSubmitting ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        )}
      </div>
      <External />
    </form>
  )
}

export default SecuirtyConfig
