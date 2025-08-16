// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('title', {
        header: 'Proposal Title',
        size: 400,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-semibold">
                    {row.title}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-semibold">
                    {row.status}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('voteFor', {
        header: 'Vote For',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.voteFor}</Text>
        },
    }),
    columnHelper.accessor('voteAgainst', {
        header: 'Vote Against',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.voteAgainst}</Text>
        },
    }),


    
    columnHelper.accessor('voteAbstained', {
        header: 'Vote Abstained',
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.voteAbstained}</Text>
        },
    }),
]



