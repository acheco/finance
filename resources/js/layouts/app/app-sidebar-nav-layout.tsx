import { usePage } from '@inertiajs/react';
import { ArrowsDownUpIcon, ChartDonutIcon, GearIcon, HouseIcon, ReceiptIcon, TipJarIcon } from '@phosphor-icons/react';
import React, { useState } from 'react';
import MobileNav from '@/components/mobile-nav';
import Sidebar from '@/components/sidebar';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

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
    href: '#',
    icon: TipJarIcon,
  },
  {
    name: 'Recurring Bills',
    href: '#',
    icon: ReceiptIcon,
  },
  {
    name: 'Settings',
    href: '#',
    icon: GearIcon,
  },
];

export default function AppSidebarNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { url } = usePage();
  const appName = usePage<{ name: string }>().props.name;

  const [isMinimized, setIsMinimized] = useState(false);

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
          url={url}
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
          className="hidden lg:grid"
        />

        <main className="h-full overflow-y-auto px-4 py-6 md:px-10 md:py-8 lg:max-w-7xl">
          {children}
        </main>
      </div>

      <footer className="shrink-0 bg-grey-900 pt-2 sm:px-2 md:px-5 lg:hidden">
        <MobileNav navItems={navigationItems} currentPath={url} />
      </footer>
    </div>
  );
}
