import { Head, Link, router } from '@inertiajs/react';
import { FunnelIcon, SortAscendingIcon } from '@phosphor-icons/react';
import transactionController from '@/actions/App/Http/Controllers/TransactionController';
import EmptyBlock from '@/components/empty-block';
import FormModal from '@/components/form-modal';
import Pagination from '@/components/pagination';
import DataTable from '@/components/transactions/data-table';
import TransactionForm from '@/components/transactions/transaction-form';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { TransactionPageProps } from '@/types';

export default function index({
  transaction,
  transactions,
  categories,
  mode,
  openModal,
}: TransactionPageProps) {
  function handleClose() {
    router.visit(transactionController.index().url, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  }

  return (
    <AppLayout>
      <Head title="Transactions" />
      <Header title="Transactions">
        <Button size="xl" asChild>
          <Link href={transactionController.create().url}>+ Add New</Link>
        </Button>
      </Header>

      {transactions.data.length === 0 ? (
        <EmptyBlock
          title="No Transactions"
          description="Keep track of your spending by adding your first transaction. This will help you manage your finances more effectively."
          iconName="ReceiptIcon"
        >
          <Link href={transactionController.create().url}>+ Add New</Link>
        </EmptyBlock>
      ) : (
        <div className="rounded-xl bg-white px-5 py-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Input placeholder="Search transactions" type="search" />
            <div className="flex items-center gap-2">
              <SortAscendingIcon size={24} weight="fill" />
              <FunnelIcon size={24} weight="fill" />
            </div>
          </div>

          <DataTable transactions={transactions} />
          <Pagination table={transactions} />
        </div>
      )}

      <FormModal open={openModal} handleClose={handleClose}>
        <TransactionForm
          mode={mode}
          transaction={transaction}
          categories={categories}
        />
      </FormModal>
    </AppLayout>
  );
}
