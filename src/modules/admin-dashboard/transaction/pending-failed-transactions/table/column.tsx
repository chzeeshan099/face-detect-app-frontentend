// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { GrFormView } from 'react-icons/gr';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('walletAddress', {
        header: 'Wallet Address',
        size: 400,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.walletAddress}
                </Text>    
            )
        },
    }),
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
    columnHelper.accessor('transactionHash', {
        header: 'Transaction Hash',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.transactionHash}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('contributed', {
        header: 'Contributed',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.contributed}</Text>
        },
    }),
    columnHelper.accessor('Type', {
        header: 'Type',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.type}</Text>
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
    columnHelper.accessor('errorType', {
        header: 'Error Type',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.errorType}</Text>
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



