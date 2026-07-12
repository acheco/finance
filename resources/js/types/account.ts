import type { PaginatedResponse } from '@/types/pagination';

export interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
    color: string | null;
    icon: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

export type PaginatedAccount = PaginatedResponse<Account>;
