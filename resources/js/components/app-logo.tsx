import AppLogoIcon from '@/components/app-logo-icon';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { clsx } from 'clsx';

export default function AppLogo({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const { name } = usePage<SharedData>().props;
  return (
    <div className="flex items-center gap-4 p-4">
      <AppLogoIcon fill="#ffffff" className={clsx('h-8 w-8 flex-shrink-0')} />
      <span
        className={clsx('text-xl font-bold transition-all duration-300', {
          'w-auto opacity-100': isSidebarOpen,
          'w-0 overflow-hidden opacity-0': !isSidebarOpen,
        })}
      >
        {name}
      </span>
    </div>
  );
}
