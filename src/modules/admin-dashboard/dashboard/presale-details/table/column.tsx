// TableColumns.js
import { createColumnHelper } from '@tanstack/react-table'
import { Text } from 'rizzui';

interface CustomMeta {
    align?: 'left' | 'center' | 'right';
}


const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => [
    columnHelper.accessor('timestamp', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Timestamp
            </Text>
        ),
        size: 100,
        cell: info => {
            const row = info.row.original
            return (
                <Text className="text-sm font-medium">
                    {row.timestamp}
                </Text>    
            )
        },
    }),
    columnHelper.accessor('participantid', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Participant ID
            </Text>
        ),
        size: 200,
        meta: { align: 'left' },
        cell: info => {
            const row = info.row.original
            return (
                <Text className=" text-left text-sm font-medium">
                    {row.ParticipantID}
                </Text>
            )
        },   
    }),
    columnHelper.accessor('amount', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Amount
            </Text>
        ),
        size: 100,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.amount}</Text>
        },
    }),
    columnHelper.accessor('voteAgainst', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Vote Against
            </Text>
        ),
        size: 300,
        meta: { align: 'center' },
        cell: info => {
            const row = info.row.original
            return <Text className='text-center text-sm font-medium'>{row.TokenReceived}</Text>
        },
    }),
    columnHelper.accessor('voteAbstained', {
        header: () => (
            <Text className="text-greenPrimary-100">
                Vote Abstained
            </Text>
        ),
        size: 200,
        meta: { align: 'left' },
        cell: info => {
            const row = info?.row?.original
            const transactionId = row.transactionId;
            const truncatedId = transactionId && transactionId?.length > 7 
                ? `${transactionId.slice(0, 4)}...${transactionId.slice(-6)}` 
                : transactionId;
            return <Text className='text-left text-sm font-medium'>{truncatedId}</Text>
        },
    }),
]



