'use client'
import React, { useEffect, useState } from 'react'
import ProposalTable from '@/components/table/table'
import { getProposalColumns } from './column'
import { getamlProviderApi } from '@/apis/dashbord/admindashboard'
const Table = () => {

    const [amlProvider, setAmlProvider] = useState<any[]>([]);
console.log('amlProvider', amlProvider)
    
    const fetchamlProvider = async () => {
        try {
            const data = await getamlProviderApi();
            setAmlProvider(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };
    useEffect(() => {
      fetchamlProvider();
    }, []);

    const columns = getProposalColumns()
    return (
        <>
            <div className=''>
                <ProposalTable showCard={false} columns={columns} data={amlProvider} pageSize={10} showPagination={false} />
            </div>
        </>
    )
}

export default Table