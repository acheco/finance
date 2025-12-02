import AppLogo from '@/components/app-logo';
import Navbar from '@/components/navbar';
import UserMenu from '@/components/user-menu';
import { NavbarItem } from '@/types';
import { Link } from '@inertiajs/react';
import { clsx } from 'clsx';

type SidebarProps = {
  isSidebarOpen: boolean;
  navbarItems: NavbarItem[];
};

const currentRoute = (href: string) => {
  return window.location.pathname.startsWith(href);
};

export default function Sidebar({ isSidebarOpen, navbarItems }: SidebarProps) {
  return (
    <>
      {/* Sidebar desktop */}
      <aside
        className={clsx(
          'order-1 row-span-2 hidden transform rounded-r-2xl bg-grey-900 transition-transform duration-300 ease-in-out lg:block',
        )}
      >
        <div className="grid h-dvh grid-cols-1 grid-rows-[100px_1fr_100px] gap-4 text-white">
          {/* Sidebar Header */}
          <AppLogo isSidebarOpen={isSidebarOpen} />

          {/* Sidebar Content */}
          <Navbar navbarItems={navbarItems} isSidebarOpen={isSidebarOpen} />

          {/* Sidebar Footer */}
          <UserMenu isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside className="order-3 grid overflow-hidden bg-grey-900 text-white lg:hidden">
        <div className="flex items-center justify-evenly">
          {navbarItems.map((item) => (
            <div
              key={item.name}
              className={clsx(
                'mt-3 grid w-[68.6px] cursor-pointer grid-rows-[1fr_5px] hover:text-grey-100 md:w-[104px]',
                {
                  'rounded-t-md bg-beige-100': currentRoute(item.href),
                },
              )}
            >
              <div
                className={clsx(
                  'flex flex-col items-center justify-center pt-2 pb-2',
                )}
              >
                <Link
                  href={item.href}
                  className="flex flex-col items-center text-grey-300 hover:text-grey-100"
                >
                  {item.icon && (
                    <item.icon
                      size={24}
                      weight="fill"
                      className={clsx({
                        'text-green-custom': currentRoute(item.href),
                        'text-grey-300 hover:text-grey-100': !currentRoute(
                          item.href,
                        ),
                      })}
                    />
                  )}
                  <span
                    className={clsx(
                      'hidden text-xs font-bold text-grey-300 hover:text-grey-100 md:block',
                      {
                        'text-grey-900': currentRoute(item.href),
                      },
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              </div>

              <div
                className={clsx('h-2', {
                  'bg-green-custom': currentRoute(item.href),
                })}
              />
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
