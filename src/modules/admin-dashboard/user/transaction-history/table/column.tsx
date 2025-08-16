import { createColumnHelper } from '@tanstack/react-table'
import { Text } from 'rizzui';

const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => {

    return [
        columnHelper.accessor('Timestamp', {
            header: 'Timestamp',
            size: 400,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text className="text-sm font-medium">
                        {row.Timestamp}
                    </Text>
                );
            },
        }),
        columnHelper.accessor('Type', {
            header: 'Type',
            size: 100,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text className="text-sm font-medium">
                        {row.Type}
                    </Text>
                );
            },
        }),
        columnHelper.accessor('Amount', {
            header: 'Amount',
            size: 100,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm font-medium">{row.Amount}</Text>;
            },
        }),
        columnHelper.accessor('Status', {
            header: 'Status',
            size: 150,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm font-medium">{row.Status}</Text>;
            },
        }),
    ];
};