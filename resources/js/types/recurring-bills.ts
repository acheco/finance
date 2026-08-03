export type RecurringBillSortOption =
    'latest' | 'oldest' | 'a_to_z' | 'z_to_a' | 'highest' | 'lowest';

export interface Bill {
    id: number;
    user_id: number;
    account_id: number;
    category_id: number;
    name: string;
    amount: number;
    frequency: string;
    due_day: number;
    next_due_date: string;
    created_at: string;
    status: 'paid' | 'upcoming' | 'due_soon';
    category: {
        id: number;
        color: string;
        icon: string;
    };
}
