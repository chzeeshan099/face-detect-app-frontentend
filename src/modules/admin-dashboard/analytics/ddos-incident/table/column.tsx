// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { GrFormView } from 'react-icons/gr';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('startTime', {
        header: 'Start Time',
        size: 400,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.startTime}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('endTime', {
        header: 'End Time',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.endTime}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('attackType', {
        header: 'Attack Type',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.attackType}</Text>
        },
    }),
    columnHelper.accessor('duration', {
        header: 'Duration',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.duration}</Text>
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



