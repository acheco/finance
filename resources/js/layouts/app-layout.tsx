import Sidebar from '@/components/sidebar';
import { dashboard } from '@/routes';
import {
  ArrowsDownUpIcon,
  ChartDonutIcon,
  GearIcon,
  HouseIcon,
  SidebarSimpleIcon,
  TipJarIcon,
} from '@phosphor-icons/react';
import { clsx } from 'clsx';
import React from 'react';

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
interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div
      className={clsx(
        'grid h-screen grid-cols-1 grid-rows-[64px_1fr_52px] gap-1 bg-beige-100 transition-all duration-300 ease-in-out md:grid-rows-[64px_1fr_74px] lg:grid-rows-[64px_1fr] lg:pr-4',
        {
          'lg:grid-cols-[300px_1fr]': isSidebarOpen,
          'lg:grid-cols-[88px_1fr]': !isSidebarOpen,
        },
      )}
    >
      <Sidebar isSidebarOpen={isSidebarOpen} navbarItems={navbarItems} />

      {/* Header - arriba siempre */}
      <header className="order-1 flex items-center gap-4 p-4 text-3xl font-bold md:order-2">
        <button
          className="hidden text-grey-900 lg:block"
          onClick={toggleSidebar}
        >
          <SidebarSimpleIcon size={24} weight="fill" />
        </button>
        <h1 className="text-3xl text-grey-900">{title}</h1>
      </header>

      {/* Main Content - medio en mobile, derecha en desktop */}
      <main className="order-2 mx-4 overflow-auto rounded-xl bg-white p-4 shadow md:mb-4 lg:order-3">
        {children}
      </main>
    </div>
  );
}
