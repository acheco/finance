import Avatar from '@/components/avatar';
import { User } from '@/types';
import { CaretUpDownIcon } from '@phosphor-icons/react';
import { clsx } from 'clsx';

type UserInfoProps = {
  user: User;
  isSidebarOpen?: boolean;
  className?: string;
};
export default function UserInfo({ user, isSidebarOpen }: UserInfoProps) {
  return (
    <div className="px-4 text-sm">
      <div className="flex cursor-pointer items-center gap-3 p-2 hover:rounded-md hover:bg-grey-300/10 hover:shadow-lg">
        <Avatar
          src={user.avatar}
          alt={user.name}
          fallback={user.name}
          className="font-semibold"
        />
        <div
          className={clsx('flex w-full items-center justify-between', {
            'w-auto opacity-100': isSidebarOpen,
            'w-0 overflow-hidden opacity-0': !isSidebarOpen,
          })}
        >
          <div className="flex flex-col">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs text-grey-300">{user.email}</span>
          </div>
          <CaretUpDownIcon size={18} weight="fill" />
        </div>
      </div>
    </div>
  );
}
