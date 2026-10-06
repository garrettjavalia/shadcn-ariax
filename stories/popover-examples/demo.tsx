import {wide,input,grid,gridSmall,row,heading,description,spaced} from '@popover-customizations';
import { Button } from "@button"
import { Input } from "@input"
import { Label } from "@label"
import { Popover, PopoverTrigger } from "@popover"

export default function PopoverDemo() {
  return (
    <PopoverTrigger>
      <Button variant="outline">Open popover</Button>
      <Popover data-parity-portal {...wide}>
        <div {...grid}>
          <div {...spaced}>
            <h4 {...heading}>Dimensions</h4>
            <p {...description}>
              Set the dimensions for the layer.
            </p>
          </div>
          <div {...gridSmall}>
            <div {...row}>
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                {...input}
              />
            </div>
            <div {...row}>
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                {...input}
              />
            </div>
            <div {...row}>
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                {...input}
              />
            </div>
            <div {...row}>
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                {...input}
              />
            </div>
          </div>
        </div>
      </Popover>
    </PopoverTrigger>
  )
}
