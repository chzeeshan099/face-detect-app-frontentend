import ProposalTable from '@/components/table/table';
import { getKeyColumns } from './column';
import { apiKeys } from '@/constants/admindashboard';

const Table = () => {
    const columns = getKeyColumns();
    return (
        <>
            <div className="text-sm font-medium text-greenPrimary-100">
                <ProposalTable
                    columns={columns}
                    data={apiKeys}
                    showCard={false}
                    showPagination={false}
                />
            </div>
        </>
    );
};

export default Table;
