import { Link } from '@inertiajs/react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/types';

export default function AppMobileNavbar({ items }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <footer className="fixed right-0 bottom-0 left-0 z-50 w-full border-t lg:hidden">
            <ul className="flex h-13 justify-around bg-grey-900 px-4 pt-2 md:h-18.5">
                {items.map((item) => (
                    <li
                        key={item.title}
                        className={cn(
                            'group/nav-item flex w-[68.6px] items-center justify-center hover:rounded-t-md hover:border-b-4 hover:border-secondary-green hover:bg-beige-100 hover:text-grey-900 md:w-26',
                            {
                                'rounded-t-md border-b-4 border-secondary-green bg-beige-100':
                                    isCurrentUrl(item.href),
                            },
                        )}
                    >
                        <Link
                            href={item.href}
                            prefetch
                            className="flex flex-col items-center"
                        >
                            {item.icon && (
                                <item.icon
                                    size={24}
                                    weight="fill"
                                    className={cn(
                                        'group-hover/nav-item:text-[#277C78]',
                                        isCurrentUrl(item.href)
                                            ? 'text-[#277C78]'
                                            : 'text-[#B3B3B3]',
                                    )}
                                />
                            )}
                            <span
                                className={cn(
                                    'hidden preset-5-bold group-hover/nav-item:text-grey-900 md:block',
                                    isCurrentUrl(item.href)
                                        ? 'text-grey-900'
                                        : 'text-grey-300',
                                )}
                            >
                                {item.title}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    );
}
