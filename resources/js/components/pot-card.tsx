import { DotsThreeIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { currencyFormat } from '@/lib/utils';
import type { Pot } from '@/types/pot';

export default function PotCard({ pot }: { pot: Pot }) {
  const formattedTarget = currencyFormat(pot.target_amount);
  const formattedTotal = currencyFormat(pot.total_amount);
  const progressMaxValue = Number(pot.target_amount);
  const progressValue = Number(pot.total_amount);

  return (
    <Card key={pot.id} className="gap-8">
      <CardHeader>
        <CardTitle className="flex gap-2">
          <div
            className="size-4 rounded-lg"
            style={{ backgroundColor: pot.theme }}
          />
          <p>{pot.name}</p>
        </CardTitle>
        <CardAction>
          <DotsThreeIcon
            size={24}
            weight="bold"
            style={{ backgroundColor: 'text-grey-300' }}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm leading-[150%] tracking-normal text-grey-500">
            Total Saved
          </span>
          <span className="text-[32px] leading-[120%] font-bold tracking-normal text-grey-900">
            {formattedTotal}
          </span>
        </div>
        <Progress
          value={progressValue}
          max={progressMaxValue}
          progressColor={pot.theme}
          className="mb-1"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs leading-[150%] font-bold tracking-normal text-grey-500">
            {pot.percentage}%
          </span>
          <span className="text-xs leading-[150%] tracking-normal text-grey-500">
            Target of {formattedTarget}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button
          size="xl"
          className="w-full bg-beige-100 font-bold text-grey-900"
        >
          + Add Money
        </Button>
        <Button
          size="xl"
          className="w-full bg-beige-100 font-bold text-grey-900"
        >
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  );
}
