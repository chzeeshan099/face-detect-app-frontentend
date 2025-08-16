import React, { useEffect, useState } from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { getProposalHistoryTableDataApi } from '@/apis/dashbord/ecoSystem/governence';
import { auditTrailData } from '@/constants/admindashboard';
import { Text } from 'rizzui';

interface TableProps {
  SelectedInitiatorOptions: string;
  SelectedEventTypeOptions: string;
  searchQuery: string;
}

const Table = ({ SelectedInitiatorOptions, SelectedEventTypeOptions, searchQuery }: TableProps) => {

  const [proposalHistoryDatas, setProposalHistoryDatas] = useState<any[]>([]);

  const fetchProposalHistoryData = async () => {
    try {
      const data = await getProposalHistoryTableDataApi();
      setProposalHistoryDatas(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchProposalHistoryData();
  }, []);

  const filteredData = auditTrailData.filter((item: any) => {
    const matchesToken =
    SelectedInitiatorOptions === 'initiator' ||
      !SelectedInitiatorOptions ||
      item?.initiator?.toLowerCase() === SelectedInitiatorOptions.toLowerCase();
  
    const matchesStatus =
    SelectedEventTypeOptions === 'eventType' ||
      !SelectedEventTypeOptions ||
      item?.eventType?.toLowerCase() === SelectedEventTypeOptions.toLowerCase();
  
    const matchesSearch =
      !searchQuery ||
      item?.timestamp?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.eventType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.initiator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.details?.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesToken && matchesStatus && matchesSearch;
  });
  
  

  const columns = getProposalColumns();
  return (
    <>
      <div className="mt-3 text-sm font-medium text-greenPrimary-100">
        {filteredData.length > 0 ? (
          <ProposalTable
            columns={columns}
            data={filteredData}
            showCard={false}
            pageSize={10}
          />
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <Text className="text-lg font-medium text-gray-500 dark:text-gray-400">
              No Data Found
            </Text>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
