// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { FaRegEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuEye } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('title ', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Title
            </Text>
        ),
        size: 600,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.title}
                </Text>
            )
        },
    }),
    columnHelper.accessor('status', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Status
            </Text>
        ),
        size: 200,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.status}
                </Text>
            )
        },
    }),

    columnHelper.accessor('actions', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Actions
            </Text>
        ),
        size: 100,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <>
                    <div className='flex flex-row gap-3'>
                        <Text className='text-center text-sm '><RiDeleteBin5Line size={16} className=' hover:text-red-400 ' /></Text>
                        <Text className='text-center text-sm hover:text-yellow-300'><FaRegEdit size={16} className='' /></Text>
                    </div>


                </>
            )
        },
    }),
]



