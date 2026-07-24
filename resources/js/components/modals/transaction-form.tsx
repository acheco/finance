import { Form, usePage } from '@inertiajs/react';
import { ArrowFatLinesRightIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Account } from '@/types/account';
import type { Category } from '@/types/category';
import type { Transaction } from '@/types/transaction';

interface TransactionFormProps {
    transaction?: Transaction;
}

type FormType = 'income' | 'expense' | 'transfer';

function resolveFormType(transaction?: Transaction): FormType {
    if (!transaction) {
return 'expense';
}

    switch (transaction.type) {
        case 'Income':
            return 'income';
        case 'Expense':
            return 'expense';
        case 'Transfer In':
        case 'Transfer Out':
            return 'transfer';
        default:
            return 'expense';
    }
}

export default function TransactionForm({ transaction }: TransactionFormProps) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<FormType>(resolveFormType(transaction));

    const { categories, accounts } = usePage().props;
    const isEditing = Boolean(transaction);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEditing ? (
                    <span className="cursor-pointer rounded-md px-2 py-2.5 text-sm hover:bg-muted">
                        Edit Transaction
                    </span>
                ) : (
                    <Button type="button">Add New</Button>
                )}
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Transaction' : 'Add New Transaction'}
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details to{' '}
                        {isEditing ? 'update the' : 'add a new'} transaction.
                    </DialogDescription>
                </DialogHeader>
                <Form
                    {...(transaction
                        ? TransactionController.update.form(transaction.id)
                        : TransactionController.store.form())}
                    onSuccess={() => setOpen(false)}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="type" value={type} />

                            <div>
                                <Label htmlFor="formType" className="sr-only">
                                    Form Type
                                </Label>
                                <ToggleGroup
                                    id="formType"
                                    type="single"
                                    value={type}
                                    onValueChange={(value) =>
                                        value && setType(value as FormType)
                                    }
                                    variant="outline"
                                    className="grid grid-cols-3"
                                >
                                    <ToggleGroupItem value="income">
                                        Income
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="expense">
                                        Expense
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="transfer">
                                        Transfer
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    defaultValue={transaction?.amount}
                                />
                                <InputError message={errors.amount} />
                            </div>

                            {type === 'expense' || type === 'income' ? (
                                <div className="grid gap-2">
                                    <div className="flex w-full flex-col items-center gap-2 md:flex-row">
                                        <div className="w-full">
                                            <Label htmlFor="account">
                                                Account
                                            </Label>
                                            <Select
                                                name="account_id"
                                                defaultValue={transaction?.account?.id.toString()}
                                            >
                                                <SelectTrigger
                                                    id="account"
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select an account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {accounts.map(
                                                        (account: Account) => (
                                                            <SelectItem
                                                                key={account.id}
                                                                value={account.id.toString()}
                                                            >
                                                                {account.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={errors.account_id}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="category">
                                                Category
                                            </Label>
                                            <Select
                                                name="category_id"
                                                defaultValue={transaction?.category?.id.toString()}
                                            >
                                                <SelectTrigger
                                                    id="category"
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(
                                                        (
                                                            category: Category,
                                                        ) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={category.id.toString()}
                                                            >
                                                                {category.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={errors.category_id}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="recipient">
                                            Recipient
                                        </Label>
                                        <Input
                                            id="recipient"
                                            name="recipient"
                                            type="text"
                                            defaultValue={
                                                transaction?.recipient
                                            }
                                        />
                                        <InputError
                                            message={errors.recipient}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex flex-col gap-2 md:flex-row">
                                            <div className="w-full">
                                                <Label htmlFor="date">
                                                    Date
                                                </Label>
                                                <Input
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    defaultValue={
                                                        transaction?.raw_date
                                                    }
                                                />
                                                <InputError
                                                    message={errors.date}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="description">
                                                    Description (optional)
                                                </Label>
                                                <Input
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    defaultValue={
                                                        transaction?.description
                                                    }
                                                />
                                                <InputError
                                                    message={errors.description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-2">
                                    <div className="flex w-full flex-col items-center gap-2 md:flex-row">
                                        <div className="w-full">
                                            <Label htmlFor="from">From</Label>
                                            <Select
                                                name="from_account_id"
                                                defaultValue={transaction?.transfer?.from_account.id.toString()}
                                            >
                                                <SelectTrigger
                                                    id="from"
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select an account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {accounts.map(
                                                        (account: Account) => (
                                                            <SelectItem
                                                                key={account.id}
                                                                value={account.id.toString()}
                                                            >
                                                                {account.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={errors.from_account_id}
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="h-6" />
                                            <ArrowFatLinesRightIcon
                                                size={24}
                                                weight="fill"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <Label htmlFor="to">To</Label>
                                            <Select
                                                name="to_account_id"
                                                defaultValue={transaction?.transfer?.to_account.id.toString()}
                                            >
                                                <SelectTrigger
                                                    id="to"
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select an account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {accounts.map(
                                                        (account: Account) => (
                                                            <SelectItem
                                                                key={account.id}
                                                                value={account.id.toString()}
                                                            >
                                                                {account.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <InputError
                                                message={errors.to_account_id}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="transferDate">
                                            Date
                                        </Label>
                                        <Input
                                            id="transferDate"
                                            name="date"
                                            type="date"
                                            defaultValue={transaction?.raw_date}
                                        />
                                        <InputError message={errors.date} />
                                    </div>
                                </div>
                            )}

                            <DialogFooter>
                                <div className="flex w-full flex-col-reverse gap-2">
                                    <DialogClose asChild>
                                        <Button
                                            variant="outline"
                                            size="xl"
                                            className="w-full"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        type="submit"
                                        size="xl"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        Save {type === 'expense' && 'Expense'}
                                        {type === 'income' && 'Income'}
                                        {type === 'transfer' && 'Transfer'}
                                    </Button>
                                </div>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
