import * as stylex from "@stylexjs/stylex";
import { Button } from "@button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from "@dialog";
const styles = stylex.create({ width: (width: number) => ({ width }) });
export default function Fixture() {
  return (
    <>
      <DialogTrigger>
        <Button>Open</Button>
        <Dialog
          xstyle={styles.width(320)}
          style={({ isEntering }) => ({ opacity: isEntering ? 0.5 : 1 })}
        >
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription style={{ color: "blue" }}>
              Description
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
      <DialogOverlay
        isOpen={false}
        xstyle={styles.width(400)}
        style={{ opacity: 0.9 }}
      >
        Overlay
      </DialogOverlay>
    </>
  );
}
