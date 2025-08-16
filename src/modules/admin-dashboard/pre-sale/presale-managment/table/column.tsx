// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { FiEdit } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('name', {
        header: () => (
            <Text className="text-greenPrimary-100">
               Name
            </Text>
        ),
        size: 150,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.name}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('status', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Status
            </Text>
        ),
        size: 150,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.status}
                </Text>
            )
        },   
    }),
    columnHelper.accessor('starttrigger', {
        header: () => (
            <Text className="text-greenPrimary-100">
               Start Trigger
            </Text>
        ),
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.starttrigger}</Text>
        },
    }),
    columnHelper.accessor('endtrigger', {
        header: () => (
            <Text className="text-greenPrimary-100">
                End Trigger
            </Text>
        ),
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.endtrigger}</Text>
        },
    }),
    columnHelper.accessor('pricing', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Pricing
            </Text>
        ),
        size: 150,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.Pricing}</Text>
        },
    }),
    columnHelper.accessor('pricing', {
        header: () => (
            <Text className="text-greenPrimary-100">
               Action
            </Text>
        ),
        size: 100,
      
        cell: info => {
            const row = info.row.original
            return (
              <>
              
                {row.status === 'End' && (
                  <Text className=' text-sm font-medium'><LuEye className='w-4 h-4 hover:text-blue-400 cursor-pointer' /></Text>
                ) }
                {row.status === 'Active' && (
                  <Text className=' text-sm font-medium'><FiEdit className='w-4 h-4 hover:text-yellow-300 cursor-pointer'/></Text>
                )}
                {row.status === 'Up Coming' && (
                    <>
                    <div className='flex gap-2 '>
                  <Text className='text-center text-sm font-medium'><FiEdit className='w-4 h-4 hover:text-yellow-300 cursor-pointer' /></Text>
                  <Text className='text-center text-sm font-medium'><RiDeleteBin6Line className='w-4 h-4 hover:text-red-500 cursor-pointer' /></Text>
                  </div>
                  </>
                )}
              </>
                  
           
        )
        },
    }),
    

]



