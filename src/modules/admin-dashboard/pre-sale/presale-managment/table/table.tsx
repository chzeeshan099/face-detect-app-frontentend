'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getstagesConfigurationDataApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [stagesConfigurationData, setStagesConfigurationData] = useState<any[]>([]);

    
    const fetchstagesConfigurationData = async () => {
        try {
            const data = await getstagesConfigurationDataApi();
            setStagesConfigurationData(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
      fetchstagesConfigurationData();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className='mt-3'>
                <ProposalTable showCard={false} columns={columns} data={stagesConfigurationData} showPagination={false}   />
            </div>
        </>
    )
}

export default Table