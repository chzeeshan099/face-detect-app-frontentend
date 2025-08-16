// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line, RiFileCopyLine } from 'react-icons/ri';
import { Text } from 'rizzui';
import { useState } from 'react';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}

const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('action name ', {
        header: () => (
            <Text className="text-greenPrimary-100">
              Action Name 
            </Text>
        ),
        size: 300,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.actionname}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('timestamp', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Time Stamp
            </Text>
        ),
        size: 300,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.timestamp}
                </Text>
            )
        },   
    }),
    columnHelper.accessor('hash', {
        header: () => (
            <Text className="text-greenPrimary-100 ">
                Hash
            </Text>
        ),
     size: 350, 
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            const truncatedHash = row.hash ? `${row.hash.substring(0, 4)}...${row.hash.substring(row.hash.length - 6)}` : '';
            const [copied, setCopied] = useState(false);
            
            const handleCopyHash = () => {
                if (row.hash) {
                    navigator.clipboard.writeText(row.hash)
                        .then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy hash: ', err);
                        });
                }
            };
            
            return (
                <>
                    <div className='flex items-center gap-2'>
                        <Text className='text-left text-sm font-medium'>{truncatedHash}</Text>
                        <div className='flex items-center gap-1'>
                            <Text className='dark:text-white text-gray-950'>
                                <RiFileCopyLine 
                                    className='w-4 h-4 cursor-pointer' 
                                    title="Copy full hash" 
                                    onClick={handleCopyHash}
                                />
                            </Text>
                            {copied && <span className='text-xs text-green-500'>Copied</span>}
                        </div>
                    </div>
                </>
            )
        },
    }),
    columnHelper.accessor('triggeredby', {
        header: () => (
            <Text className="text-greenPrimary-100">
          Triggered By
            </Text>
        ),
        size: 100,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-left text-sm font-medium'>{row.triggeredby}</Text>
        },
    }),
   
]



