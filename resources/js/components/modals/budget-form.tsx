import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';
import BudgetController from '@/actions/App/Http/Controllers/BudgetController';
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
import type { Budget } from '@/types/budget';

interface BudgetFormProps {
    children?: React.ReactNode;
    budget?: Budget;
}

export default function BudgetForm({ children, budget }: BudgetFormProps) {
    const [open, setOpen] = useState(false);
    const isEditing = Boolean(budget);

    const { categories } = usePage().props;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Budget' : 'Add New Budget'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Edit the details of the budget below.'
                            : 'Add a new budget to track your spending.'}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...(budget
                        ? BudgetController.update.form(budget.id)
                        : BudgetController.store.form())}
                    onSuccess={() => setOpen(false)}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">
                                    Budget Category
                                </Label>
                                <Select
                                    name="category_id"
                                    defaultValue={budget?.category.id.toString()}
                                    disabled={isEditing}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.category_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="maximum">
                                    Maximum Spending
                                </Label>
                                <Input
                                    name="maximum"
                                    type="number"
                                    defaultValue={budget?.maximum.toString()}
                                    placeholder="$ e.g 2000.00"
                                />
                                <InputError message={errors.maximum} />
                            </div>

                            {errors && (
                                <div>
                                    <ul>
                                        {Object.entries(errors).map(
                                            ([field, message]) => (
                                                <li
                                                    key={field}
                                                    className="text-red-500"
                                                >
                                                    {message}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}

                            <DialogFooter>
                                <div className="flex w-full flex-col gap-2">
                                    <Button
                                        size="xl"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        {isEditing
                                            ? 'Save Changes'
                                            : 'Create Budget'}
                                    </Button>
                                    <DialogClose asChild>
                                        <Button
                                            size="xl"
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
