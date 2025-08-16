import { FaArrowLeft } from 'react-icons/fa'
import { TbEdit } from 'react-icons/tb'
import { Text, Button, Input, Password } from 'rizzui'
import TransactionPage from './transaction-history'
import RefferalsPage from './Refferals'
import Overview from './overview'
import KycAml from './kyc-aml'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Define Zod schema for form validation
const accountFormSchema = z.object({
    walletAddress: z.string().min(1, 'Wallet Address is required'),
    accountStatus: z.string().min(1, 'Account Status is required'),
    joined: z.string().min(1, 'Join date is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    actions: z.string().optional()
});

type AccountFormData = z.infer<typeof accountFormSchema>;

const AccountDetails = ({ onBack }: { onBack: () => void }) => {
    const [isEditing, setIsEditing] = useState(false);

    const defaultValues: AccountFormData = {
        walletAddress: 'Moneymutt',
        accountStatus: 'Active',
        joined: 'March 24, 2025',
        password: '**********',
        actions: '-'
    };

    const [formData, setFormData] = useState<AccountFormData>(defaultValues);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm<AccountFormData>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: formData,
        mode: 'onChange'
    });

    const onSubmit = (data: AccountFormData) => {
        console.log('Form data submitted:', data);
        setFormData(data);
        setIsEditing(false);
    };

    const handleEdit = () => {
        reset(formData);
        setIsEditing(true);
    };

    const handleCancel = () => {
        reset(formData);
        setIsEditing(false);
    };

    return (
        <>
            <div className='my-5'>
                <Text className="text-2xl font-semibold dark:text-white flex items-center gap-5">
                    <button onClick={onBack}>
                        <FaArrowLeft />
                    </button>
                    Account Details
                </Text>
                <div
                    className='bg-lightgray-primary dark:border dark:border-greenPrimary-300 rounded-xl relative dark:bg-dashBordCardsBG dark:bg-[url("/ellipse.svg")] bg-[url("/ellipse2.svg")] bg-top-left bg-no-repeat mt-5'
                >
                    <div className="greenPrimary-300 border-t-0 border-l-0 border-r-0 dark:border-r-0 dark:border-t-0 dark:border-l-0 border border-b-white dark:border dark:border-b-greenPrimary-300 p-4 pb-4 flex justify-between items-center">
                        <Text className="text-base font-bold dark:text-white">
                            Your Identity
                        </Text>
                        {!isEditing && (
                            <TbEdit
                                className='w-5 h-5 cursor-pointer'
                                onClick={handleEdit}
                            />
                        )}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                <div>
                                    <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
                                        Wallet Address
                                    </Text>
                                    {isEditing ? (
                                        <div>
                                            <Input
                                                type="text"
                                                {...register('walletAddress')}
                                                className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200"
                                            />
                                            {errors.walletAddress && (
                                                <p className="text-red-500 text-xs mt-1">{errors.walletAddress.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <Text className="text-sm dark:text-white text-greenPrimary-700">
                                            {formData.walletAddress}
                                        </Text>
                                    )}
                                </div>
                                <div>
                                    <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
                                        Account Status
                                    </Text>
                                    {isEditing ? (
                                        <div>
                                            <Input
                                                type="text"
                                                {...register('accountStatus')}
                                                className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200"
                                            />
                                            {errors.accountStatus && (
                                                <p className="text-red-500 text-xs mt-1">{errors.accountStatus.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <Text className="text-sm dark:text-white text-greenPrimary-700">
                                            {formData.accountStatus}
                                        </Text>
                                    )}
                                </div>
                                <div>
                                    <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
                                        Joined
                                    </Text>
                                    {isEditing ? (
                                        <div>
                                            <Input
                                                type="text"
                                                {...register('joined')}
                                                className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200"
                                            />
                                            {errors.joined && (
                                                <p className="text-red-500 text-xs mt-1">{errors.joined.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <Text className="text-sm dark:text-white text-greenPrimary-700">
                                            {formData.joined}
                                        </Text>
                                    )}
                                </div>
                                <div>
                                    <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
                                        Password
                                    </Text>
                                    {isEditing ? (
                                        <div>
                                            <Controller
                                                control={control}
                                                name="password"
                                                render={({ field, fieldState: { error } }) => (
                                                    <>
                                                        <Password
                                                            {...field}
                                                            className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200"
                                                        />
                                                        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    ) : (
                                        <Text className="text-sm dark:text-white text-greenPrimary-700">
                                            {formData.password}
                                        </Text>
                                    )}
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <Text className="text-sm font-medium text-greenPrimary-100 mb-1">
                                        Actions
                                    </Text>
                                    {isEditing ? (
                                        <div>
                                            <Input
                                                type="text"
                                                {...register('actions')}
                                                className="text-sm dark:text-white text-greenPrimary-700 dark:bg-greenPrimary-200"
                                            />
                                            {errors.actions && (
                                                <p className="text-red-500 text-xs mt-1">{errors.actions.message}</p>
                                            )}
                                        </div>
                                    ) : (
                                        <Text className="text-sm dark:text-white text-greenPrimary-700">
                                            {formData.actions}
                                        </Text>
                                    )}
                                </div>
                            </div>
                            {isEditing && (
                                <div className='flex flex-col sm:flex-row sm:justify-end items-center gap-3 mt-4'>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancel}
                                        className="border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 font-semibold px-6 w-full sm:w-auto"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!isValid || isSubmitting}
                                        className={`!bg-yellow-primary ${!isValid ? 'opacity-70' : 'hover:bg-yellow-primary'} text-greenPrimary-secodarydark font-semibold px-6 w-full sm:w-auto`}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Save All Changes'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Overview />
                <KycAml />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TransactionPage />
                <RefferalsPage />
            </div>
        </>
    )
}

export default AccountDetails