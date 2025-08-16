'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getpreSaleDetailsDataApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [preDetailData, setPreDetailData] = useState<any[]>([]);
console.log('preDetailData', preDetailData)
    
    const fetchPreDetailData = async () => {
        try {
            const data = await getpreSaleDetailsDataApi();
            setPreDetailData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
      fetchPreDetailData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className='mt-3'>
                <ProposalTable showCard={false} columns={columns} data={preDetailData} pageSize={10} className="h-400"
 />
            </div>
        </>
    )
}

export default Table