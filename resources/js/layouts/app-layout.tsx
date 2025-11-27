import Sidebar from '@/components/sidebar';

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <div className="grid h-screen grid-cols-1 grid-rows-[64px_1fr_52px] gap-4 bg-beige-100 md:grid-rows-[64px_1fr_74px] lg:grid-cols-[300px_1fr] lg:grid-rows-[64px_1fr] lg:pr-4">
      <Sidebar />

      {/* Header - arriba siempre */}
      <header className="order-1 p-4 text-3xl font-bold md:order-2">
        {title}
      </header>

      {/* Main Content - medio en mobile, derecha en desktop */}
      <main className="order-2 mx-4 overflow-auto rounded-xl bg-white p-4 shadow md:mb-4 lg:order-3">
        {children}
      </main>
    </div>
  );
}
