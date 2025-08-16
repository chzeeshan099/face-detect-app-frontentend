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
    columnHelper.accessor('providername ', {
        header: () => (
            <Text className="text-greenPrimary-100">
              Provider Name 
            </Text>
        ),
        size: 600,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.providername}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('integrationstatus', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Integration Status
            </Text>
        ),
        size: 200,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.integrationstatus}
                </Text>
            )
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
                   { row.integrationstatus === "Configuration Needed" ? (
                        <div className='flex gap-1'>
                        <Text className='text-center text-sm font-medium'><IoSettingsOutline  className='h-5 w-5 hover:text-blue-400 ' /></Text>
                        <Text className='text-center text-sm font-medium hover:text-yellow-300'><LuEye className='h-5 w-5' /></Text>
                        </div>):
                        (<Text className='text-center text-sm font-medium hover:text-blue-400'><IoSettingsOutline className='h-5 w-5' /></Text>)
        }
                </>
            )
        },
    }),
]



