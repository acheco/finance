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
import AppMobileNavbar from '@/components/AppMobileNavbar';
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
            <AppContent
                variant="sidebar"
                className="h-screen space-y-8 overflow-x-hidden bg-beige-100 px-4 py-6 md:px-10 md:py-8"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
                <AppMobileNavbar items={mainNavItems} />
            </AppContent>
        </AppShell>
    );
}
