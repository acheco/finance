import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import AccountController from '@/actions/App/Http/Controllers/Settings/AccountController';
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

export default function AccountForm({
    account,
    children,
}: {
    account?: Account;
    children: ReactNode;
}) {
    const { accountTypes } = usePage().props;
    const [open, setOpen] = useState(false);
    const isEditing = Boolean(account);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit account' : 'Create account'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? 'Update the details of this account.'
                            : 'Add a new bank account or payment method.'}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...(account
                        ? AccountController.update.form(account.id)
                        : AccountController.store.form())}
                    onSuccess={() => setOpen(false)}
                    className="space-y-4"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={account?.name}
                                    placeholder="Account name"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    name="type"
                                    defaultValue={
                                        account?.type ?? accountTypes[0].value
                                    }
                                >
                                    <SelectTrigger id="type" className="w-full">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {accountTypes.map((type) => (
                                            <SelectItem
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="balance">Balance</Label>
                                <Input
                                    id="balance"
                                    name="balance"
                                    type="number"
                                    step="0.01"
                                    defaultValue={account?.balance}
                                    placeholder="0.00"
                                    required
                                />
                                <InputError message={errors.balance} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        name="color"
                                        type="color"
                                        className="p-1"
                                        defaultValue={
                                            account?.color ?? '#201F24'
                                        }
                                    />
                                    <InputError message={errors.color} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Input
                                        id="icon"
                                        name="icon"
                                        defaultValue={account?.icon ?? ''}
                                        placeholder="Wallet"
                                    />
                                    <InputError message={errors.icon} />
                                </div>
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
                                            : 'Create account'}
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
