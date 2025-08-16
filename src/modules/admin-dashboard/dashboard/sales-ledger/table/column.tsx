// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { GrFormView } from 'react-icons/gr';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('timestamp', {
        header: 'Timestamp',
        size: 400,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.timestamp}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('user ID', {
        header: 'User ID',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.userId}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('amount', {
        header: 'Amount',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.amount}</Text>
        },
    }),
    columnHelper.accessor('token', {
        header: 'Token',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.token}</Text>
        },
    }),


    
    columnHelper.accessor('status', {
        header: 'Status',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.status}</Text>
        },
    }),
    columnHelper.accessor('transactionID', {
        header: 'Transaction ID',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.transactionId}</Text>
        },
    }),
    columnHelper.accessor('action', {
        header: 'Action',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='flex justify-center items-center w-full'><GrFormView className='w-5 h-5'/></Text>
        },
    }),
]



