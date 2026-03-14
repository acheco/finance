import { Head, Link, router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import transactionController from '@/actions/App/Http/Controllers/TransactionController';
import EmptyBlock from '@/components/empty-block';
import FormModal from '@/components/form-modal';
import Pagination from '@/components/pagination';
import DataTable from '@/components/transactions/data-table';
import FilterPanel from '@/components/transactions/filter-panel';
import TransactionForm from '@/components/transactions/transaction-form';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/header';
import AppLayout from '@/layouts/app-layout';
import type { TransactionPageProps } from '@/types';

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a_z', label: 'A to Z' },
  { value: 'z_a', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
];

export default function Index({
  transaction,
  transactions,
  categories,
  mode,
  openModal,
}: TransactionPageProps) {
  const { url } = usePage();
  const params = new URLSearchParams(url.split('?')[1]);
  const currentSort = params.get('sort') || 'latest';
  const currentCategory = params.get('category') || 'all';
  const currentSearch = params.get('search') || '';

  const [searchValue, setSearchValue] = useState(currentSearch);

  const navigateWithParams = useCallback(
    (newParams: Record<string, string>) => {
      const targetUrl = transactionController.index().url;
      const merged = {
        sort: currentSort,
        category: currentCategory,
        search: currentSearch,
        ...newParams,
      };
      router.get(targetUrl, merged, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      });
    },
    [currentSort, currentCategory, currentSearch],
  );

  const handleSortChange = (sortValue: string) => {
    navigateWithParams({ sort: sortValue });
  };

  const handleCategoryChange = (categoryValue: string) => {
    navigateWithParams({ category: categoryValue });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
    navigateWithParams({ search: newSearchValue });
  };

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

      <div className="rounded-xl bg-white px-5 py-6">
        <FilterPanel
          categories={categories}
          currentCategory={currentCategory}
          handleCategoryChange={handleCategoryChange}
          currentSort={currentSort}
          handleSortChange={handleSortChange}
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          sortOptions={sortOptions}
        />

        {transactions.data.length === 0 ? (
          <EmptyBlock
            title="No Transactions"
            description="Keep track of your spending by adding your first transaction. This will help you manage your finances more effectively."
            iconName="ReceiptIcon"
          >
            <Link href={transactionController.create().url}>+ Add New</Link>
          </EmptyBlock>
        ) : (
          <>
            <DataTable transactions={transactions} />
            <Pagination table={transactions} />
          </>
        )}
      </div>

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
