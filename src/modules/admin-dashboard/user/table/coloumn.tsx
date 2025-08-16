import { createColumnHelper } from '@tanstack/react-table'
import { IoEyeOutline } from 'react-icons/io5';
import { Text } from 'rizzui';

const columnHelper = createColumnHelper<any>()

export const getProposalColumns = (onviewAcount: () => void) => {

    return [
        columnHelper.accessor('walletAddress', {
            header: 'Wallet Address',
            size: 400,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text className="text-sm font-medium">
                        {row.walletAddress}
                    </Text>
                );
            },
        }),
        columnHelper.accessor('emailUsername', {
            header: 'E-mail/Username',
            size: 100,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text className="text-sm font-medium">
                        {row.emailUsername}
                    </Text>
                );
            },
        }),
        columnHelper.accessor('kycStatus', {
            header: 'KYC Status',
            size: 100,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm font-medium">{row.kycStatus}</Text>;
            },
        }),
        columnHelper.accessor('accountStatus', {
            header: 'Account Status',
            size: 150,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm font-medium">{row.accountStatus}</Text>;
            },
        }),
        columnHelper.accessor('totalContribution', {
            header: 'Total Contribution',
            size: 150,
            cell: info => {
                const row = info.row.original;
                return <Text className="text-sm font-medium">{row.totalContribution}</Text>;
            },
        }),
        columnHelper.accessor('action', {
            header: 'Action',
            size: 150,
            cell: info => {
                const row = info.row.original;
                return (
                    <Text
                        className="cursor-pointer"
                        onClick={() => {
                            onviewAcount(); 
                        }}
                    >
                        <IoEyeOutline className="w-5 h-5" />
                    </Text >
                );
            },
        }),
    ];
};
