import { Link } from '@inertiajs/react';
import { DotsThreeIcon } from '@phosphor-icons/react';
import potController from '@/actions/App/Http/Controllers/PotController';
import DeletePotForm from '@/components/delete-pot-form';
import AddMoneyForm from '@/components/pots/add-money-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsThreeIcon
                size={24}
                weight="bold"
                color="hsl(0, 0%, 70%)"
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-5 py-3">
              <DropdownMenuItem asChild>
                <Link
                  href={potController.edit(pot.id)}
                  className="w-full cursor-pointer text-left focus:bg-white"
                >
                  Edit Pot
                </Link>
              </DropdownMenuItem>
              <Separator className="my-2" />
              <DropdownMenuItem asChild>
                <DeletePotForm pot={pot} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <AddMoneyForm pot={pot} />
        <Button
          size="xl"
          className="w-full cursor-pointer bg-beige-100 font-bold text-grey-900 hover:bg-white hover:ring-1 hover:ring-beige-500 hover:ring-offset-1"
        >
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  );
}
