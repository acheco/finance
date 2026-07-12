import { Head } from '@inertiajs/react';
import { AccountColumns } from '@/columns/Accounts';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import type { PaginatedAccount } from '@/types/account';

export default function Index({ accounts }: { accounts: PaginatedAccount }) {
    return (
        <div className="max-w-4xl space-y-6">
            <Head title="Bank Index Settings" />

            <h1 className="sr-only">Bank Index Settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Bank Accounts"
                    description="Manage your bank accounts and payment methods"
                />
            </div>

            <div>
                {accounts.data.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                        account not found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 rounded-md bg-white px-2 py-4 md:px-4 md:py-6 xl:px-6 xl:py-8">
                        <DataTable
                            data={accounts.data}
                            columns={AccountColumns}
                            rowKey={(account) => account.id}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Bank Account settings',
            href: '/settings/account',
        },
    ],
};
