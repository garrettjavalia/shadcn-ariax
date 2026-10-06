import{mono,mutedText}from'@button-group-customizations';
"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Button } from "@button"
import { ButtonGroup } from "@button-group"
import { Input } from "@input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@select"

const CURRENCIES = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Select
          value={currency}
          onChange={(value) => setCurrency(value as string)}
        >
          <SelectTrigger {...mono}>{currency}</SelectTrigger>
          <SelectContent data-parity-portal placement="bottom start">
            <SelectGroup>
              {CURRENCIES.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.value}{" "}
                  <span {...mutedText}>{item.label}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input placeholder="10.00" pattern="[0-9]*" />
      </ButtonGroup>
      <ButtonGroup>
        <Button aria-label="Send" size="icon" variant="outline">
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
