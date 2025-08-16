'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getwebhooksDataApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [webhooksData, setWebhooksData] = useState<any[]>([]);
console.log('webhooksData', webhooksData)
    
    const fetchwebhooksData = async () => {
        try {
            const data = await getwebhooksDataApi();
            setWebhooksData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
      fetchwebhooksData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className=''>
                <ProposalTable showCard={false} columns={columns} data={webhooksData} pageSize={10} showPagination={false}/>
            </div>
        </>
    )
}

export default Table