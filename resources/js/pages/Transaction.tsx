import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { TransactionColumns } from '@/columns/transaction-columns';
import { DataTable } from '@/components/data-table';
import { index as transaction } from '@/routes/transactions';
import type {
    PaginatedTransaction,
    TransactionSortOption,
} from '@/types/transaction';

interface TransactionProps {
    transactions: PaginatedTransaction;
    filters: {
        search?: string;
        sort: TransactionSortOption;
        category?: string;
    };
}

export default function Transaction({
    transactions,
    filters,
}: TransactionProps) {
    const { data, ...pagination } = transactions;
    const [search, setSearch] = useState<string>(filters.search ?? '');
    const [sort, setSort] = useState<string>(filters.sort ?? 'latest');
    const [category, setCategory] = useState<string>(
        filters.category ?? 'All Transactions',
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                transaction().url,
                {
                    search,
                    sort,
                    category:
                        category === 'All Transactions' ? undefined : category,
                },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, sort, category]);

    return (
        <>
            <Head title="Transaction" />
            <div className="grid grid-cols-1 gap-4 rounded-md bg-white px-2 py-4 md:px-4 md:py-6 xl:w-265 xl:px-6 xl:py-8">
                <DataTable
                    rowKey={(transaction) => transaction.id}
                    data={data}
                    pagination={pagination}
                    columns={TransactionColumns}
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    withCategory={true}
                    category={category}
                    setCategory={setCategory}
                    emptyMessage="No transactions found."
                />
            </div>
        </>
    );
}

Transaction.layout = {
    breadcrumbs: [
        {
            title: 'Transactions',
            href: transaction(),
        },
    ],
};
