import type { PaginationResponse } from '@/types/navigation';

export interface Category {
  id: number;
  name: string;
  color: string;
  image: string;
}

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  category?: Category;
  date: string;
}

export interface TransactionPageProps {
  transactions: PaginationResponse<Transaction>;
  [key: string]: unknown;
}
