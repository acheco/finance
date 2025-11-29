import Sidebar from '@/components/sidebar';
import { clsx } from 'clsx';
import React from 'react';

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
        'grid h-screen grid-cols-1 grid-rows-[64px_1fr_52px] gap-4 bg-beige-100 md:grid-rows-[64px_1fr_74px] lg:grid-rows-[64px_1fr] lg:pr-4',
        {
          'lg:grid-cols-[300px_1fr]': isSidebarOpen,
          'lg:grid-cols-[88px_1fr]': !isSidebarOpen,
        },
      )}
    >
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Header - arriba siempre */}
      <header className="order-1 p-4 text-3xl font-bold md:order-2">
        <button className="text-grey-900" onClick={toggleSidebar}>
          toggle
        </button>
        {title}
      </header>

      {/* Main Content - medio en mobile, derecha en desktop */}
      <main className="order-2 mx-4 overflow-auto rounded-xl bg-white p-4 shadow md:mb-4 lg:order-3">
        {children}
      </main>
    </div>
  );
}
