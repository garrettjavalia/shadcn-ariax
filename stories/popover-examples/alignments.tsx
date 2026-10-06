import {narrow,alignments} from '@popover-customizations';
import { Button } from "@button"
import { Popover, PopoverTrigger } from "@popover"

export function PopoverAlignments() {
  return (
    <>
      <div {...alignments}>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            Start
          </Button>
          <Popover data-parity-portal placement="bottom start" {...narrow}>
            Aligned to start
          </Popover>
        </PopoverTrigger>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            Center
          </Button>
          <Popover data-parity-portal placement="bottom" {...narrow}>
            Aligned to center
          </Popover>
        </PopoverTrigger>
        <PopoverTrigger>
          <Button variant="outline" size="sm">
            End
          </Button>
          <Popover data-parity-portal placement="bottom end" {...narrow}>
            Aligned to end
          </Popover>
        </PopoverTrigger>
      </div>
    </>
  )
}
