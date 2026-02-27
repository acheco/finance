import { Form } from '@inertiajs/react';
import React, { useState } from 'react';
import PotController from '@/actions/App/Http/Controllers/PotController';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { PotFormProps } from '@/types/pot';

export default function PotForm({ pot, mode, themes }: PotFormProps) {
  const [nameValue, setNameValue] = useState(pot?.name || '');
  let formProps: object;

  const charactersLeft = 30 - nameValue.length;
  const formTitle = mode === 'create' ? 'Add New Pot' : 'Edit Pot';

  const formDescription =
    mode === 'create'
      ? 'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
      : 'If your saving targets change, feel free to update your pots.';

  if (mode === 'create' && pot === undefined) {
    formProps = PotController.store.form();
  } else if (mode === 'edit' && pot !== undefined) {
    formProps = PotController.update.form(pot.id);
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
            {formDescription && (
              <FieldDescription>{formDescription}</FieldDescription>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Pot Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={pot?.name}
                  onChange={(e) => setNameValue(e.target.value)}
                  required
                  placeholder="e.g Rainy Days"
                  tabIndex={1}
                />
                <FieldDescription className="text-right">
                  {charactersLeft} of 30 characters left
                </FieldDescription>
                <FieldError>{errors.name}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="target">Target</FieldLabel>
                <Input
                  id="target"
                  type="text"
                  defaultValue={pot?.target_amount}
                  name="target_amount"
                  required
                  placeholder="e.g 2000"
                  tabIndex={2}
                />
                <FieldError>{errors.target_amount}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="theme">Theme</FieldLabel>
                <Select name="theme" defaultValue={pot?.theme}>
                  <SelectTrigger>
                    <SelectValue id="theme" className="h-11" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {themes?.map((theme) => (
                        <SelectItem value={theme.value} key={theme.value}>
                          <div
                            className={cn('h-4 w-4 rounded-full')}
                            style={{ backgroundColor: theme.value }}
                          />
                          {theme.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError>{errors.theme}</FieldError>
              </Field>
              <Button type="submit" disabled={processing} size="xl">
                {mode === 'create' ? 'Add Pot' : 'Save Changes'}
              </Button>
            </FieldGroup>
          </FieldSet>
        </>
      )}
    </Form>
  );
}
