// ProposalTable.js
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CustomWidgetCard from '@/components/cards/custom-widget-card';

interface CustomMeta {
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<TData> {
  columns: any[];
  data: TData[];
  pageSize?: number;
  showCard?: boolean;
  showPagination?: boolean;
  className?: string;
}

function Table<TData>({
  columns,
  data,
  pageSize = 6,
  showCard = true,
  showPagination = true,
  className = '',
}: TableProps<TData>) {
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data: data?.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    columns,
    pageCount: Math?.ceil(data?.length / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const tableContent = (
    <div className="p-3 ">
      {/* Table container with overflow */}
      <div className={`relative w-24 min-w-full overflow-x-auto ${className}`}>
        <table className="min-w-full table-auto whitespace-nowrap text-left">
          <thead className="text-green-lighter dark:text-green-liter text-sm font-medium">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => (
                  <th
                    key={header.id}
                    className={`px-3 py-2 text-${(header?.column?.columnDef?.meta as CustomMeta)?.align || 'left'}`}
                    style={{ width: header?.getSize() }}
                  >
                    {flexRender(
                      header?.column?.columnDef?.header,
                      header?.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table?.getRowModel()?.rows?.map((row) => (
              <tr key={row.id}>
                {row?.getVisibleCells()?.map((cell) => (
                  <td
                    key={cell.id}
                    className={`px-3 py-2 text-${(cell?.column?.columnDef?.meta as CustomMeta)?.align || 'left'} text-sm font-medium text-black-light dark:text-white`}
                    style={{ width: cell?.column?.getSize() }}
                  >
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="mt-4 flex items-center justify-between gap-2 px-3 ">
          <button
            onClick={() => setPageIndex((old) => Math?.max(old - 1, 0))}
            disabled={pageIndex === 0}
            className="rounded bg-white px-3 py-3 text-black-light disabled:opacity-50 dark:bg-greenPrimary-200 dark:text-white"
          >
            <FaArrowLeft />
          </button>
          <span className="text-sm font-medium text-black-light dark:text-white">
            {pageIndex + 1}/{Math?.ceil(data?.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex((old) => old + 1)}
            disabled={(pageIndex + 1) * pageSize >= data?.length}
            className="rounded bg-white px-3 py-3 text-black-light disabled:opacity-50 dark:bg-greenPrimary-200 dark:text-white"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );

  return showCard ? (
    <CustomWidgetCard title="Proposal History" shadow="left" className="w-full">
      {tableContent}
    </CustomWidgetCard>
  ) : (
    tableContent
  );
}

export default Table;
