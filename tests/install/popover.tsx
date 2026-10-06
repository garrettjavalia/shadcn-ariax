import * as stylex from "@stylexjs/stylex";
import {
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  type PopoverProps,
} from "@popover";
import { Button } from "@button";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
const props: PopoverProps = {
  placement: "bottom start",
  style: ({ isEntering }) => ({ opacity: isEntering ? 0.5 : 1 }),
  xstyle: styles.dynamic(320),
};
export default function InstalledPopover() {
  return (
    <PopoverTrigger>
      <Button>Open</Button>
      <Popover {...props}>
        <PopoverHeader>
          <PopoverTitle style={{ fontSize: 20 }}>Title</PopoverTitle>
          <PopoverDescription>Description</PopoverDescription>
        </PopoverHeader>
      </Popover>
    </PopoverTrigger>
  );
}
