'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React, { useState } from 'react'
import { TbEdit } from 'react-icons/tb';
import { Button, Input, Text, Textarea } from 'rizzui';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FileUploadModal from './fileupload-model';
import { BsUpload } from 'react-icons/bs';
import Table from './table/table';

const configFormSchema = z.object({
  siteTitle: z.string().min(1, { message: 'Site title is required' }),
  disclaimers: z.string().min(1, { message: 'Disclaimers are required' }),
  contactEmail: z.string().email({ message: 'Please enter a valid email address' }),
  helpDesk: z.string().url({ message: 'Please enter a valid URL' }),
  logoImage: z.string().optional(),
});

type ConfigFormData = z.infer<typeof configFormSchema>;

const CurrentStatus = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [logoImage, setLogoImage] = useState('/money-mutt/logo-coin.svg');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Create state for form data that persists between edits
  const [formData, setFormData] = useState({
    siteTitle: 'My Presale Platform',
    disclaimers: 'Text Area for legal text',
    contactEmail: 'support@example.com',
    helpDesk: 'https://support.example.com',
    logoImage: '/money-mutt/logo-coin.svg'
  });

  const defaultValues: ConfigFormData = {
    siteTitle: formData.siteTitle,
    disclaimers: formData.disclaimers,
    contactEmail: formData.contactEmail,
    helpDesk: formData.helpDesk,
    logoImage: formData.logoImage
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ConfigFormData>({
    resolver: zodResolver(configFormSchema),
    defaultValues
  });

  const handleEdit = () => {
    reset({
      siteTitle: formData.siteTitle,
      disclaimers: formData.disclaimers,
      contactEmail: formData.contactEmail,
      helpDesk: formData.helpDesk,
      logoImage: formData.logoImage
    });
    setIsEditing(true);
  };

  const onSubmit = (data: ConfigFormData) => {
    const submittedData = {
      ...data,
      logoImage: logoImage
    };

    console.log('Form submitted with data:', submittedData);

    setFormData(submittedData);
    setIsEditing(false);
  };

  const handleUploadComplete = (file: string) => {
    if (file) {
      setLogoImage(file);
      setValue('logoImage', file);
      setFormData((prevData) => ({ ...prevData, logoImage: file }));
      console.log('Logo image updated:', file);
    }
  };

  return (
    <>
    <Text className="font-semibold text-2xl dark:text-white text-greenPrimary-secodarydark my-4">Platform Setting</Text>

      <CustomWidgetCard
        title="Referral & Reward Configuration"
        button={
          !isEditing
            ? {
              text: <TbEdit size={20} />,
              variant: 'text',
              onClick: handleEdit,
              className: 'bg-transparent dark:text-white',
            }
            : { text: '', variant: 'text', className: 'hidden' }
        }
        shadow="left"
        className="w-full"
      >
        <div className="p-4">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex md:flex-row flex-col items-center justify-between mb-4">
                <div className="md:w-1/6 flex justify-center items-center mr-4 relative">
                  <div className="relative h-[130px] w-[130px] rounded-full mt-2">
                    <Image
                      src={logoImage}
                      alt="Configuration Image"
                      width={100}
                      height={100}
                      className="rounded-full object-cover w-full h-full"
                    />
                    <div
                      className="absolute -top-2 -right-3 p-2 bg-white dark:bg-greenPrimary-200 shadow-sm z-50 rounded-full cursor-pointer"
                      onClick={() => setShowUploadModal(true)}
                    >
                      <BsUpload size={12} className="dark:text-white text-greenPrimary-700" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Text className="block text-sm font-medium mb-1.5 text-greenPrimary-100">Site Title</Text>
                      <Controller
                        name="siteTitle"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="text"
                              placeholder="Enter site title"
                              className="w-full bg-white dark:bg-greenPrimary-200 border-none rounded-lg"
                            />
                            {errors.siteTitle && (
                              <p className="text-red-500 text-xs mt-1">{errors.siteTitle.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div>
                      <Text className="block text-sm font-medium mb-1.5 text-greenPrimary-100">Disclaimers</Text>
                      <Controller
                        name="disclaimers"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              type="text"
                              {...field}
                              placeholder="Enter legal disclaimers"
                              className="w-full bg-white dark:bg-greenPrimary-200 border-none rounded-lg"
                            />
                            {errors.disclaimers && (
                              <p className="text-red-500 text-xs mt-1">{errors.disclaimers.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text className="block text-sm font-medium mb-1.5 text-greenPrimary-100">Contact Email</Text>
                      <Controller
                        name="contactEmail"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input

                              {...field}
                              type="email"
                              placeholder="Enter email"
                              className="w-full bg-white dark:bg-greenPrimary-200 border-none rounded-lg"
                            />
                            {errors.contactEmail && (
                              <p className="text-red-500 text-xs mt-1">{errors.contactEmail.message}</p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div>
                      <Text className="block text-sm font-medium mb-1.5 text-greenPrimary-100">Help Desk</Text>
                      <Controller
                        name="helpDesk"
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="url"
                              placeholder="Enter URL"
                              className="w-full bg-white dark:bg-greenPrimary-200 border-none rounded-lg"

                            />
                            {errors.helpDesk && (
                              <p className="text-red-500 text-xs mt-1">{errors.helpDesk.message}</p>
                            )}

                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  className="!bg-yellow-primary text-greenPrimary-700 dark:text-greenPrimary-1000 hover:bg-greenPrimary-800"
                >
                  Save All Changes
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex items-center md:flex-row flex-col gap-4 justify-between">
              <div className="md:w-1/6  items-center flex justify-center">
                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                  <Image
                    src={logoImage}
                    alt="Configuration Image"
                    width={100}
                    height={100}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="flex-1 gap-4 flex md:flex-row flex-col justify-between items-center">
                <div className=" w-full">
                  <Text className="text-sm font-medium text-greenPrimary-100">Site Title</Text>
                  <Text className="font-medium text-greenPrimary-700 dark:text-white">{formData.siteTitle}</Text>
                </div>

                <div className=" w-full">
                  <Text className="text-sm font-medium text-greenPrimary-100">Disclaimers</Text>
                  <Text className="text-greenPrimary-700 dark:text-white">{formData.disclaimers}</Text>
                </div>

                <div className="w-full">
                  <Text className="text-sm font-medium text-greenPrimary-100">Contact Email</Text>
                  <Text className="text-greenPrimary-700 dark:text-white">{formData.contactEmail}</Text>
                </div>

                <div className="w-full">
                  <Text className="text-sm font-medium text-greenPrimary-100">Help Desk</Text>
                  <Text className=" text-greenPrimary-700 dark:text-white">{formData.helpDesk}</Text>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=' border-t border-white dark:border-greenPrimary-200'>
          <div className='flex justify-between px-4 mt-4 '>
            <Text className='text-base font-bold text-greenPrimary-100'> Announcements <span className='text-base font-bold dark:text-white text-greenPrimary-1000'>(Visible on User Dashboard)</span></Text>
            <Button className='!bg-yellow-primary text-sm text-greenPrimary-secodarydark font-bold'>Add New</Button>
          </div>
          <div className=' mb-4'>
            <Table />
          </div>
        </div>
      </CustomWidgetCard>

      {showUploadModal && (
        <FileUploadModal
          projectId="logo"
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={(fileUrl: string) => {
            handleUploadComplete(fileUrl);
            setShowUploadModal(false);
          }}
        />
      )}
    </>
  )
}

export default CurrentStatus