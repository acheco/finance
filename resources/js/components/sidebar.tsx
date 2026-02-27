import { Link } from '@inertiajs/react';
import type { Icon } from '@phosphor-icons/react';
import {
  ArrowFatLinesLeftIcon,
  ArrowFatLinesRightIcon,
} from '@phosphor-icons/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { cn, isSameUrl } from '@/lib/utils';
import { dashboard } from '@/routes';

type SidebarProps = {
  appName: string;
  navigationItems: {
    name: string;
    href: string;
    icon: Icon;
  }[];
  url: string;
  isMinimized: boolean;
  setIsMinimized: (isMinimized: boolean) => void;
  className?: string;
};

export default function Sidebar({
  appName,
  navigationItems,
  url,
  isMinimized,
  setIsMinimized,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'relative z-10 hidden rounded-r-2xl bg-grey-900 transition-all duration-300 lg:grid lg:grid-rows-[101px_1fr_163px]',
        isMinimized ? 'w-20' : 'w-75',
        className,
      )}
    >
      <Link
        href={dashboard()}
        className={cn(
          'flex items-center gap-2 py-10',
          isMinimized ? 'justify-center' : 'px-8',
        )}
      >
        <AppLogoIcon fill="hsl(0, 0%, 70%)" />
        {!isMinimized && (
          <span className="text-2xl font-bold text-grey-300">{appName}</span>
        )}
      </Link>
      <nav className="flex flex-col gap-2">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            prefetch={true}
            className={cn(
              'flex h-14 items-center gap-2 rounded-r-lg text-grey-300 transition-all duration-300',
              isSameUrl(url, item.href) && 'bg-beige-100 text-grey-900',
              isMinimized ? '' : 'w-69',
            )}
          >
            <div
              className={cn(
                'mr-4 h-full w-1.5',
                isSameUrl(url, item.href) && 'bg-green-custom',
              )}
            />
            <item.icon
              weight="fill"
              color={cn(
                isSameUrl(url, item.href)
                  ? 'hsl(177, 52%, 32%)'
                  : 'hsl(0, 0%, 70%)',
              )}
              className={cn('h-6 w-6')}
            />
            {!isMinimized && (
              <span className="text-[16px] font-bold">{item.name}</span>
            )}
          </Link>
        ))}
      </nav>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-2 py-4 transition-all duration-300',
          isMinimized ? 'justify-center' : 'px-8',
        )}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {isMinimized ? (
          <ArrowFatLinesRightIcon
            size={24}
            weight="fill"
            color="hsl(0, 0%, 70%)"
          />
        ) : (
          <ArrowFatLinesLeftIcon
            size={24}
            weight="fill"
            color="hsl(0, 0%, 70%)"
          />
        )}

        {!isMinimized && (
          <span className="text-[16px] text-grey-300">Minimize Menu</span>
        )}
      </div>
    </aside>
  );
}
