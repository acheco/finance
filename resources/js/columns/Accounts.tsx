import { Link, router } from '@inertiajs/react';
import { DotsThreeIcon } from '@phosphor-icons/react';
import AccountController from '@/actions/App/Http/Controllers/Settings/AccountController';
import type { ColumnDef } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DynamicIcon } from '@/components/ui/icon';
import { cn, currencyFormatter } from '@/lib/utils';
import { create } from '@/routes/account';
import type { Account } from '@/types/account';

export const AccountColumns: ColumnDef<Account>[] = [
    {
        key: 'name',
        header: 'Name',
        render: (account) => (
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        `flex h-6 w-6 items-center justify-center rounded-full`,
                    )}
                    style={{ backgroundColor: account.color || '#201F24' }}
                >
                    {account.icon && (
                        <DynamicIcon
                            name={account.icon}
                            color="white"
                            size={16}
                            weight="fill"
                        />
                    )}
                </div>
                <div>
                    <p className="preset-4-bold text-grey-900">
                        {account.name}
                    </p>
                    <p className="preset-5 text-grey-500 md:hidden">
                        {account.type}
                    </p>
                </div>
            </div>
        ),
    },
    {
        key: 'type',
        header: 'Type',
        className: 'hidden md:table-cell',
        render: (account) => (
            <p className="hidden preset-5 text-grey-500 md:table-cell">
                {account.type}
            </p>
        ),
    },
    {
        key: 'balance',
        header: 'Balance',
        render: (row) => `${currencyFormatter(row.balance)}`,
    },
    {
        key: '',
        header: '',
        render: (account) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsThreeIcon className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link
                            href={create()}
                            className="cursor-pointer"
                            prefetch
                        >
                            Edit Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onSelect={() =>
                            router.delete(
                                AccountController.destroy.url(account.id),
                                { preserveScroll: true },
                            )
                        }
                    >
                        Delete Account
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
