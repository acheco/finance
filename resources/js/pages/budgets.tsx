import { Head, setLayoutProps } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { index as budget } from '@/routes/budgets';

export default function Budgets({}) {
    useEffect(() => {
        setLayoutProps({
            headerAction: <Button size="xl">+ Add New Budget</Button>,
        });
    }, []);

    return (
        <>
            <Head title="budgets" />
        </>
    );
}

Budgets.layout = {
    breadcrumbs: [
        {
            title: 'budgets',
            href: budget(),
        },
    ],
};
