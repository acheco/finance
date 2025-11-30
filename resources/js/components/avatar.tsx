import { getInitials } from '@/lib/utils';
import { User } from '@/types';
import { clsx } from 'clsx';

type AvatarProps = {
  user: User;
  isSidebarOpen: boolean;
};
export default function Avatar({ user, isSidebarOpen }: AvatarProps) {
  return (
    <div className="flex items-center gap-3 px-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-beige-100 text-grey-900">
        <span>{getInitials(user.name)}</span>
      </div>
      <div
        className={clsx('transition-all duration-300', {
          'w-auto opacity-100': isSidebarOpen,
          'w-0 overflow-hidden opacity-0': !isSidebarOpen,
        })}
      >
        <p className="text-sm font-semibold whitespace-nowrap">{user.name}</p>
        <p className="text-grey-400 text-xs whitespace-nowrap">{user.email}</p>
      </div>
    </div>
  );
}
