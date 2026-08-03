import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';
import RecurringBillController from '@/actions/App/Http/Controllers/RecurringBillController';
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
import type { Account } from '@/types/account';
import type { Category } from '@/types/category';
import type { Bill } from '@/types/recurring-bills';

interface RecurringBillFormProps {
    bill: Bill;
}

export default function RecurringBillForm({ bill }: RecurringBillFormProps) {
    const [open, setOpen] = useState(false);

    const { categories, accounts } = usePage().props;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span className="cursor-pointer rounded-md px-2 py-2.5 text-sm hover:bg-muted">
                    Edit Recurring Bill
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Recurring Bill</DialogTitle>
                    <DialogDescription>
                        Update the details of this recurring bill.
                    </DialogDescription>
                </DialogHeader>
                <Form
                    {...RecurringBillController.update.form(bill.id)}
                    onSuccess={() => setOpen(false)}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Bill Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={bill.name}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    defaultValue={bill.amount}
                                />
                                <InputError message={errors.amount} />
                            </div>

                            <div className="flex w-full flex-col items-center gap-2 md:flex-row">
                                <div className="w-full">
                                    <Label htmlFor="account">Account</Label>
                                    <Select
                                        name="account_id"
                                        defaultValue={bill.account_id.toString()}
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
                                    <InputError message={errors.account_id} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        name="category_id"
                                        defaultValue={bill.category?.id.toString()}
                                    >
                                        <SelectTrigger
                                            id="category"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(
                                                (category: Category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category_id} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 md:flex-row">
                                <div className="w-full">
                                    <Label htmlFor="frequency">Frequency</Label>
                                    <Select
                                        name="frequency"
                                        defaultValue={bill.frequency_raw}
                                    >
                                        <SelectTrigger
                                            id="frequency"
                                            className="w-full"
                                        >
                                            <SelectValue placeholder="Select a frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">
                                                Weekly
                                            </SelectItem>
                                            <SelectItem value="monthly">
                                                Monthly
                                            </SelectItem>
                                            <SelectItem value="yearly">
                                                Yearly
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.frequency} />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="due_day">
                                        Due Day (optional)
                                    </Label>
                                    <Input
                                        id="due_day"
                                        name="due_day"
                                        type="number"
                                        min="1"
                                        max="31"
                                        defaultValue={
                                            bill.due_day_raw ?? undefined
                                        }
                                        placeholder="1"
                                    />
                                    <InputError message={errors.due_day} />
                                </div>
                            </div>

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
                                        Save Recurring Bill
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
