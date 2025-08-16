import React, { useEffect, useState } from 'react';
import ProposalTable from '@/components/table/table';
import { getProposalColumns } from './column';
import { getProposalHistoryTableDataApi } from '@/apis/dashbord/ecoSystem/governence';
import { botActivityData } from '@/constants/admindashboard';
import { Text } from 'rizzui';

interface TableProps {
  selectedEventType: string;
  selectedIPAddress: string;
  searchQuery: string;
}
const Table = ({
  selectedEventType,
  selectedIPAddress,
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

  // Map dropdown values to actual action types
  const ipActionMap: Record<string, string> = {
    blockedIp: 'Blocked IP',
    laggedforreview: 'Flagged for review',
    ratelimited: 'Rate Limited',
  };
  const eventTypeMap: Record<string, string> = {
    loginAttempt: 'Login Attempt',
    suspiciousRegistration: 'Suspicious Registration',
    apiRequestFlood: 'API Request Flood',
  };

  const filteredData = botActivityData.filter((item) => {
    const matchesEventType =
      selectedEventType === 'eventType' ||
      !selectedEventType ||
      item.eventType === eventTypeMap[selectedEventType] ||
      item.eventType.toLowerCase() === selectedEventType.toLowerCase();

    const matchesAction =
      selectedIPAddress === 'ipAddress' ||
      !selectedIPAddress ||
      item.actionTaken === ipActionMap[selectedIPAddress] ||
      item.actionTaken.toLowerCase() === selectedIPAddress.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      item.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceIP.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.detailsSummary.toString().includes(searchQuery) ||
      item.actionTaken.toString().includes(searchQuery) ||
      item.logID.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEventType && matchesAction && matchesSearch;
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
