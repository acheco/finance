import { Link } from '@inertiajs/react';
import {
    ArrowsDownUpIcon,
    HouseIcon,
    ChartDonutIcon,
    TipJarIcon,
    ReceiptIcon,
} from '@phosphor-icons/react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

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

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href={dashboard()} prefetch className="">
                            {open ? <AppLogo /> : <AppLogoIcon />}
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="py-6">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
