export type RecurringBillSortOption =
    'latest' | 'oldest' | 'a_to_z' | 'z_to_a' | 'highest' | 'lowest';

export type RecurringBillFrequency = 'weekly' | 'monthly' | 'yearly';

export interface Bill {
    id: number;
    account_id: number;
    name: string;
    amount: number;
    frequency: string;
    frequency_raw: RecurringBillFrequency;
    due_day: string | null;
    due_day_raw: number | null;
    next_due_date: string;
    status: 'paid' | 'upcoming' | 'due_soon';
    category: {
        id: number;
        color: string;
        icon: string;
    } | null;
}
