import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar({ items }: { items: NavItem[] }) {
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
                <NavMain items={items} />
            </SidebarContent>

            <SidebarFooter className={cn('space-y-6 pb-10', open && 'px-8')}>
                <NavUser />
                <SidebarTrigger />
            </SidebarFooter>
        </Sidebar>
    );
}
