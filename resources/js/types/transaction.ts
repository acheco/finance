import type { Account } from '@/types/account';
import type { Category } from '@/types/category';
import type { PaginatedResponse } from '@/types/pagination';

export type TransactionSortOption =
    'latest' | 'oldest' | 'a_to_z' | 'z_to_a' | 'highest' | 'lowest';

export interface Transfer {
    id: number;
    user_id: number;
    from_account_id: number;
    to_account_id: number;
    amount: number;
    date: string;
    description: string;
    created_at: string;
}

export interface Transaction {
    id: number;
    user_id: number;
    account_id: number;
    category_id: number | null;
    transfer_id: number | null;
    amount: number;
    date: string;
    description: string;
    created_at: string;
    type: string;
    account: Pick<Account, 'id' | 'name'>;
    category: Pick<Category, 'id' | 'name'> | null;
    transfer: Pick<Account, 'id' | 'name'> | null;
}

export type PaginatedTransaction = PaginatedResponse<Transaction>;
