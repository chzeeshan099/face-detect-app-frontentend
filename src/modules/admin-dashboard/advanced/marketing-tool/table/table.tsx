'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getmarketingDataApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [marketingData, setMarketingData] = useState<any[]>([]);
console.log('marketingData', marketingData)
    
    const fetchmarketingData = async () => {
        try {
            const data = await getmarketingDataApi();
            setMarketingData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
      fetchmarketingData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className=''>
                <ProposalTable showCard={false} columns={columns} data={marketingData} pageSize={10} showPagination={false}/>
            </div>
        </>
    )
}

export default Table