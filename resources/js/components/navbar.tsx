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
  isMobile: boolean;
};

const currentRoute = (href: string) => {
  return window.location.pathname.startsWith(href);
};

export default function Navbar({
  navbarItems,
  isSidebarOpen,
  isMobile,
}: NavbarProps) {
  return (
    <>
      {isMobile ? (
        <div className="flex h-[44px] justify-evenly md:h-[66px]">
          {navbarItems.map((item) => (
            <div
              key={item.name}
              className={clsx(
                'grid h-full w-[68.6px] cursor-pointer grid-rows-[1fr_5px] hover:text-grey-100 md:w-[104px]',
                {
                  'rounded-t-md bg-beige-100': currentRoute(item.href),
                },
              )}
            >
              <div
                className={clsx(
                  'flex flex-col items-center justify-center pt-2',
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
                className={clsx('h-2 pt-2', {
                  'bg-green-custom': currentRoute(item.href),
                })}
              />
            </div>
          ))}
        </div>
      ) : (
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
                  className={clsx(
                    'flex items-center gap-2 text-[16px] font-bold',
                  )}
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
      )}
    </>
  );
}
