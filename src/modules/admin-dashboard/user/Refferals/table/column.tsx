import { createColumnHelper } from '@tanstack/react-table'
import { Text } from 'rizzui';

const columnHelper = createColumnHelper<any>()

export const getProposalColumns = () => {

    return [
        columnHelper.accessor('walletAddress', {
            header: 'Wallet Address',
            size: 80,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text className="text-sm text-left font-medium ">
                        {row.WalletAddress}
                    </Text>
                );
            },
        }),

        columnHelper.accessor('joinedDate', {
            header: 'Joined Date',
            size: 80,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text className="text-sm text-left font-medium">
                        {row.JoinedDate}
                    </Text>
                );
            },
        }),
        columnHelper.accessor('contribution', {
            header: 'Contribution',
            size: 80,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm text-left font-medium">{row.Contribution}</Text>;
            },
        }),

        columnHelper.accessor('bonusEarned(TKN)', {
            header: 'Bonus Earned (TKN)',
            size: 80,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm text-left font-medium">{row.BonusEarnedTKN}</Text>;
            },
        }),
      
    ];
};
