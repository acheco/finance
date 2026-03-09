import { Form } from '@inertiajs/react';
import { useState } from 'react';
import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TransactionFormProps } from '@/types';

export default function TransactionForm({
  transaction,
  mode,
  categories,
}: TransactionFormProps) {
  const [type, setType] = useState('expense');

  let formProps: object;
  const formTitle =
    mode === 'create' ? 'Add New Transaction' : 'Edit Transaction';

  const formDescription =
    mode === 'create'
      ? 'Add a transaction to keep track of your expenses and income. This will help you manage your finances more effectively.'
      : 'Update your transaction details to keep your records accurate.';

  if (mode === 'create') {
    formProps = TransactionController.store.form();
  } else if (mode === 'edit' && transaction !== undefined) {
    formProps = TransactionController.update.form(transaction.id);
  } else {
    formProps = {};
  }

  return (
    <Form {...formProps} resetOnSuccess>
      {({ processing, errors }) => (
        <>
          <FieldSet>
            <FieldTitle className="text-left text-xl leading-[120%] font-bold tracking-normal">
              {formTitle}
            </FieldTitle>
            <FieldDescription>{formDescription}</FieldDescription>

            <Field>
              <input type="hidden" name="type" value={type} />
              <FieldLabel htmlFor="type">Transaction Type</FieldLabel>
              <ButtonGroup aria-label="Button group">
                <Button
                  type="button"
                  onClick={() => setType('expense')}
                  variant={type === 'expense' ? 'default' : 'outline'}
                >
                  Expense
                </Button>
                <Button
                  type="button"
                  onClick={() => setType('income')}
                  variant={type === 'income' ? 'default' : 'outline'}
                >
                  Income
                </Button>
              </ButtonGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                defaultValue={transaction?.name}
                placeholder="e.g Groceries"
                required
              />
              <FieldError>{errors.name}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="amount">Amount</FieldLabel>
              <Input
                id="amount"
                type="number"
                name="amount"
                defaultValue={transaction?.amount}
                placeholder="e.g 200"
                required
              />
              <FieldError>{errors.amount}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="category_id">Category</FieldLabel>
              <Select
                name="category_id"
                defaultValue={transaction?.category_id.toString()}
              >
                <SelectTrigger>
                  <SelectValue className="h-11" placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((category) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={category.id}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: category.color }}
                          >
                            <Icon
                              name={category.image as never}
                              size={24}
                              color="white"
                            />
                          </div>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{errors.category_id}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="date">Date</FieldLabel>
              <DatePicker name="date" defaultValue={transaction?.date} />
              <FieldError>{errors.date}</FieldError>
            </Field>

            <Button type="submit" disabled={processing} size="xl">
              {mode === 'create' ? 'Add Transaction' : 'Save Changes'}
            </Button>
          </FieldSet>
        </>
      )}
    </Form>
  );
}
