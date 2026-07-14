import { Link } from '@inertiajs/react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { destroy } from '@/routes/account';

export default function DeleteAccount({ account }: { account: number }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span
                    className={cn(
                        'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-secondary-red hover:bg-secondary-red/10',
                    )}
                >
                    Delete Account
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. All data associated with
                        this account will be permanently deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Link
                        href={destroy(account)}
                        className="rounded-md bg-secondary-red px-4 text-white hover:bg-secondary-red/90"
                    >
                        Delete
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
