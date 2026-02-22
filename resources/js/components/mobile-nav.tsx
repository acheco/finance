import { Link } from '@inertiajs/react';
import type { Icon } from '@phosphor-icons/react';
import { cn, isSameUrl } from '@/lib/utils';

type MobileNavProps = {
  navItems: {
    name: string;
    href: string;
    icon: Icon;
  }[];
  currentPath: string;
};

export default function MobileNav({ navItems, currentPath }: MobileNavProps) {
  return (
    <nav className="flex h-11 items-center justify-between md:h-16.5 md:gap-5">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            'xs:w-15 grid h-full w-13 flex-col content-between rounded-t-md md:w-26',
            isSameUrl(currentPath, item.href) && 'bg-beige-100',
          )}
        >
          <item.icon
            width={24}
            height={24}
            weight="fill"
            color={cn(
              isSameUrl(currentPath, item.href)
                ? 'hsl(177, 52%, 32%)'
                : 'hsl(0, 0%, 70%)',
            )}
            className="m-auto mt-2"
          />
          <span
            className={cn(
              'm-auto hidden text-xs font-bold md:block',
              isSameUrl(currentPath, item.href)
                ? 'text-grey-900'
                : 'text-grey-300',
            )}
          >
            {item.name}
          </span>
          <div
            className={cn(
              'h-1 w-full',
              isSameUrl(currentPath, item.href) && 'bg-green-custom',
            )}
          />
        </Link>
      ))}
    </nav>
  );
}
