// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { RiLinkUnlinkM } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { Text } from 'rizzui';
import { AiOutlineLink } from "react-icons/ai";


interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('toolname ', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Tool Name
            </Text>
        ),
        size: 600,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.toolname}
                </Text>
            )
        },
    }),
    columnHelper.accessor('connectionstatus', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Connection Status
            </Text>
        ),
        size: 200,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.connectionstatus}
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
                    {row.connectionstatus === "Configuration Needed" ? (
                        <div className='flex gap-1'>
                            <Text className='text-center text-sm font-medium'><AiOutlineLink className='h-5 w-5 hover:text-blue-400 ' /></Text>
                            <Text className='text-center text-sm font-medium hover:text-yellow-300'><TfiReload className='h-5 w-5' /></Text>
                        </div>) :
                        (<Text className='text-center text-sm font-medium hover:text-blue-400'><RiLinkUnlinkM className='h-5 w-5' /></Text>)
                    }
                </>
            )
        },
    }),
]



