import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressStackedProps {
  currentProgress: number;
  projectedValue: number;
  max: number;
  mode?: 'add' | 'withdraw';
}

const ProgressStacked: React.FC<ProgressStackedProps> = ({
  currentProgress,
  projectedValue,
  max,
  mode = 'add',
}) => {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-beige-100">
      {mode === 'add' ? (
        <>
          {/* Projected bar below — the delta (add) shows in green */}
          <div className="absolute top-0 left-0 h-full w-full">
            <Progress
              value={projectedValue}
              max={max}
              progressColor="#277C78"
              className="h-full w-full bg-transparent"
            />
          </div>
          {/* Current bar on top — covers everything except the green delta */}
          <div className="absolute top-0 left-0 h-full w-full">
            <Progress
              value={currentProgress}
              max={max}
              progressColor="#201F24"
              className="h-full w-full bg-transparent"
            />
          </div>
        </>
      ) : (
        <>
          {/* Current bar below — full dark bar */}
          <div className="absolute top-0 left-0 h-full w-full">
            <Progress
              value={currentProgress}
              max={max}
              progressColor="#C94736"
              className="h-full w-full bg-transparent"
            />
          </div>
          {/* Projected bar on top — covers up to the new amount, leaving the delta in red */}
          <div className="absolute top-0 left-0 h-full w-full">
            <Progress
              value={projectedValue}
              max={max}
              progressColor="#201F24"
              className="h-full w-full bg-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressStacked;
