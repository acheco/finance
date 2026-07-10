import {
    ArrowsDownUpIcon,
    ChartDonutIcon,
    HouseIcon,
    ReceiptIcon,
    TipJarIcon,
} from '@phosphor-icons/react';
import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { dashboard } from '@/routes';
import type { AppLayoutProps, NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: dashboard(),
        icon: HouseIcon,
    },
    {
        title: 'Transactions',
        href: '#',
        icon: ArrowsDownUpIcon,
    },
    {
        title: 'Budgets',
        href: '#',
        icon: ChartDonutIcon,
    },
    {
        title: 'Pots',
        href: '#',
        icon: TipJarIcon,
    },
    {
        title: 'Recurring bills',
        href: '#',
        icon: ReceiptIcon,
    },
];

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar items={mainNavItems} />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
