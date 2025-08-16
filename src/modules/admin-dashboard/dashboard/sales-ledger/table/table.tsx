import React, { useEffect, useState } from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { getProposalHistoryTableDataApi } from '@/apis/dashbord/ecoSystem/governence';
import { salesLedgerData } from '@/constants/admindashboard';
import { Text } from 'rizzui';

interface TableProps {
  selectedToken: string;
  selectedStatus: string;
  searchQuery: string;
}

const Table = ({ selectedToken, selectedStatus, searchQuery }: TableProps) => {
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

  const filteredData = salesLedgerData.filter((item) => {
    const matchesToken =
      selectedToken === 'tokenType' ||
      !selectedToken ||
      item.token.toLowerCase() === selectedToken.toLowerCase();
    const matchesStatus =
      selectedStatus === 'status' ||
      !selectedStatus ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().includes(searchQuery) ||
      item.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());

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
            className="h-400"

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
