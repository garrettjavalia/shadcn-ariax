import {narrow,wide,footerStart,hiddenLabel} from '@dialog-customizations';
import { Button } from "@button"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"

export function DialogNoCloseButton() {
  return (
    <DialogTrigger>
      <Button variant="outline">No Close Button</Button>
      <Dialog data-parity-portal showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn&apos;t have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader>
      </Dialog>
    </DialogTrigger>
  )
}
