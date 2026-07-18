export interface ColumnDef<TData> {
    key: string;
    header: string;
    render?: (row: TData) => React.ReactNode;
    className?: string;
}

