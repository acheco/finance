import { Link } from '@inertiajs/react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { destroy } from '@/routes/transactions';

export default function DeleteTransactionModal({
    transaction,
}: {
    transaction: number;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span
                    className={cn(
                        'relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm text-secondary-red hover:bg-secondary-red/10',
                    )}
                >
                    Delete
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this transaction?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the transaction from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col">
                    <AlertDialogAction asChild size="xl">
                        <Link
                            href={destroy(transaction)}
                            className="w-full rounded-md bg-secondary-red px-4 text-white hover:bg-secondary-red/90"
                        >
                            Yes, Confirm Deletion
                        </Link>
                    </AlertDialogAction>
                    <AlertDialogCancel className="w-full" size="xl">
                        No, Go Back
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
