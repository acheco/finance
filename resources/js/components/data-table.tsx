import { usePage } from '@inertiajs/react';
import {
    FunnelIcon,
    SortAscendingIcon,
    SortDescendingIcon,
} from '@phosphor-icons/react';
import { Fragment } from 'react';
import DataTablePagination from '@/components/data-table-pagination';
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
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@/types/datatable';
import type { PaginationMeta } from '@/types/pagination';
import type { TransactionSortOption } from '@/types/transaction';

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    pagination?: PaginationMeta;
    rowKey: (row: TData) => string | number;
    emptyMessage?: string;
    search?: string;
    setSearch?: (search: string) => void;
    sort?: string;
    setSort?: (sort: string) => void;
    category?: string;
    setCategory?: (category: string) => void;
    withCategory?: boolean;
    children?: React.ReactNode;
}

export function DataTable<TData extends Record<string, any>>({
    columns,
    data,
    pagination,
    rowKey,
    emptyMessage = 'Data not found.',
    search,
    setSearch,
    sort,
    setSort,
    category,
    setCategory,
    withCategory = false,
    children,
}: DataTableProps<TData>) {
    const ascendingSorts = ['oldest', 'a_to_z', 'lowest'];

    const { categories } = usePage().props;

    const sortLabels: Record<TransactionSortOption, string> = {
        latest: 'Latest',
        oldest: 'Oldest',
        a_to_z: 'A to Z',
        z_to_a: 'Z to A',
        highest: 'Highest',
        lowest: 'Lowest',
    };

    return (
        <div className="">
            <div className="mb-4 flex items-center justify-between md:space-x-6">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch?.(e.target.value)}
                    className="max-w-[320px]"
                />

                <div className="flex flex-row items-center justify-between md:space-x-6">
                    {sort && (
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
                                                        sort as TransactionSortOption
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
                    )}

                    {withCategory && (
                        <div className="flex items-center gap-2">
                            <span className="hidden w-15 preset-4 text-grey-500 md:inline-block">
                                Category
                            </span>

                            <Select
                                value={category}
                                onValueChange={setCategory}
                            >
                                <SelectTrigger
                                    id="category"
                                    className={cn(
                                        'border-white shadow-none md:w-[177px] md:border-beige-500 md:shadow-xs',
                                    )}
                                >
                                    <SelectValue>
                                        <span className="flex items-center gap-2">
                                            <FunnelIcon
                                                width={12}
                                                height={12}
                                                weight="fill"
                                                color="#201F24"
                                                className="w-full sm:hidden"
                                            />
                                            <span className="hidden sm:inline-block">
                                                {category === 'All Transactions'
                                                    ? 'All Transactions'
                                                    : categories.find(
                                                          (cat) =>
                                                              String(cat.id) ===
                                                              category,
                                                      )?.name}
                                            </span>
                                        </span>
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent
                                    position="popper"
                                    className="px-5 py-3"
                                >
                                    <SelectItem value="All Transactions">
                                        All Transactions
                                    </SelectItem>
                                    <SelectSeparator />
                                    {categories.map((cat, index) => (
                                        <Fragment key={cat.id}>
                                            <SelectItem
                                                value={String(cat.id)}
                                                className={cn(
                                                    category ===
                                                        String(cat.id) &&
                                                        'font-bold',
                                                )}
                                            >
                                                {cat.name}
                                            </SelectItem>
                                            {index < categories.length - 1 && (
                                                <SelectSeparator />
                                            )}
                                        </Fragment>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
                {children}
            </div>

            <div className="rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={cn(
                                        'preset-5 text-grey-500',
                                        column.className,
                                    )}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length ? (
                            data.map((row) => (
                                <TableRow key={rowKey(row)}>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            className={cn(column.className)}
                                        >
                                            {column.render
                                                ? column.render(row)
                                                : row[column.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {pagination && (
                <div className="mt-4 flex items-center justify-between">
                    <DataTablePagination pagination={pagination} />
                </div>
            )}
        </div>
    );
}
