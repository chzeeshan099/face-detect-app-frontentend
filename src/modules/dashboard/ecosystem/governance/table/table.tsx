import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getProposalHistoryTableDataApi } from '@/apis/dashbord/ecoSystem/governence'
const Table = () => {

    const [proposalHistoryData, setProposalHistoryData] = useState<any[]>([]);

    
    const fetchProposalHistoryData = async () => {
        try {
            const data = await getProposalHistoryTableDataApi();
            setProposalHistoryData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
        fetchProposalHistoryData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className='mt-3'>
                <ProposalTable columns={columns} data={proposalHistoryData} />
            </div>
        </>
    )
}

export default Table