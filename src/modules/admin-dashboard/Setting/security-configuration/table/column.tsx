import { createColumnHelper } from '@tanstack/react-table'
import { Text } from 'rizzui';
import { IoBanOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';

const columnHelper = createColumnHelper<any>()

export const getKeyColumns = () => {
    return [
        columnHelper.accessor('keyName', {
            header: 'Key Name',
            size: 150,
            cell: info => {
                return (
                    <Text className="text-sm text-left font-medium">
                        {info.row.original.keyName}
                    </Text>
                );
            },
        }),

        columnHelper.accessor('created', {
            header: 'Created',
            size: 100,
            cell: info => {
                return (
                    <Text className="text-sm text-left font-medium">
                        {info.row.original.created}
                    </Text>
                );
            },
        }),

        columnHelper.accessor('expires', {
            header: 'Expires',
            size: 100,
            cell: info => {
                return (
                    <Text className="text-sm text-left font-medium">
                        {info.row.original.expires}
                    </Text>
                );
            },
        }),

        columnHelper.accessor('permissions', {
            header: 'Permissions',
            size: 150,
            cell: info => {
                return (
                    <Text className="text-sm text-left font-medium">
                        {info.row.original.permissions}
                    </Text>
                );
            },
        }),

        columnHelper.accessor('status', {
            header: 'Status',
            size: 80,
            cell: info => {
                const status = info.row.original.status;
                return (
                    <div className='rounded text-center w-fit'
                    >
                        <Text className="text-xs font-medium">
                            {status}
                        </Text>
                    </div>
                );
            },
        }),

        columnHelper.accessor('actions', {
            header: 'Actions',
            size: 100,
            cell: (info) => {
                const status = info.row.original.status;
                return (
                    <div className="flex items-center gap-2">
                        {status === 'Active' ? (
                            <>
                               <IoBanOutline className='w-4 h-4 hover:text-red-600' />
                                <RiDeleteBin6Line className='w-4 h-4 hover:text-red-600' />
                            </>
                        ) : (
                            <RiDeleteBin6Line className='w-4 h-4 hover:text-red-600' />
                        )}
                    </div>
                );
            },
        }),
    ];
};
