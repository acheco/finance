import { Head, setLayoutProps } from '@inertiajs/react';
import { Fragment, useEffect } from 'react';
import { BudgetDonutChart } from '@/components/budget-donut-chart';
import { Button } from '@/components/ui/button';
import { cn, currencyFormatter } from '@/lib/utils';
import { index as budget } from '@/routes/budgets';
import type { PaginatedBudget } from '@/types/budget';

type BudgetProps = {
    budgets: PaginatedBudget;
};

export default function Budgets({ budgets }: BudgetProps) {
    useEffect(() => {
        setLayoutProps({
            headerAction: <Button size="xl">+ Add New Budget</Button>,
        });
    }, []);

    return (
        <>
            <Head title="budgets" />
            <div className="grid grid-cols-1">
                <div className="space-y-8 rounded-md bg-white px-5 py-6">
                    <BudgetDonutChart budgets={budgets.data} />
                    <div className="space-y-6">
                        <h2 className="preset-2 text-grey-900">
                            Spending Summary
                        </h2>
                        <ul>
                            {budgets.data.map((budget, index) => (
                                <Fragment key={budget.id}>
                                    <li className="flex items-center justify-between py-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={cn(
                                                    'h-[21px] w-1 rounded-full',
                                                )}
                                                style={{
                                                    backgroundColor:
                                                        budget.category.color,
                                                }}
                                            />
                                            <span className="preset-4 text-grey-500">
                                                {budget.category.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <p className="preset-3 text-grey-900">
                                                {currencyFormatter(
                                                    budget.spent,
                                                )}
                                            </p>
                                            <p className="preset-5 text-grey-500">
                                                of{' '}
                                                {currencyFormatter(
                                                    budget.maximum,
                                                )}
                                            </p>
                                        </div>
                                    </li>
                                    {index < budgets.data.length - 1 && (
                                        <hr className="my-2 border-sidebar-border" />
                                    )}
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
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
