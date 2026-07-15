import DataTablePagination from '@/components/data-table-pagination';
import AccountForm from '@/components/modals/AccountForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { PaginationMeta } from '@/types/pagination';

export interface ColumnDef<TData> {
    key: string;
    header: string;
    render?: (row: TData) => React.ReactNode;
    className?: string;
}

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    pagination?: PaginationMeta;
    rowKey: (row: TData) => string | number;
    emptyMessage?: string;
    search?: string;
    setSearch?: (search: string) => void;
}

export function DataTable<TData extends Record<string, any>>({
    columns,
    data,
    pagination,
    rowKey,
    emptyMessage = 'Data not found.',
    search,
    setSearch,
}: DataTableProps<TData>) {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between gap-6">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch?.(e.target.value)}
                />

                <AccountForm>
                    <Button size="lg">Add account</Button>
                </AccountForm>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead
                                    key={column.key}
                                    className={column.className}
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
                                            className={column.className}
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
