import AppLogo from '@/components/app-logo';
import Avatar from '@/components/avatar';
import Navbar from '@/components/navbar';
import { NavbarItem, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { clsx } from 'clsx';

type SidebarProps = {
  isSidebarOpen: boolean;
  navbarItems: NavbarItem[];
};

export default function Sidebar({ isSidebarOpen, navbarItems }: SidebarProps) {
  const user = usePage<SharedData>().props.auth.user;

  return (
    <>
      {/* Sidebar desktop */}
      <aside
        className={clsx(
          'order-1 row-span-2 hidden transform rounded-r-2xl bg-grey-900 transition-transform duration-300 ease-in-out lg:block',
        )}
      >
        <div className="grid h-dvh grid-cols-1 grid-rows-[100px_1fr_100px] gap-4 text-white">
          <AppLogo isSidebarOpen={isSidebarOpen} />
          <Navbar navbarItems={navbarItems} isSidebarOpen={isSidebarOpen} />
          <Avatar user={user} isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside className="order-3 bg-grey-900 text-white lg:hidden">
        Sidebar
      </aside>
    </>
  );
}
