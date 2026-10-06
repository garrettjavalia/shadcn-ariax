import * as stylex from "@stylexjs/stylex";
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerClose,
  DrawerSwipeHandle,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  type DrawerProps,
  type DrawerContentProps,
} from "@drawer";
import { Button } from "@button";
const s = stylex.create({ dynamic: (width: number) => ({ width }) });
const props: DrawerProps = {
  open: false,
  showSwipeHandle: false,
  swipeDirection: "right",
  onOpenChange: (_open, details) => {
    details.cancel();
  },
};
const content: DrawerContentProps = {
  xstyle: s.dynamic(300),
  style: (state) => ({ opacity: state.open ? 1 : 0.5 }),
};
export default function InstalledDrawer() {
  return (
    <Drawer {...props}>
      <DrawerTrigger
        render={<Button />}
        style={(state) => ({ opacity: state.open ? 0.5 : 1 })}
      >
        Open
      </DrawerTrigger>
      <DrawerContent {...content}>
        <DrawerSwipeHandle />
        <DrawerHeader style={{ padding: 20 }}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button />} xstyle={s.dynamic(150)}>
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
      <DrawerPortal keepMounted>
        <DrawerOverlay style={{ opacity: 0.5 }} />
      </DrawerPortal>
    </Drawer>
  );
}
