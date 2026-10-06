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

export function DialogStickyFooter() {
  return (
    <DialogTrigger>
      <Button variant="outline">Sticky Footer</Button>
      <Dialog data-parity-portal>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content
            scrolls.
          </DialogDescription>
        </DialogHeader>
        <div style={{marginInline:-16,scrollbarWidth:"none",maxHeight:"50vh",overflowY:"auto",paddingInline:16}}>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} style={{marginBottom:16,lineHeight:1.5}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose variant="outline">Close</DialogClose>
        </DialogFooter>
      </Dialog>
    </DialogTrigger>
  )
}
