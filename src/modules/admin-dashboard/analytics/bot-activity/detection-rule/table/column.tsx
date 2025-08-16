// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { FiEdit } from 'react-icons/fi';
import { GrFormView } from 'react-icons/gr';
import { PiDotsSixBold } from 'react-icons/pi';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('order', {
        header: 'Order',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm flex items-center gap-2 font-medium">
                   <PiDotsSixBold className='w-5 h-5' /> {row.order}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('ruleName', {
        header: 'Rule Name',
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.ruleName}
                </Text>
            )
        },   


    }),
    columnHelper.accessor('criteria', {
        header: 'Criteria',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.criteria}</Text>
        },
    }),
    columnHelper.accessor('ruleAction', {
        header: 'Rule Action',
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.ruleAction}</Text>
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
            return( 
               
            <Text className='flex justify-center gap-2 items-center w-full'>
                <GrFormView size={24} className='' />
                <FiEdit />
                </Text>)
        },
    }),
]



