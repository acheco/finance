import { Label, Pie, PieChart } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface DonutChartProps<T extends Record<string, unknown>> {
    data: T[]
    config: ChartConfig
    dataKey: {
        [K in keyof T]: T[K] extends number ? K : never
    }[keyof T]
    nameKey: {
        [K in keyof T]: T[K] extends string ? K : never
    }[keyof T]
    centerValue?: number | string
    centerLabel?: string
    innerRadius?: number
    strokeWidth?: number
    className?: string
}

export function DonutChart<T extends Record<string, unknown>>({
                                                                  data,
                                                                  config,
                                                                  dataKey,
                                                                  nameKey,
                                                                  centerValue,
                                                                  centerLabel,
                                                                  innerRadius = 80,
                                                                  strokeWidth = 5,
                                                                  className = "mx-auto aspect-square w-[303px] max-h-70 md:w-74 lg:w-94",
                                                              }: DonutChartProps<T>) {
    return (
        <ChartContainer config={config} className={className}>
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={data}
                    dataKey={dataKey as string}
                    nameKey={nameKey as string}
                    innerRadius={innerRadius}
                    strokeWidth={strokeWidth}
                >
                    {centerValue !== undefined && (
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground preset-1 font-bold"
                                            >
                                                {typeof centerValue === "number"
                                                    ? centerValue.toLocaleString()
                                                    : centerValue}
                                            </tspan>
                                            {centerLabel && (
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {centerLabel}
                                                </tspan>
                                            )}
                                        </text>
                                    )
                                }
                            }}
                        />
                    )}
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}
