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
import { destroy } from '@/routes/budgets';
import type { Budget } from '@/types/budget';

type deleteBudgetProps = {
    budget: Budget;
};

export default function DeleteBudgetModal({ budget }: deleteBudgetProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <span
                    className={cn(
                        'relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-secondary-red hover:bg-secondary-red/10',
                    )}
                >
                    Delete Budget
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle asChild>
                        <p className="preset-1">
                            Delete '{budget.category.name}'?
                        </p>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="preset-4">
                        Are you sure you want to delete this budget? This action
                        cannot be reversed, and all the data inside it will be
                        removed forever.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col">
                    <AlertDialogAction size="xl" asChild>
                        <Link
                            href={destroy(budget.id)}
                            className="rounded-md bg-secondary-red px-4 preset-4-bold text-white hover:bg-secondary-red/90"
                        >
                            Yes, Confirm Deletion
                        </Link>
                    </AlertDialogAction>
                    <AlertDialogCancel
                        size="xl"
                        variant="ghost"
                        className="text-grey-500 hover:text-grey-500/90"
                    >
                        No, Go Back
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
