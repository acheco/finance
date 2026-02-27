import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  value?: number;
  max?: number;
  progressColor?: string;
}

function Progress({
                    className,
                    value = 0,
                    max = 100,
                    progressColor = '#201F24',
                    ...props
                  }: ProgressProps) {

  const safeMax = max <= 0 ? 100 : max;
  const percentage = Math.min(Math.max((value / safeMax) * 100, 0), 100);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-beige-100 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      value={value}
      max={safeMax}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)`, backgroundColor: progressColor }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
