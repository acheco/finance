import { useForm } from '@inertiajs/react';
import React from 'react';
import potController from '@/actions/App/Http/Controllers/PotController';
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
import type { Pot } from '@/types/pot';

export default function DeletePotForm({ pot }: { pot: Pot }) {
  const { delete: destroy, processing } = useForm();

  const onSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    destroy(potController.destroy(pot.id).url, {
      preserveScroll: true,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full cursor-pointer text-left text-red-custom">
        Delete Pot
      </DialogTrigger>
      <DialogContent className="gap-0 bg-white">
        <DialogHeader className="mb-5 gap-5 text-left">
          <DialogTitle className="text-2xl leading-[120%] font-bold tracking-normal">
            Delete '{pot.name}'?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this pot? This action cannot be
            undone and will remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-wrap gap-3">
          <Button
            variant="destructive"
            size="xl"
            onClick={onSubmit}
            disabled={processing}
            className="order-1 w-full bg-red-custom font-bold"
          >
            Yes, Confirm Deletion
          </Button>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="xl"
              className="w-full leading-[150%] tracking-normal text-grey-500 md:order-1"
            >
              No, I want to go back
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
