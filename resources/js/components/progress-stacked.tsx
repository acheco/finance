import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressStackedProps {
  currentProgress: number;
  projectedValue: number;
  max: number;
}

const ProgressStacked: React.FC<ProgressStackedProps> = ({
  currentProgress,
  projectedValue,
  max,
}) => {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-beige-100">
      {/* Projected value bar (bottom layer) */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Progress
          value={projectedValue}
          max={max}
          progressColor="#277C78"
          className="h-full w-full bg-transparent"
        />
      </div>
      {/* Current progress bar (top layer) */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Progress
          value={currentProgress}
          max={max}
          progressColor="#201F24"
          className="h-full w-full bg-transparent"
        />
      </div>
    </div>
  );
};

export default ProgressStacked;
