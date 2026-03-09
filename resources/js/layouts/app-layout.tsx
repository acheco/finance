import { useToastFlash } from '@/hooks/use-toast-flash';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-nav-layout';
import type { AppLayoutProps } from '@/types';

export default function AppLayout({ children, ...props }: AppLayoutProps) {
  useToastFlash();
  return <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>;
}
