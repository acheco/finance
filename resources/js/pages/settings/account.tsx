import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';

export default function Account() {
    return (
        <>
            <Head title="Bank Account Settings" />

            <h1 className="sr-only">Bank Account Settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Bank Accounts"
                    description="Manage your bank accounts and payment methods"
                />
            </div>
        </>
    );
}

Account.layout = {
    breadcrumbs: [
        {
            title: 'Bank Accounts settings',
            href: '/settings/account',
        },
    ],
};
