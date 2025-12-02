import AppLogo from '@/components/app-logo';
import Navbar from '@/components/navbar';
import UserMenu from '@/components/user-menu';
import { NavbarItem } from '@/types';
import { clsx } from 'clsx';

type SidebarProps = {
  isSidebarOpen: boolean;
  navbarItems: NavbarItem[];
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
          <Navbar
            navbarItems={navbarItems}
            isSidebarOpen={isSidebarOpen}
            isMobile={false}
          />

          {/* Sidebar Footer */}
          <UserMenu isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Sidebar Mobile */}
      <aside className="order-3 grid content-end bg-grey-900 text-white lg:hidden">
        <Navbar
          navbarItems={navbarItems}
          isSidebarOpen={isSidebarOpen}
          isMobile={true}
        />
      </aside>
    </>
  );
}
