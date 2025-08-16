import React from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { transactionData } from '@/constants/admindashboard';

interface TableProps {
    selectedToken: string;
    selectedStatus: string;
    searchQuery: string;
    onviewAcount: () => void;
}

const Table = () => {
  
    const columns = getProposalColumns();
    return (
        <>
            <div className=" text-sm font-medium text-greenPrimary-100">
                <ProposalTable
                    columns={columns}
                    data={transactionData}
                    showCard={false}
                    pageSize={6}
                    className='h-64'
                />
            </div>
        </>
    );
};

export default Table;
