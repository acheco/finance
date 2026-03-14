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

export type EmptyBlockProps = {
  title: string;
  description: string;
  iconName: string;
  children: ReactNode;
};

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  name?: string;
  defaultValue?: string | Date;
};
