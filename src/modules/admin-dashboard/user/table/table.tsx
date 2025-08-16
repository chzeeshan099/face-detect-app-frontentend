import React from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './coloumn';
import { userdata } from '@/constants/admindashboard';

interface TableProps {
    selectedToken: string;
    selectedStatus: string;
    searchQuery: string;
    onviewAcount: () => void;
}

const Table = ({ selectedToken, selectedStatus, searchQuery, onviewAcount }: TableProps) => {
    const filteredData = userdata.filter((item) => {
        const matchesToken =
            selectedToken === 'all' || item.accountStatus === selectedToken;
        const matchesStatus =
            selectedStatus === 'all' || item.kycStatus === selectedStatus;
        const matchesSearch =
            !searchQuery ||
            item.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.emailUsername.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesToken && matchesStatus && matchesSearch;
    });

    const columns = getProposalColumns(onviewAcount);
    return (
        <>
            <div className="mt-3 text-sm font-medium text-greenPrimary-100 min-h-96">
                <ProposalTable
                    columns={columns}
                    data={filteredData}
                    showCard={false}
                    pageSize={10}
                    className="h-400"
                />
            </div>
        </>
    );
};
export default Table;
