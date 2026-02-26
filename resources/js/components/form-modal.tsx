import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { FormModalProps } from '@/types/ui';

export default function FormModal({
  open,
  handleClose,
  children,
}: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle className="text-left text-xl leading-[120%] font-bold tracking-normal"></DialogTitle>
          <DialogDescription className="text-left text-sm leading-[150%] tracking-normal"></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
