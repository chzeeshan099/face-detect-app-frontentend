import React, { useEffect, useState } from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { getAllUserData } from '@/apis/dashbord/ecoSystem/governence';
import { Text } from 'rizzui';

interface TableProps {
  selectedToken: string;
  selectedStatus: string;
  searchQuery: string;
}

const Table = ({ selectedToken, selectedStatus, searchQuery }: TableProps) => {
  const [userData, setUserData] = useState<any[]>([]);

  const fetchAllUserData = async () => {
    try {
      const data = await getAllUserData();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchAllUserData();
  }, []);

  const filteredData = userData.filter((item) => {
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
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toString().includes(searchQuery) ||
      item.registrationDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastActivity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesToken && matchesStatus && matchesSearch;
  });

  const columns = getProposalColumns();
  return (
    <>
      <div className="mt-3 text-sm font-medium text-greenPrimary-100 min-h-96">
        {filteredData.length > 0 ? (
        <ProposalTable
          columns={columns}
          data={filteredData}
          showCard={false}
          pageSize={10}
          className="h-400"
        /> ) : (
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
