import { Form } from '@inertiajs/react';
import TransactionController from '@/actions/App/Http/Controllers/TransactionController';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Transaction } from '@/types';

export default function DeleteTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full cursor-pointer px-2 py-1.5 text-left text-sm leading-[150%] tracking-normal text-red-custom">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-[32px] leading-[120%] font-bold tracking-normal">
          Delete "{transaction.name}"?
        </DialogTitle>
        <DialogDescription>
          Once this transaction is deleted, it cannot be recovered.
        </DialogDescription>
        <Form {...TransactionController.destroy.form(transaction.id)}>
          {({ processing }) => (
            <>
              <DialogFooter className="grid grid-cols-1">
                <Button
                  type="submit"
                  size="xl"
                  disabled={processing}
                  data-test="confirm-delete-transaction-button"
                  className="w-full bg-red-custom text-white hover:bg-red-custom/90"
                >
                  Yes, Confirm Deletion
                </Button>

                <DialogClose asChild>
                  <Button variant="secondary" size="xl">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}
