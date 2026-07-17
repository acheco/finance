import type { PaginatedResponse } from '@/types/pagination';

export interface Category {
    id: number;
    user_id: number;
    name: string;
    color: string;
    icon: string;
    isHidden: boolean;
    created_at: string;
    updated_at: string;
}

export type PaginatedCategory = PaginatedResponse<Category>;
