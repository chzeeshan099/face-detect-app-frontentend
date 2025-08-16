'use client';

import { GrFormView } from 'react-icons/gr';
import { createColumnHelper } from '@tanstack/react-table';


const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Timestamp',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('userId', {
    header: 'User ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('token', {
    header: 'Token',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`${
          info.getValue() === 'Completed'
            ? 'text-green-500'
            : info.getValue() === 'Failed'
              ? 'text-red-500'
              : 'text-yellow-500'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('transactionId', {
    header: 'Transaction ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'action',
    header: 'Action',
    cell: () => (
      <button className="hover:text-greenPrimary-300">
        <GrFormView className="h-5 w-5" />
      </button>
    ),
  }),
];
