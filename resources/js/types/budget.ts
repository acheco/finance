export interface Budget {
    id: number;
    user_id: number;
    category: {
        id: number;
        name: string;
        color: string;
        icon: string;
        transactions: {
            id: number;
            recipient: string;
            amount: number;
            date: string;
            type: 'income' | 'expense';
        }[];
    };
    maximum: number;
    spent: number;
    created_at: string;
}
