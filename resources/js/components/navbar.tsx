import { Link } from '@inertiajs/react';
import { Icon } from '@phosphor-icons/react';
import { clsx } from 'clsx';

type NavbarProps = {
  navbarItems: {
    name: string;
    href: string;
    icon?: Icon;
  }[];
  isSidebarOpen: boolean;
};

const currentRoute = (href: string) => {
  return window.location.pathname.startsWith(href);
};

export default function Navbar({ navbarItems, isSidebarOpen }: NavbarProps) {
  return (
    <nav className="flex flex-col gap-4">
      {navbarItems.map((item) => (
        <div
          key={item.name}
          className={clsx('flex rounded-r-md p-4 text-grey-300', {
            'border-l-4 border-green-custom bg-white text-grey-900':
              currentRoute(item.href),
            'max-w-[276px]': isSidebarOpen,
            'max-w-[80px] items-center justify-center': !isSidebarOpen,
          })}
        >
          <div
            className={clsx(
              { 'hover:text-grey-100': !currentRoute(item.href) },
              'flex items-center gap-2',
            )}
          >
            <Link
              href={item.href}
              className={clsx('flex items-center gap-2 text-[16px] font-bold')}
              prefetch
            >
              {item.icon && (
                <item.icon
                  weight="fill"
                  size={24}
                  className={clsx('flex-shrink-0', {
                    'text-green-custom': currentRoute(item.href),
                    'text-grey-300 hover:text-grey-100': !currentRoute(
                      item.href,
                    ),
                  })}
                />
              )}
              <span
                className={clsx(
                  'whitespace-nowrap transition-all duration-300',
                  {
                    'w-auto opacity-100': isSidebarOpen,
                    'w-0 overflow-hidden opacity-0': !isSidebarOpen,
                  },
                )}
              >
                {item.name}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </nav>
  );
}
