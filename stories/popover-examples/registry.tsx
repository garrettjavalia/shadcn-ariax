import {medium,narrow,fit,capitalized,half,group,alignments,sides,column} from '@popover-customizations';
import { Button } from "@button"
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dialog"
import { Field, FieldGroup, FieldLabel } from "@field"
import { Input } from "@input"
import {
  Popover,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@popover"

export function PopoverBasic() {
  return (
    <>
      <PopoverTrigger>
        <Button variant="outline" {...fit}>
          Open Popover
        </Button>
        <Popover data-parity-portal placement="bottom start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </Popover>
      </PopoverTrigger>
    </>
  )
}

export function PopoverSides() {
  return (
    <>
      <div {...column}>
        <div {...sides}>
          {(["start", "left", "top"] as const).map((placement) => {
            return (
              <PopoverTrigger key={placement}>
                <Button variant="outline" {...capitalized}>
                  {placement}
                </Button>
                <Popover data-parity-portal placement={placement} {...narrow}>
                  <p>Popover on {placement}</p>
                </Popover>
              </PopoverTrigger>
            )
          })}
        </div>
        <div {...sides}>
          {(["bottom", "right", "end"] as const).map((placement) => {
            return (
              <PopoverTrigger key={placement}>
                <Button variant="outline" {...capitalized}>
                  {placement}
                </Button>
                <Popover data-parity-portal placement={placement} {...narrow}>
                  <p>Popover on {placement}</p>
                </Popover>
              </PopoverTrigger>
            )
          })}
        </div>
      </div>
    </>
  )
}

export function PopoverWithForm() {
  return (
    <>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
        <Popover data-parity-portal {...medium} placement="bottom start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <FieldGroup {...group}>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="width" {...half}>
                Width
              </FieldLabel>
              <Input id="width" defaultValue="100%" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="height" {...half}>
                Height
              </FieldLabel>
              <Input id="height" defaultValue="25px" />
            </Field>
          </FieldGroup>
        </Popover>
      </PopoverTrigger>
    </>
  )
}

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

export function PopoverInDialog() {
  return (
    <>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog data-parity-portal>
          <DialogHeader>
            <DialogTitle>Popover Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the popover.
            </DialogDescription>
          </DialogHeader>
          <PopoverTrigger>
            <Button variant="outline" {...fit}>
              Open Popover
            </Button>
            <Popover data-parity-portal placement="bottom start">
              <PopoverHeader>
                <PopoverTitle>Popover in Dialog</PopoverTitle>
                <PopoverDescription>
                  This popover appears inside a dialog. Click the button to open
                  it.
                </PopoverDescription>
              </PopoverHeader>
            </Popover>
          </PopoverTrigger>
        </Dialog>
      </DialogTrigger>
    </>
  )
}
