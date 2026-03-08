import { Head, Link } from '@inertiajs/react';
import {
  FunnelIcon,
  ReceiptIcon,
  SortAscendingIcon,
} from '@phosphor-icons/react';
import transactionController from '@/actions/App/Http/Controllers/TransactionController';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import Header from '@/components/ui/header';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn, currencyFormat } from '@/lib/utils';
import type { TransactionPageProps } from '@/types';

export default function index({ transactions }: TransactionPageProps) {
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
    <AppLayout>
      <Head title="Transactions" />
      <Header title="Transactions">
        <Button size="xl" asChild>
          <Link href={transactionController.create().url}>+ Add New</Link>
        </Button>
      </Header>

      {transactions.data.length === 0 ? (
        <Empty className="border border-dashed bg-white">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ReceiptIcon weight="fill" />
            </EmptyMedia>
            <EmptyTitle>No Transactions</EmptyTitle>
            <EmptyDescription className="max-w-xs text-pretty">
              Keep track of your spending by adding your first transaction. This
              will help you manage your finances more effectively.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="xl" asChild>
              <Link href={transactionController.create().url}>+ Add New</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="rounded-xl bg-white px-5 py-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Input placeholder="Search transactions" type="search" />
            <div className="flex items-center gap-2">
              <SortAscendingIcon size={24} weight="fill" />
              <FunnelIcon size={24} weight="fill" />
            </div>
          </div>

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="flex max-w-48 items-center gap-2 md:max-w-full">
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
                        className={cn(
                          'leading-[150%] font-bold tracking-normal',
                        )}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination table={transactions} />
        </div>
      )}
    </AppLayout>
  );
}
