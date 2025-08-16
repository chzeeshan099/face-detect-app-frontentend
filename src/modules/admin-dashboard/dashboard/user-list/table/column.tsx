// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { FiEdit } from 'react-icons/fi';
import { GrFormView } from 'react-icons/gr';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('userId', {
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
    columnHelper.accessor('username', {
        header: 'Username',
        size: 150,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.username}
                </Text>
            )
        },


    }),
    columnHelper.accessor('email', {
        header: 'Email',
        size: 200,

        cell: info => {
            const row = info.row.original
            return <Text className=' text-sm font-medium'>{row.email}</Text>
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        size: 150,

        cell: info => {
            const row = info.row.original
            return <Text className=' text-sm font-medium'>{row.status}</Text>
        },
    }),



    columnHelper.accessor('registrationDate', {
        header: 'Registration Date',
        size: 150,

        cell: info => {
            const row = info.row.original
            return <Text className=' text-sm font-medium'>{row.registrationDate}</Text>
        },
    }),
    columnHelper.accessor('lastActivity', {
        header: 'Last Activity',
        size: 150,

        cell: info => {
            const row = info.row.original
            return <Text className=' text-sm font-medium'>{row.lastActivity}</Text>
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



