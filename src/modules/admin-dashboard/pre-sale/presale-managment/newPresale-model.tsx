import React, { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Input, Text, Checkbox, Button, Modal } from 'rizzui';
import { Select } from 'rizzui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface NewPresaleModelProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: PresaleFormData) => void;
}

const presaleSchema = z.object({
  stageName: z.string().min(1, { message: 'Stage name is required' }),
  stageType: z.string().min(1, { message: 'Stage type is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  maxContributionPerToken: z
    .string()
    .min(1, { message: 'Max contribution per token is required' }),
  maxContributionForStage: z
    .string()
    .min(1, { message: 'Max contribution for this stage is required' }),
  minContributionPerUser: z
    .string()
    .min(1, { message: 'Min contribution per user is required' }),
  maxContributionPerUser: z
    .string()
    .min(1, { message: 'Max contribution per user is required' }),
  requireKYC: z.boolean().default(false),
});

type PresaleFormData = z.infer<typeof presaleSchema>;

const NewPresaleModel: React.FC<NewPresaleModelProps> = ({
  isModalOpen,
  onClose,
  onSubmit,
}) => {
  const options = [
    { label: 'Private Sale', value: 'private' },
    { label: 'Seed Round', value: 'seed' },
    { label: 'Public Sale', value: 'public' },
    { label: 'Strategic Round', value: 'strategic' },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PresaleFormData>({
    resolver: zodResolver(presaleSchema),
    defaultValues: {
      stageName: '',
      stageType: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      maxContributionPerToken: '',
      maxContributionForStage: '',
      minContributionPerUser: '',
      maxContributionPerUser: '',
      requireKYC: false,
    },
  });

  useEffect(() => {
    if (!isModalOpen) {
      reset();
    }
  }, [isModalOpen, reset]);

  const handleFormSubmit = (data: PresaleFormData) => {
    console.log('Form submitted:', data);
    if (onSubmit) {
      onSubmit(data);
    }
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose} size="lg" className="">
      <div className="primary-white relative rounded-md p-3 dark:bg-greenPrimary-200 md:p-4">
        <Text className="mt-2 text-center text-sm font-medium text-greenPrimary-100 dark:text-white md:mt-3 md:text-base">
          Add New Presale Stage
        </Text>
        <div className="absolute right-3 top-4 md:right-4 md:top-7">
          <RxCross2
            size={20}
            className="cursor-pointer text-gray-950  dark:text-white"
            onClick={onClose}
          />
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-6 flex w-full flex-col gap-3 md:mt-9 md:flex-row md:gap-4">
            <Controller
              name="stageName"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    placeholder="Stage name/ Identifier"
                    className="w-full"
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none  "
                  />
                  {errors.stageName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.stageName?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="stageType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="w-full">
                  <Select
                    options={options}
                    value={
                      options.find((option) => option.value === value) || null
                    }
                    onChange={(option: any) => onChange(option?.value || '')}
                    className=" w-full"
                    selectClassName="!border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950"
                  />
                  {errors.stageType && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.stageType?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-3 flex flex-col gap-3 md:mt-4 md:flex-row md:gap-4">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    type="date"
                    label="Start Date "
                    className="w-full"
                    labelClassName="dark:text-white text-gray-950 text-xs md:text-sm"
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.startDate?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    type="time"
                    label="Start Time"
                    className="w-full"
                    labelClassName="dark:text-white text-gray-950 text-xs md:text-sm"
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.startTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.startTime?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-3 flex flex-col gap-3 md:mt-4 md:flex-row md:gap-4">
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    type="date"
                    label="End Date"
                    className="w-full"
                    labelClassName="dark:text-white text-gray-950 text-xs md:text-sm"
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.endDate?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="endTime"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    type="time"
                    label="End Time"
                    className="w-full"
                    labelClassName="dark:text-white text-gray-950 text-xs md:text-sm"
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.endTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.endTime?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-3 md:mt-4">
            <Controller
              name="maxContributionPerToken"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Enter token price"
                    className="w-full"
                    suffix={
                      <span className="flex items-center gap-1 md:gap-2 ">
                        |
                        <span className="items-center text-xs font-semibold text-gray-950 dark:text-white md:text-sm">
                          Per Token
                        </span>
                      </span>
                    }
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.maxContributionPerToken && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.maxContributionPerToken?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-3 md:mt-4">
            <Controller
              name="maxContributionForStage"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Token allocation"
                    className="w-full"
                    suffix={
                      <span className="flex items-center gap-1 md:gap-2 ">
                        |
                        <span className="items-center text-xs font-semibold text-gray-950 dark:text-white md:text-sm">
                          For this Stage
                        </span>
                      </span>
                    }
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.maxContributionForStage && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.maxContributionForStage?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-3 flex flex-col gap-3 md:mt-4 md:flex-row md:gap-4">
            <Controller
              name="minContributionPerUser"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    placeholder="Min. contribution"
                    className="w-full"
                    suffix={
                      <span className="flex items-center gap-1 md:gap-2 ">
                        |
                        <span className="items-center text-xs font-semibold text-gray-950 dark:text-white md:text-sm">
                          Per User
                        </span>
                      </span>
                    }
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.minContributionPerUser && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.minContributionPerUser?.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="maxContributionPerUser"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <Input
                    {...field}
                    placeholder="Max. contribution"
                    className="w-full"
                    suffix={
                      <span className="flex items-center gap-1 md:gap-2 ">
                        |
                        <span className="items-center text-xs font-semibold text-gray-950 dark:text-white md:text-sm">
                          Per User
                        </span>
                      </span>
                    }
                    inputClassName="dark:bg-greenPrimary-secodarydark bg-primary-lightyellow dark:text-white text-gray-950 !border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none "
                  />
                  {errors.maxContributionPerUser && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.maxContributionPerUser?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-3 md:mt-4">
            <Controller
              name="requireKYC"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  label="Require KYC/AML"
                  size='sm'
                  checked={value}
                  onChange={onChange}
                  className="text-gray-950 dark:text-white"
                  labelClassName="dark:text-white text-gray-950 text-xs md:text-sm"
                />
              )}
            />
          </div>

          <div className="mt-4 flex flex-col justify-end gap-2 sm:flex-row md:mt-6 md:gap-3">
            <Button
              type="button"
              onClick={handleClose}
              className="!hover:text-white w-full border-gray-500 text-xs text-gray-950 dark:!bg-transparent  bg-white hover:bg-gray-100 dark:text-white md:text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="solid"
              className="!hover:bg-yellow-primary w-full border-none !bg-yellow-primary text-xs text-gray-950 dark:text-gray-950 md:text-sm"
            >
              Add Stage
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewPresaleModel;
