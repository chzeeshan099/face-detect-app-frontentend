'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getCurrentStatusApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [data, setdata] = useState<any[]>([]);
    const fetchCurrentStatusData = async () => {
        try {
            const response = await getCurrentStatusApi();
            setdata(response);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
        fetchCurrentStatusData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className=''>
                <ProposalTable showCard={false} columns={columns} data={data} pageSize={10} showPagination={false} />
            </div>
        </>
    )
}

export default Table