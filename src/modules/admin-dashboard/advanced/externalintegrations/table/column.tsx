// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('name ', {
        header: () => (
            <Text className="text-greenPrimary-100">
              Name 
            </Text>
        ),
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.name}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('eventtype', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Event Type
            </Text>
        ),
        size: 100,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.eventType}
                </Text>
            )
        },   
    }),
    columnHelper.accessor('url', {
        header: () => (
            <Text className="text-greenPrimary-100 ">
                URL
            </Text>
        ),
     size: 100, 
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-left text-sm font-medium'>{row.url}</Text>
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
            return <Text className='text-left text-sm font-medium'>{row.status}</Text>
        },
    }),
    columnHelper.accessor('action', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Action
            </Text>
        ),
        size: 100,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <>
                    <div className='flex flex-row gap-3'>
                        <Text className='text-center text-sm font-medium'><RiDeleteBin5Line className='h-5 w-5 hover:text-red-400 ' /></Text>
                        <Text className='text-center text-sm font-medium hover:text-yellow-300'><FaRegEdit className='h-5 w-5' /></Text>
                    </div>
                </>
            )
        },
    }),
]



