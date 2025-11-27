import AppLogoIcon from '@/components/app-logo-icon';
import { dashboard } from '@/routes';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  TipJarIcon,
} from '@phosphor-icons/react';
import { clsx } from 'clsx';

const NavbarItem = [
  {
    name: 'Overview',
    href: dashboard().url,
    icon: HouseIcon,
  },
  {
    name: 'Transactions',
    href: '#',
    icon: ArrowsDownUpIcon,
  },
  {
    name: 'Budgets',
    href: '#',
    icon: ChartDonutIcon,
  },
  {
    name: 'Pots',
    href: '#',
    icon: TipJarIcon,
  },
  {
    name: 'Settings',
    href: '#',
    icon: GearIcon,
  },
];

const currentRoute = (href: string) => {
  return window.location.pathname.startsWith(href);
};

export default function Sidebar() {
  const user = usePage<SharedData>().props.auth.user;

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="order-1 row-span-2 hidden rounded-r-2xl bg-grey-900 lg:block">
        <div className="grid h-dvh grid-cols-1 grid-rows-[100px_1fr_100px] gap-4 text-white">
          <div className="flex items-center gap-4 p-4">
            <AppLogoIcon fill="#ffffff" className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Finance</h1>
          </div>
          <nav className="flex flex-col gap-4">
            {NavbarItem.map(({ name, href, icon: Icon }) => (
              <div
                key={name}
                className={clsx(
                  'flex max-w-[276px] rounded-r-md p-4 text-grey-300',
                  {
                    'border-l-4 border-green-custom bg-white text-grey-900':
                      currentRoute(href),
                  },
                )}
              >
                <Link
                  href={href}
                  className={clsx(
                    'flex items-center gap-2 text-[16px] font-bold',
                  )}
                >
                  <Icon
                    weight="fill"
                    size={24}
                    className={clsx({
                      'text-green-custom': currentRoute(href),
                      'text-grey-300': !currentRoute(href),
                    })}
                  />
                  {name}
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex items-center justify-center gap-4 p-4">
            <button className="rounded-full bg-grey-900 p-2">
              <img src={user.avatar} alt="avatar" className="h-10 w-10" />
            </button>
            <div>
              <h2 className="text-sm font-bold">{user.name}</h2>
              <span className="text-xs text-grey-300">{user.email}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside className="order-3 bg-grey-900 text-white lg:hidden">
        Sidebar
      </aside>
    </>
  );
}
