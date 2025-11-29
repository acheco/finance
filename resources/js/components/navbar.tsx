import { Link } from '@inertiajs/react';
import { clsx } from 'clsx';

type NavbarProps = {
  navbarItems: {
    name: string;
    href: string;
    icon: any;
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
              <item.icon
                weight="fill"
                size={24}
                className={clsx({
                  'text-green-custom': currentRoute(item.href),
                  'text-grey-300 hover:text-grey-100': !currentRoute(item.href),
                })}
              />
              {isSidebarOpen && item.name}
            </Link>
          </div>
        </div>
      ))}
    </nav>
  );
}
