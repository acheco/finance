import Avatar from '@/components/avatar';
import UserInfo from '@/components/user-info';
import { dashboard, logout } from '@/routes';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { GearIcon, SignOutIcon } from '@phosphor-icons/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

type UserMenuProps = {
  isSidebarOpen?: boolean;
};

export default function UserMenu({ isSidebarOpen }: UserMenuProps) {
  const { user } = usePage<SharedData>().props.auth;

  return (
    <DropdownMenu dir="ltr">
      <DropdownMenuTrigger asChild>
        <button className="text-left hover:cursor-pointer">
          <UserInfo user={user} isSidebarOpen={isSidebarOpen} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-white p-2 text-sm shadow-md"
      >
        <DropdownMenuLabel className="flex items-center gap-4">
          <Avatar src={user.avatar} alt={user.name} fallback={user.name} />
          <div className="flex flex-col">
            <span className="truncate text-xs font-medium text-grey-900">
              {user.name}
            </span>
            <span className="truncate text-xs text-grey-900">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1.5 h-[1px] bg-grey-300" />
        <DropdownMenuItem asChild className="flex items-center gap-2">
          <Link
            href={dashboard().url}
            className="rounded-md p-1 text-grey-900 hover:bg-grey-100"
          >
            <GearIcon size={18} />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1.5 h-[1px] bg-grey-300" />
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 hover:border-0"
        >
          <Link
            href={logout()}
            className="w-full cursor-pointer rounded-md p-1 text-grey-900 hover:bg-grey-100"
          >
            <SignOutIcon size={18} />
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
