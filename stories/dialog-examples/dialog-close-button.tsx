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
import { Input } from "@input"
import { Label } from "@label"

export function DialogCloseButton() {
  return (
    <DialogTrigger>
      <Button variant="outline">Share</Button>
      <Dialog data-parity-portal {...wide}>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"grid",flex:"1",gap:8}}>
            <Label htmlFor="link" {...hiddenLabel}>
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter {...footerStart}>
          <DialogClose type="button">Close</DialogClose>
        </DialogFooter>
      </Dialog>
    </DialogTrigger>
  )
}
