import React, { useEffect, useState } from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { getProposalHistoryTableDataApi } from '@/apis/dashbord/ecoSystem/governence';
import { ddosIncidentData } from '@/constants/admindashboard';
import { Text } from 'rizzui';

interface TableProps {
  selectedAttackType: string;
  selectedStatus: string;
  searchQuery: string;
}

const Table = ({
  selectedAttackType,
  selectedStatus,
  searchQuery,
}: TableProps) => {
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

  // Map dropdown values to actual data values
  const attackTypeMap: Record<string, string> = {
    synFlood: 'SYN Flood',
    httpFlood: 'HTTP Flood',
    udpAmplification: 'UDP Amplification',
  };

  const filteredData = ddosIncidentData.filter((item) => {
    const matchesAttackType =
      selectedAttackType === 'attackType' ||
      !selectedAttackType ||
      item.attackType === attackTypeMap[selectedAttackType];

    const matchesStatus =
      selectedStatus === 'status' ||
      !selectedStatus ||
      item.status.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      item.startTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.endTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.attackType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.duration.toString().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesAttackType && matchesStatus && matchesSearch;
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
