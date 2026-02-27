import { usePage } from '@inertiajs/react';
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  ReceiptIcon,
  TipJarIcon,
} from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import MobileNav from '@/components/mobile-nav';
import Sidebar from '@/components/sidebar';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { index as pot } from '@/routes/pots';
import { edit } from '@/routes/profile';

const navigationItems = [
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
    href: pot().url,
    icon: TipJarIcon,
  },
  {
    name: 'Recurring Bills',
    href: '#',
    icon: ReceiptIcon,
  },
  {
    name: 'Settings',
    href: edit().url,
    icon: GearIcon,
  },
];

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export default function AppSidebarNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen } = usePage<{ sidebarOpen: boolean }>().props;
  const url = usePage().url;
  const appName = usePage<{ name: string }>().props.name;
  const [isMinimized, setIsMinimized] = useState(!sidebarOpen);

  useEffect(() => {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${!isMinimized}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=Lax`;
  }, [isMinimized]);

  const isSettingsActive = url.startsWith('/settings');
  const activeUrl = isSettingsActive ? edit().url : url;

  return (
    <div className="flex h-screen flex-col bg-beige-100 lg:grid lg:grid-cols-1 lg:grid-rows-1">
      <div
        className={cn(
          'flex-1 overflow-hidden transition-all duration-300 lg:grid lg:grid-cols-1',
          isMinimized ? 'lg:grid-cols-[80px_1fr]' : 'lg:grid-cols-[300px_1fr]',
        )}
      >
        <Sidebar
          appName={appName}
          navigationItems={navigationItems}
          url={activeUrl}
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
          className="hidden lg:grid"
        />

        <main className="h-full overflow-y-auto py-6 xs:px-4 md:px-10 md:py-8 lg:max-w-7xl">
          {children}
        </main>
      </div>

      <footer className="shrink-0 bg-grey-900 pt-2 sm:px-2 md:px-5 lg:hidden">
        <MobileNav navItems={navigationItems} currentPath={activeUrl} />
      </footer>
    </div>
  );
}
