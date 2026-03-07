import type { ColumnDef } from '@tanstack/react-table';
import { currencyFormat } from '@/lib/utils';
import type { Transaction } from '@/types';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-sm leading-[150%] tracking-normal text-grey-500">
        Recipient/Sender
      </div>
    ),
  },
  {
    id: 'category',
    accessorFn: (row) => row.category?.name ?? 'No Category',
    header: () => (
      <div className="text-sm leading-[150%] tracking-normal text-grey-500">
        Category
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm leading-[150%] tracking-normal text-grey-500">
        {row.getValue('category')}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: () => (
      <div className="text-sm leading-[150%] tracking-normal text-grey-500">
        Transaction Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm leading-[150%] tracking-normal text-grey-500">
          {row.getValue('date')}
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => (
      <div className="text-right text-sm leading-[150%] tracking-normal text-grey-500">
        Amount
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      if (amount > 0) {
        return (
          <div className="text-right text-sm leading-[150%] font-bold tracking-normal text-green-custom">
            +{currencyFormat(amount)}
          </div>
        );
      }

      if (amount < 0) {
        return (
          <div className="text-right text-sm leading-[150%] font-bold tracking-normal text-grey-900">
            {currencyFormat(amount)}
          </div>
        );
      }

      return amount;
    },
  },
];
