export interface ColumnDef<TData> {
    key: string;
    header: React.ReactNode;
    render?: (row: TData) => React.ReactNode;
    className?: string;
}
