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
        size: 200,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.timestamp}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('eventType', {
        header: 'Event Type',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.eventType}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('initiator', {
        header: 'Initiator',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.initiator}</Text>
        },
    }),
    columnHelper.accessor('details', {
        header: 'Details',
        size: 100,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-left text-sm font-medium w-full'>{row.details}</Text>
        },
    }),
   
   
]



