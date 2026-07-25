import {
    ArrowDownLeftIcon,
    ArrowUpRightIcon,
    DotsThreeIcon,
} from '@phosphor-icons/react';
import DeleteTransactionModal from '@/components/modals/delete-transaction';
import TransactionForm from '@/components/modals/transaction-form';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
                    style={{
                        backgroundColor:
                            transaction.category?.color ?? '#201F24',
                    }}
                >
                    {transaction.category?.icon ? (
                        <DynamicIcon
                            name={transaction.category.icon}
                            size={20}
                            weight="fill"
                            color="#fff"
                        />
                    ) : (
                        <span>
                            {transaction.type === 'Expense' ||
                                (transaction.type === 'income' &&
                                    transaction.recipient)}
                            {transaction.type === 'Transfer Out' && (
                                <ArrowUpRightIcon
                                    size={24}
                                    color="white"
                                    weight="fill"
                                />
                            )}
                            {transaction.type === 'Transfer In' && (
                                <ArrowDownLeftIcon
                                    size={24}
                                    color="white"
                                    weight="fill"
                                />
                            )}
                        </span>
                    )}
                </div>
                <div>
                    <p className="preset-4-bold">
                        {' '}
                        {transaction.recipient && transaction.recipient}
                        {transaction.type === 'Transfer Out' &&
                            transaction.transfer?.from_account?.name}
                        {transaction.type === 'Transfer In' &&
                            transaction.transfer?.to_account?.name}
                    </p>
                    <p className="preset-5 text-grey-500 md:hidden">
                        {transaction.category?.name ?? transaction.type}
                    </p>
                </div>
            </div>
        ),
    },
    {
        key: 'cat',
        header: <div className={cn('hidden md:table-cell')}>Category</div>,
        render: (transaction) => (
            <p className="hidden preset-5 text-grey-500 md:table-cell">
                {transaction.category?.name ?? transaction.type}
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
            <div className="hidden md:flex md:items-center md:justify-end">
                <p>Amount</p>
            </div>
        ),
        key: 'amount',
        render: (transaction) => {
            return (
                <div className="text-end">
                    <div className="preset-4-bold">
                        {transaction.type === 'Expense' ||
                        transaction.type === 'Transfer Out' ? (
                            <span className={cn('font-bold text-grey-900')}>
                                -{currencyFormatter(transaction.amount)}
                            </span>
                        ) : (
                            <span
                                className={cn('font-bold text-secondary-green')}
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
    {
        key: 'actions',
        header: '',
        render: (transaction) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <span className="sr-only">Open menu</span>
                            <DotsThreeIcon size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="px-5 py-3">
                        <DropdownMenuItem asChild>
                            <TransactionForm transaction={transaction} />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-3" />
                        <DropdownMenuItem asChild>
                            <DeleteTransactionModal
                                transaction={transaction.id}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
