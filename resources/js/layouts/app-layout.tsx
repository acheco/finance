import AppLayoutTemplate from '@/layouts/app/app-sidebar-nav-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>
);
