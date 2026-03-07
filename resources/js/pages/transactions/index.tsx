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
import type { TransactionPageProps } from '@/types';

export default function index({ transactions }: TransactionPageProps) {
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
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.category?.name}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell align="right">{transaction.amount}</TableCell>
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
