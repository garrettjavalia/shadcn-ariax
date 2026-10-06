import{likeCount,column4,lumaBorder,menu200,muted,fieldsGrid,fieldSpan,row6,fitHeight}from'@button-group-customizations';
"use client"

import { Focusable } from "react-aria-components"

import { Button } from "@button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@button-group"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dropdown-menu"
import { Field, FieldGroup } from "@field"
import { Input } from "@input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@input-group"
import { Label } from "@label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@select"
import { Tooltip, TooltipTrigger } from "@tooltip"
import { ChevronDownIcon, VolumeX, CheckIcon, AlertTriangleIcon, UserRoundXIcon, ShareIcon, CopyIcon, TrashIcon, ArrowRightIcon, FlipHorizontalIcon, FlipVerticalIcon, RotateCwIcon, SearchIcon, MinusIcon, PlusIcon, HeartIcon, AudioLinesIcon, ArrowLeftIcon } from "lucide-react"

export default function ButtonGroupExample() {
  return (
    <>
      <ButtonGroupBasic />
      <ButtonGroupWithInput />
      <ButtonGroupWithText />
      <ButtonGroupWithDropdown />
      <ButtonGroupWithSelect />
      <ButtonGroupWithIcons />
      <ButtonGroupWithInputGroup />
      <ButtonGroupWithFields />
      <ButtonGroupWithLike />
      <ButtonGroupWithSelectAndInput />
      <ButtonGroupNested />
      <ButtonGroupPagination />
      <ButtonGroupPaginationSplit />
      <ButtonGroupNavigation />
      <ButtonGroupTextAlignment />
      <ButtonGroupVertical />
      <ButtonGroupVerticalNested />
    </>
  )
}

export function ButtonGroupBasic() {
  return (
    <>
      <div {...column4}>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
      </div>
    </>
  )
}

export function ButtonGroupWithInput() {
  return (
    <>
      <div {...column4}>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Input placeholder="Type something here..." />
        </ButtonGroup>
        <ButtonGroup>
          <Input placeholder="Type something here..." />
          <Button variant="outline">Button</Button>
        </ButtonGroup>
      </div>
    </>
  )
}

export function ButtonGroupWithText() {
  return (
    <>
      <div {...column4}>
        <ButtonGroup>
          <ButtonGroupText>Text</ButtonGroupText>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonGroupText
            render={(props) => <Label htmlFor="input-text" {...props} />}
          >
            GPU Size
          </ButtonGroupText>
          <Input
            id="input-text"
            placeholder="Type something here..."
            {...lumaBorder}
          />
        </ButtonGroup>
      </div>
    </>
  )
}

export function ButtonGroupWithDropdown() {
  return (
    <>
      <div {...column4}>
        <ButtonGroup>
          <Button variant="outline">Update</Button>

          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <ChevronDownIcon
              />
            </Button>
            <DropdownMenu data-parity-portal placement="bottom end">
              <DropdownMenuItem>Disable</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Uninstall
              </DropdownMenuItem>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Follow</Button>

          <DropdownMenuTrigger>
            <Button variant="outline" size="icon">
              <ChevronDownIcon
              />
            </Button>
            <DropdownMenu data-parity-portal placement="bottom end" {...menu200}>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <VolumeX
                  />
                  Mute Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CheckIcon
                  />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertTriangleIcon
                  />
                  Report Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserRoundXIcon
                  />
                  Block User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon
                  />
                  Share Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon
                  />
                  Copy Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <TrashIcon
                  />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenu>
          </DropdownMenuTrigger>
        </ButtonGroup>
      </div>
    </>
  )
}

const currencyItems = [
  { label: "$", value: "$" },
  { label: "€", value: "€" },
  { label: "£", value: "£" },
]

