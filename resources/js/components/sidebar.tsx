import AppLogoIcon from '@/components/app-logo-icon';
import Navbar from '@/components/navbar';
import { getInitials } from '@/lib/utils';
import { dashboard } from '@/routes';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  TipJarIcon,
} from '@phosphor-icons/react';
import { clsx } from 'clsx';

const navbarItems = [
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

type SidebarProps = {
  isSidebarOpen: boolean;
};

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const user = usePage<SharedData>().props.auth.user;

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="order-1 row-span-2 hidden rounded-r-2xl bg-grey-900 lg:block">
        <div className="grid h-dvh grid-cols-1 grid-rows-[100px_1fr_100px] gap-4 text-white">
          <div className="flex items-center gap-4 p-4">
            <AppLogoIcon
              fill="#ffffff"
              className={clsx('h-8 w-8', { 'm-auto': !isSidebarOpen })}
            />
            {isSidebarOpen && <h1 className="text-2xl font-bold">Finance</h1>}
          </div>

          <Navbar navbarItems={navbarItems} isSidebarOpen={isSidebarOpen} />

          <div className="flex items-center gap-2 p-4">
            <button className="hover:bg-grey-200 rounded-full bg-grey-100 p-2 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-grey-900 focus:outline-none">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className="h-10 w-10" />
              ) : (
                <span className="text-2xl">{getInitials(user.name)}</span>
              )}
            </button>
            <div
              className={clsx('flex flex-col gap-1', {
                hidden: !isSidebarOpen,
              })}
            >
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
