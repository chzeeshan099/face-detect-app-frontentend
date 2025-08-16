'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getchainlogDataApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [chainlogData, setChainlogData] = useState<any[]>([]);
console.log('chainlogData', chainlogData)
    
    const fetchchainlogData = async () => {
        try {
            const data = await getchainlogDataApi();
            setChainlogData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
      fetchchainlogData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className=''>
                <ProposalTable showCard={false} columns={columns} data={chainlogData} pageSize={10} showPagination={false}/>
            </div>
        </>
    )
}

export default Table