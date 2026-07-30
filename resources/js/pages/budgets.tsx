import { Head, setLayoutProps } from '@inertiajs/react';
import { CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';
import { Fragment, useEffect } from 'react';
import { BudgetDonutChart } from '@/components/budget-donut-chart';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn, currencyFormatter } from '@/lib/utils';
import { index as budget } from '@/routes/budgets';
import type { Budget } from '@/types/budget';

type BudgetProps = {
    budgets: Budget[];
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
            <div className="grid max-w-265 grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-6">
                <div className="flex flex-col space-y-8 rounded-lg bg-white px-5 py-6 md:flex-row md:items-center-safe md:p-8 lg:h-fit lg:flex-col">
                    <BudgetDonutChart budgets={budgets} />
                    <div className="space-y-6 lg:flex lg:w-full lg:flex-col lg:justify-between">
                        <h2 className="preset-2 text-grey-900">
                            Spending Summary
                        </h2>
                        <ul>
                            {budgets.map((budget, index) => (
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
                                    {index < budgets.length - 1 && (
                                        <hr className="my-2 border-sidebar-border" />
                                    )}
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-6">
                    {budgets.map((budget) => (
                        <div
                            key={budget.id}
                            className="space-y-4 rounded-lg bg-white p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="h-4 w-4 rounded-full"
                                        style={{
                                            backgroundColor:
                                                budget.category.color,
                                        }}
                                    />
                                    <h3 className="preset-2 text-grey-900">
                                        {budget.category.name}
                                    </h3>
                                </div>
                                <DotsThreeIcon
                                    size={24}
                                    color="#b3b3b3"
                                    weight="bold"
                                />
                            </div>
                            <div className="space-y-4">
                                <p className="preset-4 text-grey-500">
                                    Maximum of{' '}
                                    {currencyFormatter(budget.maximum)}
                                </p>
                                <div className="relative h-8 w-full rounded-md bg-beige-100 p-1">
                                    <div
                                        className="absolute top-1 left-1 h-6 rounded-sm"
                                        style={{
                                            width: `${(budget.spent / budget.maximum) * 100}%`,
                                            backgroundColor:
                                                budget.category.color,
                                        }}
                                    />
                                </div>
                                <div className="flex gap-4 md:flex-row">
                                    <div className="flex w-[143.5px] items-center gap-4">
                                        <div
                                            className="h-8 w-1 rounded-md"
                                            style={{
                                                backgroundColor:
                                                    budget.category.color,
                                            }}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="preset-5 text-grey-500">
                                                Spent
                                            </p>
                                            <p className="preset-4-bold text-grey-900">
                                                {currencyFormatter(
                                                    budget.spent,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex w-[143.5px] items-center gap-4">
                                        <div className="h-8 w-1 rounded-md bg-beige-100" />
                                        <div className="flex flex-col gap-1">
                                            <p className="preset-5 text-grey-500">
                                                Free
                                            </p>
                                            <p className="preset-4-bold text-grey-900">
                                                {currencyFormatter(
                                                    budget.maximum -
                                                        budget.spent,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5 rounded-md bg-beige-100 p-4">
                                {budget.category.transactions.length === 0 && (
                                    <p className="grid aspect-video place-items-center text-center preset-4 text-grey-500">
                                        No transactions yet
                                    </p>
                                )}
                                {budget.category.transactions.length > 0 && (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <h3 className="preset-3 text-grey-900">
                                                Latest Spending
                                            </h3>
                                            <p className="flex cursor-pointer items-center gap-3 preset-4 text-grey-500 hover:underline">
                                                See All
                                                <CaretRightIcon
                                                    size={18}
                                                    color="#696868"
                                                    weight="fill"
                                                />
                                            </p>
                                        </div>

                                        <Table>
                                            <TableBody>
                                                {budget.category.transactions.map(
                                                    (transaction) => (
                                                        <TableRow
                                                            key={transaction.id}
                                                        >
                                                            <TableCell className="px-0 py-3 preset-5-bold text-grey-900">
                                                                {
                                                                    transaction.recipient
                                                                }
                                                            </TableCell>
                                                            <TableCell
                                                                className={
                                                                    'flex flex-col items-end gap-1 px-0 py-3'
                                                                }
                                                            >
                                                                <p className="preset-5-bold text-grey-900">
                                                                    {currencyFormatter(
                                                                        transaction.amount,
                                                                    )}
                                                                </p>
                                                                <p className="preset-5 text-grey-500">
                                                                    {
                                                                        transaction.date
                                                                    }
                                                                </p>
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )}
                                            </TableBody>
                                        </Table>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
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
