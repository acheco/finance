import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import type { BreadcrumbItem } from './navigation';

export type AppLayoutProps = {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
};

export type AuthLayoutProps = {
  children?: ReactNode;
  name?: string;
  title?: string;
  description?: string;
};

export type FormModalProps = {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
};

export interface DatatableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
