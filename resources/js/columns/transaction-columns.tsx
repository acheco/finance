import { currencyFormatter } from '@/lib/utils';
import type { ColumnDef } from '@/types/datatable';
import type { Transaction } from '@/types/transaction';

export const TransactionColumns: ColumnDef<Transaction>[] = [
    {
        header: 'Date',
        key: 'date',
    },
    {
        header: 'Amount',
        key: 'amount',
        render: (value) => {
            return currencyFormatter(value.amount);
        },
    },
];
