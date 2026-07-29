import type { ChartConfig } from '@/components/ui/chart';
import { DonutChart } from '@/components/ui/donut-chart';
import { currencyFormatter } from '@/lib/utils';
import type { Budget } from '@/types/budget';

interface BudgetDonutChartProps {
    budgets: Budget[];
}

export function BudgetDonutChart({ budgets }: BudgetDonutChartProps) {
    const data = budgets.map((budget) => ({
        name: budget.category.name,
        value: budget.spent,
        fill: budget.category.color,
    }));

    const config = budgets.reduce<ChartConfig>((config, budget) => {
        config[budget.category.name] = {
            label: budget.category.name,
            color: budget.category.color,
        };

        return config;
    }, {});

    const totalSpent = budgets.reduce(
        (total, budget) => total + budget.spent,
        0,
    );
    const totalMaximum = budgets.reduce(
        (total, budget) => total + budget.maximum,
        0,
    );

    return (
        <DonutChart
            data={data}
            config={config}
            dataKey="value"
            nameKey="name"
            centerValue={currencyFormatter(totalSpent)}
            centerLabel={`of ${currencyFormatter(totalMaximum)} limit`}
        />
    );
}
