import { Button } from "@button"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@popover"

export function PopoverBasic() {
  return (
    <PopoverTrigger>
      <Button variant="outline">Open Popover</Button>
      <Popover data-parity-portal placement="bottom start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
      </Popover>
    </PopoverTrigger>
  )
}
