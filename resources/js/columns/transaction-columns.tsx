import { DynamicIcon } from '@/components/ui/icon';
import { cn, currencyFormatter } from '@/lib/utils';
import type { ColumnDef } from '@/types/datatable';
import type { Transaction } from '@/types/transaction';

export const TransactionColumns: ColumnDef<Transaction>[] = [
    {
        header: <div className="hidden md:table-cell">Recipient / Sender</div>,
        key: 'recipient',
        render: (transaction) => (
            <div className="flex gap-3">
                <div
                    className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full',
                    )}
                    style={{ backgroundColor: transaction.category?.color }}
                >
                    {transaction.category?.icon ? (
                        <DynamicIcon
                            name={transaction.category.icon}
                            size={20}
                            weight="fill"
                            color="#fff"
                        />
                    ) : (
                        <span>{transaction.recipient}</span>
                    )}
                </div>
                <div>
                    <p className="preset-4-bold">{transaction.recipient}</p>
                    <p className="preset-5 text-grey-500 md:hidden">
                        {transaction.category?.name}
                    </p>
                </div>
            </div>
        ),
    },
    {
        key: 'cat',
        header: <div className="hidden md:table-cell">Category</div>,
        render: (transaction) => (
            <p className="hidden preset-5 text-grey-500 md:table-cell">
                {transaction.category?.name}
            </p>
        ),
    },
    {
        key: 'date_transaction',
        header: <div className="hidden md:table-cell">Transaction Date</div>,
        render: (transaction) => (
            <p className="hidden preset-5 text-grey-500 md:table-cell">
                {transaction.date}
            </p>
        ),
    },
    {
        header: (
            <div className="hidden text-end md:table-cell">
                <p>Amount</p>
            </div>
        ),
        key: 'amount',
        render: (transaction) => {
            return (
                <div className="text-end">
                    <div className="preset-4-bold">
                        {transaction.type === 'Expense' ? (
                            <span
                                className={cn({
                                    'font-bold text-grey-900':
                                        transaction.type === 'Expense' ||
                                        transaction.type === 'Transfer Out',
                                })}
                            >
                                -{currencyFormatter(transaction.amount)}
                            </span>
                        ) : (
                            <span
                                className={cn({
                                    'font-bold text-secondary-green':
                                        transaction.type === 'Income' ||
                                        transaction.type === 'Transfer In',
                                })}
                            >
                                +{currencyFormatter(transaction.amount)}
                            </span>
                        )}
                    </div>
                    <div className="md:hidden">
                        <p className="preset-5 text-grey-500">
                            {transaction.date}
                        </p>
                    </div>
                </div>
            );
        },
    },
];
