import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CategoryColumns } from '@/columns/category-columns';
import { DataTable } from '@/components/data-table';
import Heading from '@/components/heading';
import CategoryForm from '@/components/modals/CategoryForm';
import { Button } from '@/components/ui/button';
import { index } from '@/routes/category';
import type { PaginatedCategory } from '@/types/category';

interface CategoryProps {
    categories: PaginatedCategory;
    filters: {
        search: string;
    };
}

export default function Categories({ categories, filters }: CategoryProps) {
    const [search, setSearch] = useState<string>(filters.search ?? '');

    const { data, ...pagination } = categories;

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                index().url,
                { search },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <div className="max-w-4xl space-y-6">
            <Head title="categories" />

            <h1 className="sr-only">Finance Categories Settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="App Categories"
                    description="Manage the categories for your finantial transactions"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-md bg-white px-2 py-4 md:px-4 md:py-6 xl:px-6 xl:py-8">
                <DataTable
                    data={data}
                    columns={CategoryColumns}
                    pagination={pagination}
                    search={search}
                    setSearch={setSearch}
                    rowKey={(category) => category.id}
                >
                    <CategoryForm>
                        <Button size="lg">Add Category</Button>
                    </CategoryForm>
                </DataTable>
            </div>
        </div>
    );
}

Categories.layout = {
    breadcrumbs: [
        {
            title: 'Categories Settings',
            href: '/settings/categories',
        },
    ],
};
