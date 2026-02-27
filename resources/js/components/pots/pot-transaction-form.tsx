import { Form } from '@inertiajs/react';
import { useState } from 'react';
import PotController from '@/actions/App/Http/Controllers/PotController';
import ProgressStacked from '@/components/progress-stacked';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { currencyFormat } from '@/lib/utils';
import type { Pot } from '@/types/pot';

type Mode = 'add' | 'withdraw';

const config: Record<
  Mode,
  {
    triggerLabel: string;
    title: (name: string) => string;
    description: string;
    fieldLabel: string;
    confirmLabel: string;
    percentageColor: string;
  }
> = {
  add: {
    triggerLabel: '+ Add Money',
    title: (name) => `Add to "${name}"`,
    description:
      'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.',
    fieldLabel: 'Amount to Add',
    confirmLabel: 'Confirm Addition',
    percentageColor: 'text-green-custom',
  },
  withdraw: {
    triggerLabel: 'Withdraw',
    title: (name) => `Withdraw from "${name}"`,
    description:
      'Withdraw money from your pot. The amount will be returned to your main balance immediately.',
    fieldLabel: 'Amount to Withdraw',
    confirmLabel: 'Confirm Withdrawal',
    percentageColor: 'text-red-custom',
  },
};

export default function PotTransactionForm({
  pot,
  mode,
}: {
  pot: Pot;
  mode: Mode;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const newAmount =
    mode === 'add' ? pot.total_amount + amount : pot.total_amount - amount;

  const projectedPercentage = (
    (newAmount / Number(pot.target_amount)) *
    100
  ).toFixed(2);

  const handleSuccess = () => {
    setAmount(0);
    setOpen(false);
  };

  const c = config[mode];

  const formProps =
    mode === 'add'
      ? PotController.addMoney.form(pot.id)
      : PotController.withdrawMoney.form(pot.id);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          size="xl"
          className="w-full cursor-pointer bg-beige-100 font-bold text-grey-900 hover:bg-white hover:ring-1 hover:ring-beige-500 hover:ring-offset-1"
        >
          {c.triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-left text-xl leading-[120%] font-bold tracking-normal">
            {c.title(pot.name)}
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-[150%] tracking-normal">
            {c.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <p className="text-sm leading-[150%] tracking-normal text-grey-500">
            New Amount
          </p>
          <p className="text-[32px] leading-[120%] font-bold tracking-normal text-grey-900">
            {currencyFormat(newAmount)}
          </p>
        </div>

        <ProgressStacked
          currentProgress={pot.total_amount}
          projectedValue={newAmount}
          max={pot.target_amount}
          mode={mode}
        />

        <div className="flex items-center justify-between">
          <p
            className={`text-xs leading-[150%] font-bold tracking-normal ${c.percentageColor}`}
          >
            {projectedPercentage}%
          </p>
          <p className="text-xs leading-[150%] tracking-normal text-grey-500">
            Target of {currencyFormat(pot.target_amount)}
          </p>
        </div>

        <Form
          {...formProps}
          onSuccess={handleSuccess}
          resetOnSuccess={true}
          options={{ preserveScroll: true }}
        >
          {({ errors, processing }) => (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="amount">{c.fieldLabel}</FieldLabel>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
                <FieldError>{errors.amount}</FieldError>
              </Field>
              <Button size="xl" disabled={processing}>
                {c.confirmLabel}
              </Button>
            </FieldGroup>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
