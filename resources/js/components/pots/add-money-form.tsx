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

export default function AddMoneyForm({ pot }: { pot: Pot }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const newAmount = pot.total_amount + amount;

  const projectedPercentage = (
    (newAmount / Number(pot.target_amount)) *
    100
  ).toFixed(2);

  const handleCancel = () => {
    setAmount(0);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        handleCancel();
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="xl"
          className="w-full cursor-pointer bg-beige-100 font-bold text-grey-900 hover:bg-white hover:ring-1 hover:ring-beige-500 hover:ring-offset-1"
        >
          + Add Money
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-left text-xl leading-[120%] font-bold tracking-normal">
            Add Money to Pot
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-[150%] tracking-normal">
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
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
        />

        <div className="flex items-center justify-between">
          <p className="text-xs leading-[150%] font-bold tracking-normal text-green-custom">
            {projectedPercentage}%
          </p>
          <p className="text-xs leading-[150%] tracking-normal text-grey-500">
            Target of {currencyFormat(pot.target_amount)}
          </p>
        </div>
        <Form
          {...PotController.addMoney.form(pot.id)}
          onSuccess={() => setOpen(false)}
          resetOnSuccess={true}
          onCancel={handleCancel}
        >
          {({ errors, processing }) => (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="amount">Amount to Add</FieldLabel>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
                <FieldError>{errors.amount}</FieldError>
              </Field>
              <Button size="xl" disabled={processing}>
                Confirm Addition
              </Button>
            </FieldGroup>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
