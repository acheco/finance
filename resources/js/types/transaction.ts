import type { PaginationResponse } from '@/types/navigation';

export interface Category {
  id: string;
  name: string;
  color: string;
  image: string;
}

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  category_id: string;
  category: Category;
  date: string;
}

export interface TransactionPageProps {
  transaction?: Transaction;
  transactions: PaginationResponse<Transaction>;
  categories: Category[];
  openModal: boolean;
  mode?: 'create' | 'edit';
  [key: string]: unknown;
}

export interface FilterPanelProps {
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentSort: string;
  handleSortChange: (sortValue: string) => void;
  currentCategory: string;
  handleCategoryChange: (categoryValue: string) => void;
  categories: Category[];
  sortOptions: { value: string; label: string }[];
}

export interface DataTableProps {
  transactions: PaginationResponse<Transaction>;
}

export interface TransactionFormProps {
  transaction?: Transaction;
  categories: Category[];
  mode?: 'create' | 'edit';
}
