import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { cn } from '@/app/lib/utils';

export function ModalForm({
  children,
  title,
  description,
  saveButton,
  closeButton,
  open,
  onOpenChange,
  defaultOpen,
  className,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  saveButton?: React.ReactNode;
  closeButton?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className: string;
}) {
  return (
    <Dialog defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
        <DialogFooter>
          {saveButton && <DialogClose asChild>{saveButton}</DialogClose>}
          {closeButton && <DialogClose asChild>{closeButton}</DialogClose>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
