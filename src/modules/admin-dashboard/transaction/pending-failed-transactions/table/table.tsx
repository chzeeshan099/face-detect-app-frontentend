import React, { useEffect, useState } from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { getProposalHistoryTableDataApi } from '@/apis/dashbord/ecoSystem/governence';
import { pendingFailedTransactionsData } from '@/constants/admindashboard';
import { Text } from 'rizzui';

interface TableProps {
  selectedType: string;
  selectedStatus: string;
  searchQuery: string;
}

const Table = ({ selectedType, selectedStatus, searchQuery }: TableProps) => {
  console.log(selectedType,"selectedType");
  console.log(selectedStatus,"selectedStatus");
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

  const filteredData = pendingFailedTransactionsData.filter((item:any) => {
    const matchesToken =
      selectedType === 'errorType' ||
      !selectedType ||
      item.type.toLowerCase() === selectedType.toLowerCase();
    const matchesStatus =
      selectedStatus === 'status' ||
      !selectedStatus ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transactionHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contributed.toString().includes(searchQuery) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.errorType.toLowerCase().includes(searchQuery.toLowerCase());
  
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
