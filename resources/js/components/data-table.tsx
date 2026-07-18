import {
    FunnelIcon,
    SortAscendingIcon,
    SortDescendingIcon,
} from '@phosphor-icons/react';
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
    children,
}: DataTableProps<TData>) {
    const ascendingSorts = ['oldest', 'a_to_z', 'lowest'];

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
            <div className="mb-4 flex items-center justify-between space-x-6">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch?.(e.target.value)}
                />

                <div className="flex flex-row items-center justify-between space-x-6">
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
                                <SelectContent className="px-5">
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

                    {sort && (
                        <div className="flex items-center gap-2">
                            <span className="hidden w-15 preset-4 text-grey-500 md:inline-block">
                                Category
                            </span>

                            <Select value={sort} onValueChange={setSort}>
                                <SelectTrigger
                                    id="sort"
                                    className={cn(
                                        'border-white shadow-none md:w-[177px] md:border-beige-500 md:shadow-xs',
                                    )}
                                >
                                    <SelectValue>
                                        <span className="flex items-center gap-2">
                                            <FunnelIcon
                                                size={32}
                                                weight="fill"
                                            />
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
                                <SelectContent className="px-5">
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
                </div>

                {children}
            </div>

            <div className="rounded-md border">
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
