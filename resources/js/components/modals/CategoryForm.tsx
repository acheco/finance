import { Form } from '@inertiajs/react';
import { useState } from 'react';
import CategoryController from '@/actions/App/Http/Controllers/Settings/CategoryController';
import IconPicker from '@/components/icon-picker';
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
import type { Category } from '@/types/category';

interface CategoryFormProps {
    category?: Category;
    children?: React.ReactNode;
}

const icons = [
    'WalletIcon',
    'BankIcon',
    'CreditCardIcon',
    'PiggyBankIcon',
    'CoinsIcon',
    'MoneyIcon',
    'CurrencyDollarIcon',
    'ChartLineIcon',
    'BriefcaseIcon',
    'HandCoinsIcon',
    'VaultIcon',
    'ShoppingCartIcon',
] as const;

export default function CategoryForm({
    category,
    children,
}: CategoryFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isEditing = Boolean(category);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit category' : 'Create category'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Edit the details of the category below.'
                            : 'Fill in the details of the new category below.'}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...(category
                        ? CategoryController.update.form(category.id)
                        : CategoryController.store.form())}
                    onSuccess={() => setIsOpen(false)}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex gap-2">
                                <div className="grid w-full gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={category?.name}
                                        placeholder="Category name"
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <IconPicker iconNames={icons} name="icon" />
                                    <InputError message={errors.icon} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="color">Color</Label>
                                <Input
                                    id="color"
                                    name="color"
                                    type="color"
                                    className="p-1"
                                    defaultValue={category?.color ?? '#201F24'}
                                />
                                <InputError message={errors.color} />
                            </div>

                            <DialogFooter>
                                <div className="flex w-full flex-col-reverse gap-2">
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

                                    <Button
                                        size="xl"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        {isEditing
                                            ? 'Save changes'
                                            : 'Create category'}
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
