import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    const { open } = useSidebar();

    return (
        <SidebarGroup className="py-0">
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem
                        key={item.title}
                        className={cn(
                            'flex h-14 cursor-pointer items-center rounded-r-lg px-8 py-4 preset-3 text-grey-300',
                            'hover:border-l-4 hover:border-secondary-green hover:bg-beige-100 hover:text-grey-900',
                            isCurrentUrl(item.href) &&
                                'border-l-4 border-secondary-green bg-beige-100 text-grey-900',
                        )}
                    >
                        <Link
                            href={item.href}
                            prefetch
                            className={cn('flex gap-4')}
                        >
                            {item.icon && (
                                <item.icon
                                    size={24}
                                    weight="fill"
                                    color={cn(
                                        isCurrentUrl(item.href)
                                            ? '#277C78'
                                            : '#B3B3B3',
                                    )}
                                />
                            )}
                            <span
                                className={cn(
                                    'preset-3',
                                    !open ? 'hidden' : 'block',
                                )}
                            >
                                {item.title}
                            </span>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
