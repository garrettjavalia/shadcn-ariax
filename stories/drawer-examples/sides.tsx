import {custom9,custom12} from '@drawer-customizations';
import { Button } from "@button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@drawer"

export function DrawerWithSides() {
  return (
    <Drawer swipeDirection="left">
      <DrawerTrigger render={<Button variant="secondary" />}>
        Open Left Drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div {...custom9}>
          <div {...custom12} />
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