export function ButtonGroupWithSelect() {
  return (
    <>
      <Field>
        <Label htmlFor="amount">Amount</Label>
        <ButtonGroup>
          <Select aria-label="Currency" defaultValue={currencyItems[0].value}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-parity-portal>
              <SelectGroup>
                {currencyItems.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="Enter amount to send" />
          <Button variant="outline">
            <ArrowRightIcon
            />
          </Button>
        </ButtonGroup>
      </Field>
    </>
  )
}

export function ButtonGroupWithIcons() {
  return (
    <>
      <div {...column4}>
        <ButtonGroup>
          <Button variant="outline">
            <FlipHorizontalIcon
            />
          </Button>
          <Button variant="outline">
            <FlipVerticalIcon
            />
          </Button>
          <Button variant="outline">
            <RotateCwIcon
            />
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}

export function ButtonGroupWithInputGroup() {
  return (
    <>
      <div {...column4}>
        <InputGroup>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon
            align="inline-start"
            {...muted}
          >
            <SearchIcon
            />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  )
}

export function ButtonGroupWithFields() {
  return (
    <>
      <FieldGroup {...fieldsGrid}>
        <Field {...fieldSpan}>
          <Label htmlFor="width">Width</Label>
          <ButtonGroup>
            <InputGroup>
              <InputGroupInput id="width" />
              <InputGroupAddon {...muted}>
                W
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                {...muted}
              >
                px
              </InputGroupAddon>
            </InputGroup>
            <Button variant="outline" size="icon">
              <MinusIcon
              />
            </Button>
            <Button variant="outline" size="icon">
              <PlusIcon
              />
            </Button>
          </ButtonGroup>
        </Field>
      </FieldGroup>
    </>
  )
}

export function ButtonGroupWithLike() {
  return (
    <>
      <ButtonGroup>
        <Button variant="outline">
          <HeartIcon data-icon="inline-start" />{" "}
          Like
        </Button>
        <span
          data-slot="button"
          {...likeCount}
        >
          1.2K
        </span>
      </ButtonGroup>
    </>
  )
}

const durationItems = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
]

export function ButtonGroupWithSelectAndInput() {
  return (
    <>
      <ButtonGroup>
        <Select aria-label="Duration" defaultValue={durationItems[0].value}>
          <SelectTrigger id="duration">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-parity-portal placement="bottom start">
            <SelectGroup>
              {durationItems.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input />
      </ButtonGroup>
    </>
  )
}

export function ButtonGroupNested() {
  return (
    <>
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <PlusIcon
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput placeholder="Send a message..." />
            <TooltipTrigger>
              <Focusable>
                <InputGroupAddon align="inline-end" role="button">
                  <AudioLinesIcon
                  />
                </InputGroupAddon>
              </Focusable>
              <Tooltip data-parity-portal>Voice Mode</Tooltip>
            </TooltipTrigger>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export function ButtonGroupPagination() {
  return (
    <>
      <ButtonGroup>
        <Button variant="outline" size="sm">
          <ArrowLeftIcon data-icon="inline-start" />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </ButtonGroup>
    </>
  )
}

export function ButtonGroupPaginationSplit() {
  return (
    <>
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon-xs">
            <ArrowLeftIcon
            />
          </Button>
          <Button variant="outline" size="icon-xs">
            <ArrowRightIcon
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export function ButtonGroupNavigation() {
  return (
    <>
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">
            <ArrowLeftIcon
            />
          </Button>
          <Button variant="outline">
            <ArrowRightIcon
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Single navigation button">
          <Button variant="outline" size="icon">
            <ArrowLeftIcon
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export function ButtonGroupTextAlignment() {
  return (
    <>
      <Field>
        <Label id="alignment-label">Text Alignment</Label>
        <ButtonGroup aria-labelledby="alignment-label">
          <Button variant="outline" size="sm">
            Left
          </Button>
          <Button variant="outline" size="sm">
            Center
          </Button>
          <Button variant="outline" size="sm">
            Right
          </Button>
          <Button variant="outline" size="sm">
            Justify
          </Button>
        </ButtonGroup>
      </Field>
    </>
  )
}

export function ButtonGroupVertical() {
  return (
    <>
      <div {...row6}>
        <ButtonGroup
          orientation="vertical"
          aria-label="Media controls"
          {...fitHeight}
        >
          <Button variant="outline" size="icon">
            <PlusIcon
            />
          </Button>
          <Button variant="outline" size="icon">
            <MinusIcon
            />
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}

export function ButtonGroupVerticalNested() {
  return (
    <>
      <ButtonGroup orientation="vertical" aria-label="Design tools palette">
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <SearchIcon
            />
          </Button>
          <Button variant="outline" size="icon">
            <CopyIcon
            />
          </Button>
          <Button variant="outline" size="icon">
            <ShareIcon
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <FlipHorizontalIcon
            />
          </Button>
          <Button variant="outline" size="icon">
            <FlipVerticalIcon
            />
          </Button>
          <Button variant="outline" size="icon">
            <RotateCwIcon
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <TrashIcon
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}
