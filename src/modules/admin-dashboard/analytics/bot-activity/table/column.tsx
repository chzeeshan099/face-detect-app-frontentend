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
    columnHelper.accessor('sourceIP', {
        header: 'Source IP',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.sourceIP}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('sourceIP', {
        header: 'Event Type',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.eventType}</Text>
        },
    }),
    columnHelper.accessor('detailsSummary', {
        header: 'Details Summary',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.detailsSummary}</Text>
        },
    }),


    
    columnHelper.accessor('actionTaken', {
        header: 'Action Taken',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.actionTaken}</Text>
        },
    }),
    columnHelper.accessor('logID', {
        header: 'Log ID',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.logID}</Text>
        },
    }),
   
]



