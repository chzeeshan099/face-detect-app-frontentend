'use client'

import { useState } from 'react'
import { FiEdit2, FiSave, FiCopy, FiCheck, FiChevronDown, FiEdit } from 'react-icons/fi'
import Image from 'next/image'
import { Text } from 'rizzui'
import { FaCheck } from 'react-icons/fa'
import { CiCircleInfo } from 'react-icons/ci'
import { RxCross2 } from 'react-icons/rx'
import SummaryCard from './summary-card'
import WalletConnection from './wallet-connection'
import ActiveBlockchain from './active-blockshain'
import Mytransaction from '@/components/others/my-transaction'
import CustomWidgetCard from '@/components/cards/custom-widget-card'

const avatarOptions = [
    '/money-mutt/dog-avatar1.svg',
    '/money-mutt/dog-avatar2.svg',
    '/money-mutt/dog-avatar.svg',
    '/money-mutt/dog-avatar4.svg',
    '/money-mutt/dog-avatar5.svg',
    '/money-mutt/dog-avatar6.svg',
    '/money-mutt/dog-avatar7.svg',
    '/money-mutt/dog-avatar8.svg',
    '/money-mutt/dog-avatar9.svg',

]

const MyKennel = () => {
    const ensDomain = 'mycoolname.eth'
    const ensAddress = '0xABCD1234EF5678901234567890ABCDEF12345678'
    const walletAddress = '0xABCD1234EF5678901234567890ABCDEF12345678'
    const initialName = 'CryptoPup'
    const initialAvatar = '/money-mutt/monkey-avatar.svg'

    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(initialName)
    const [tempName, setTempName] = useState(initialName)

    const [avatar, setAvatar] = useState(initialAvatar)
    const [tempAvatar, setTempAvatar] = useState(initialAvatar)

    const [copiedField, setCopiedField] = useState<null | 'ens' | 'wallet'>(null)
    const [showAvatarModal, setShowAvatarModal] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const truncateMiddle = (str: string, front: number = 6, back: number = 4) => {
        if (str.length <= front + back) return str
        return `${str.slice(0, front)}...${str.slice(-back)}`
    }
    const handleCopy = (value: string, field: 'ens' | 'wallet') => {
        navigator.clipboard.writeText(value)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 1500)
    }

    const handleSave = () => {
        setName(tempName)
        setAvatar(tempAvatar)
        setIsEditing(false)
    }

    const handleAvatarSelect = (src: string) => {
        setIsUploading(true)
        setTimeout(() => {
            setTempAvatar(src)
            setIsUploading(false)
            setShowAvatarModal(false)
        }, 1000)
    }

    return (
        <>
            <div className="bg-lightgray-primary dark:bg-greenPrimary-secodarydark border-white dark:border-greenPrimary-300 w-full rounded-lg dark:border mx-auto">
                <div className="flex justify-between p-3 border-b border-white dark:border-greenPrimary-300 items-center dark:bg-[url('/images/shadow-left.svg')]  bg-no-repeat bg-[length:200px_100px]">
                    <Text className="text-base text-center font-bold text-gray-800 dark:text-white">
                        Your Identity
                    </Text>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    >
                        {isEditing ? <FaCheck size={18} /> : <FiEdit size={18} />}
                    </button>
                </div>

                <div className="flex flex-col  w-11/12 p-4 sm:flex-row gap-6 items-center">
                    <div className="flex w-full gap-4 items-center  relative">
                        <div className=" relative">
                            <Image
                                src={isEditing ? tempAvatar : avatar}
                                alt="avatar"
                                width={100}
                                height={100}
                                className="rounded-md  object-cover"
                            />
                            {isUploading && (
                                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
                                    <div className="w-6 h-6 border-2 border-t-transparent border-gray-600 rounded-full animate-spin" />
                                </div>
                            )}
                            {isEditing && (
                                <button
                                    className="absolute -top-2 -right-2 p-1 bg-white dark:text-gray-800 dark:bg-greenPrimary-300 rounded-md"
                                    onClick={() => setShowAvatarModal(true)}
                                >
                                    <FiChevronDown size={16} />
                                </button>
                            )}
                        </div>
                        <div className="mt-3 mb-4">
                            {isEditing ? (
                                <input
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="dark:bg-greenPrimary-300 p-2 text-gray-800 rounded-md w-full  dark:text-white text-sm focus:outline-none focus:ring-0 focus:border-none border-none  mt-1"
                                    placeholder="Enter your name"
                                />
                            ) : (
                                <div>
                                    <Text className="text-sm font-medium text-greenPrimary-100">Nickname</Text>
                                    <Text className="text-sm font-normal text-gray-800">
                                        {name}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <Text className="text-sm font-medium text-greenPrimary-100 mb-1">ENS Domain</Text>
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-normal text-gray-800 truncate">{truncateMiddle(ensAddress)}</p>
                            <button
                                onClick={() => handleCopy(ensAddress, 'ens')}
                                className="text-xs transition"
                            >
                                {copiedField === 'ens' ? (
                                    <span className="text-green-500 font-medium">Copied</span>
                                ) : (
                                    <FiCopy size={16} className="text-gray-600 hover:text-greenPrimary-100" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="sm:text-right w-1/2">
                        <Text className="text-sm font-medium text-greenPrimary-100 mb-1">Wallet Address</Text>
                        <div className="flex items-center justify-start sm:justify-end gap-2">
                            <span className="text-gray-800 text-sm font-normal truncate">
                                {truncateMiddle(walletAddress)}
                            </span>
                            <button
                                onClick={() => handleCopy(walletAddress, 'wallet')}
                                className="text-xs transition"
                            >
                                {copiedField === 'wallet' ? (
                                    <span className="text-green-500 font-medium">Copied</span>
                                ) : (
                                    <FiCopy size={16} className="text-gray-600 hover:text-greenPrimary-100" />
                                )}
                            </button>

                        </div>
                    </div>

                </div>

                {showAvatarModal && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className=" p-6 rounded-lg bg-white dark:bg-greenPrimary-300 shadow-md max-w-sm w-full">
                            <div className='flex justify-between mb-4 items-center'>
                                <CiCircleInfo size={20} className='dark:text-white font-bold' />
                                <Text className="text-lg text-gray-800 dark:text-gray-800 text-center font-semibold ">Profile Images</Text>
                                <RxCross2
                                    size={18}
                                    className="dark:text-white font-bold hover:text-greenPrimary-100 transition cursor-pointer"
                                    onClick={() => setShowAvatarModal(false)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {avatarOptions.map((src) => (
                                    <Image
                                        key={src}
                                        src={src}
                                        alt="Avatar option"
                                        width={100}
                                        height={100}
                                        className="rounded-md cursor-pointer hover:scale-105 transition"
                                        onClick={() => handleAvatarSelect(src)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <SummaryCard />
            <div className='flex sm:flex-row flex-col gap-4'>
                <WalletConnection />
                <ActiveBlockchain />
            </div>
            <CustomWidgetCard title="My Transactions" shadow="left" className="mt-4">
                <Mytransaction />
            </CustomWidgetCard>
        </>
    )
}

export default MyKennel
