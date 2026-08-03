import { Head, router } from '@inertiajs/react';
import {
    CheckCircleIcon,
    DotsThreeIcon,
    ReceiptIcon,
    SortAscendingIcon,
    SortDescendingIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import RecurringBillForm from '@/components/modals/recurring-bill-form';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DynamicIcon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn, currencyFormatter } from '@/lib/utils';
import { index as recurringBillsIndex } from '@/routes/recurring-bills';
import type { Bill, RecurringBillSortOption } from '@/types/recurring-bills';

const ascendingSorts = ['oldest', 'a_to_z', 'lowest'];

const sortLabels: Record<RecurringBillSortOption, string> = {
    latest: 'Latest',
    oldest: 'Oldest',
    a_to_z: 'A to Z',
    z_to_a: 'Z to A',
    highest: 'Highest',
    lowest: 'Lowest',
};

interface RecurringBillsProps {
    bills: Bill[];
    filters: {
        search: string;
        sort: RecurringBillSortOption;
    };
}

export default function RecurringBills({
    bills,
    filters,
}: RecurringBillsProps) {
    const [search, setSearch] = useState<string>(filters.search ?? '');
    const [sort, setSort] = useState<string>(filters.sort ?? 'latest');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                recurringBillsIndex().url,
                { search, sort },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, sort]);

    const totalBills = bills.reduce(
        (accumulator, bill) => accumulator + Number(bill.amount),
        0,
    );

    const totalPaid = bills
        .filter((bill: Bill) => bill.status === 'paid')
        .reduce((accumulator, bill) => accumulator + Number(bill.amount), 0);
    const totalUpcoming = bills
        .filter((bill: Bill) => bill.status === 'upcoming')
        .reduce((accumulator, bill) => accumulator + Number(bill.amount), 0);
    const totalDueSoon = bills
        .filter((bill: Bill) => bill.status === 'due_soon')
        .reduce((accumulator, bill) => accumulator + Number(bill.amount), 0);

    const paidLength = bills.filter(
        (bill: Bill) => bill.status === 'paid',
    ).length;
    const upcomingLength = bills.filter(
        (bill: Bill) => bill.status === 'upcoming',
    ).length;
    const dueSoonLength = bills.filter(
        (bill: Bill) => bill.status === 'due_soon',
    ).length;

    return (
        <>
            <Head title="recurring-bills" />
            <div className="grid max-w-265 grid-cols-1 gap-3 md:gap-6 xl:grid-cols-[337px_1fr]">
                <div className="flex flex-col gap-3 md:flex-row md:gap-6 xl:flex-col">
                    <div className="flex items-center gap-5 rounded-2xl bg-grey-900 px-5 py-6 md:w-1/2 md:flex-col md:items-start md:justify-center md:gap-8 xl:w-full">
                        <ReceiptIcon size={32} color="#fff" />
                        <div className="space-y-2.75">
                            <p className="preset-4 text-white">Total bills</p>
                            <p className="preset-1 text-white">
                                {currencyFormatter(Number(totalBills))}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-5 rounded-2xl bg-white p-5 md:w-1/2 xl:w-full">
                        <h2 className="preset-3 text-grey-900">Summary</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="preset-5 text-grey-500">
                                    Paid bills
                                </p>
                                <p className="preset-5-bold text-grey-900">
                                    {paidLength} ({currencyFormatter(totalPaid)}
                                    )
                                </p>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between">
                                <p className="preset-5 text-grey-500">
                                    Total Upcoming
                                </p>
                                <p className="preset-5-bold text-grey-900">
                                    {upcomingLength} (
                                    {currencyFormatter(totalUpcoming)})
                                </p>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between">
                                <p className="preset-5 text-secondary-red">
                                    Due Soon
                                </p>
                                <p className="preset-5-bold text-secondary-red">
                                    {dueSoonLength} (
                                    {currencyFormatter(totalDueSoon)})
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 rounded-2xl bg-white px-5 py-6 lg:w-full">
                    <div className="flex items-center justify-between gap-4">
                        <Input
                            type="text"
                            placeholder="Search bills"
                            value={search}
                            onChange={(e) => setSearch?.(e.target.value)}
                            className="max-w-[320px]"
                        />

                        <div className="flex items-center gap-2">
                            <span className="hidden w-12 preset-4 text-grey-500 md:inline-block">
                                Sort by
                            </span>

                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger
                                    id="sort"
                                    className={cn(
                                        'border-white shadow-none md:w-28.25 md:border-beige-500 md:shadow-xs',
                                    )}
                                >
                                    <SelectValue>
                                        <span className="flex items-center gap-2">
                                            {ascendingSorts.includes(sort) ? (
                                                <SortAscendingIcon
                                                    size={32}
                                                    weight="fill"
                                                    className="w-full sm:hidden"
                                                />
                                            ) : (
                                                <SortDescendingIcon
                                                    size={32}
                                                    weight="fill"
                                                    className="sm:hidden"
                                                    color="#201F24"
                                                />
                                            )}
                                            <span className="hidden sm:inline-block">
                                                {
                                                    sortLabels[
                                                        sort as RecurringBillSortOption
                                                    ]
                                                }
                                            </span>
                                        </span>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent className="px-5 py-3">
                                    {Object.entries(sortLabels).map(
                                        ([value, label], index, arr) => (
                                            <div key={value}>
                                                <SelectItem
                                                    value={value}
                                                    className={cn(
                                                        sort === value &&
                                                            'font-bold',
                                                    )}
                                                >
                                                    {label}
                                                </SelectItem>
                                                {index < arr.length - 1 && (
                                                    <SelectSeparator />
                                                )}
                                            </div>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="hidden preset-5 text-grey-500 lg:table-row">
                                <TableCell>Bill Title</TableCell>
                                <TableCell>Due Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bills.map((bill) => (
                                <TableRow key={bill.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="grid h-8 w-8 place-content-center rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        bill.category?.color,
                                                }}
                                            >
                                                <DynamicIcon
                                                    name={
                                                        bill.category?.icon ??
                                                        ''
                                                    }
                                                    width={16}
                                                    height={16}
                                                    color={'#fff'}
                                                    weight="fill"
                                                />
                                            </div>
                                            <span className="preset-4-bold">
                                                {bill.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 lg:hidden">
                                            <span
                                                className={cn(
                                                    'preset-5 text-grey-500',
                                                    {
                                                        'text-secondary-green':
                                                            bill.status ===
                                                            'paid',
                                                    },
                                                )}
                                            >
                                                {bill.frequency} -{' '}
                                                {bill.due_day}
                                            </span>
                                            {bill.status === 'paid' && (
                                                <CheckCircleIcon
                                                    size={16}
                                                    weight="fill"
                                                    color="#277C78"
                                                />
                                            )}
                                            {bill.status === 'due_soon' && (
                                                <WarningCircleIcon
                                                    size={16}
                                                    weight="fill"
                                                    color={'#FF4D4F'}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={cn(
                                                    'preset-5 text-grey-500',
                                                    {
                                                        'text-secondary-green':
                                                            bill.status ===
                                                            'paid',
                                                    },
                                                )}
                                            >
                                                {bill.frequency} -{' '}
                                                {bill.due_day}
                                            </span>
                                            {bill.status === 'paid' && (
                                                <CheckCircleIcon
                                                    size={16}
                                                    weight="fill"
                                                    color="#277C78"
                                                />
                                            )}
                                            {bill.status === 'due_soon' && (
                                                <WarningCircleIcon
                                                    size={16}
                                                    weight="fill"
                                                    color={'#FF4D4F'}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        className={cn('preset-4-bold', {
                                            'text-secondary-red':
                                                bill.status === 'due_soon',
                                        })}
                                    >
                                        {currencyFormatter(bill.amount)}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <DotsThreeIcon size={24} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="start"
                                                className="px-5 py-3"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <RecurringBillForm
                                                        bill={bill}
                                                    />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

RecurringBills.layout = {
    breadcrumbs: [
        {
            title: 'Recurring Bills',
            href: '/recurring-bills',
        },
    ],
};
