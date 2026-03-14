import { Link } from '@inertiajs/react';
import { DotsThreeOutlineIcon } from '@phosphor-icons/react';
import transactionController from '@/actions/App/Http/Controllers/TransactionController';
import DeleteTransaction from '@/components/transactions/delete-transaction';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, currencyFormat } from '@/lib/utils';
import type { DataTableProps } from '@/types';

export default function DataTable({ transactions }: DataTableProps) {
  const formattedAmount = (amount: number) => {
    if (amount < 0) {
      return (
        <span className="font-bold text-grey-900">
          {currencyFormat(amount)}
        </span>
      );
    } else {
      return (
        <span className="font-bold text-green-custom">
          +{currencyFormat(amount)}
        </span>
      );
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hidden md:table-row">
          <TableHead className="text-xs leading-[150%] tracking-normal text-grey-500">
            Recipient / Sender
          </TableHead>
          <TableHead className="text-xs leading-[150%] tracking-normal text-grey-500">
            Category
          </TableHead>
          <TableHead className="text-xs leading-[150%] tracking-normal text-grey-500">
            Transaction Date
          </TableHead>
          <TableHead className="text-right text-xs leading-[150%] tracking-normal text-grey-500">
            Amount
          </TableHead>
          <TableHead className="text-right text-xs leading-[150%] tracking-normal text-grey-500">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.data.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="flex max-w-45 items-center gap-2 md:max-w-full">
              <div
                className="flex min-h-8 min-w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: transaction.category?.color }}
              >
                {transaction.category?.image && (
                  <Icon
                    name={transaction.category.image as never}
                    size={24}
                    weight="fill"
                    color="white"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1 overflow-hidden">
                <span
                  className={cn('leading-[150%] font-bold tracking-normal')}
                >
                  {transaction.name}
                </span>
                <span className="text-xs text-grey-500 md:hidden">
                  {transaction.category?.name}
                </span>
              </div>
            </TableCell>
            <TableCell className="hidden text-xs leading-[150%] tracking-normal text-grey-500 md:table-cell">
              {transaction.category?.name}
            </TableCell>
            <TableCell className="hidden text-xs leading-[150%] tracking-normal text-grey-500 md:table-cell">
              {transaction.date}
            </TableCell>
            <TableCell align="right">
              <div className="flex flex-col gap-1">
                {formattedAmount(transaction.amount)}
                <span className="text-xs text-grey-500 md:hidden">
                  {transaction.date}
                </span>
              </div>
            </TableCell>
            <TableCell
              align="right"
              className="text-xs leading-[150%] tracking-normal text-grey-500 md:table-cell"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsThreeOutlineIcon size={20} weight="fill" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={transactionController.edit(transaction).url}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <DeleteTransaction transaction={transaction} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
