"use client"
// Pinned official example; only shared import and customization adapters differ.
import { dropdownCustom } from '@dropdown-menu-customizations';

import * as React from "react"
import { Building2Icon, CreditCardIcon, WalletIcon } from "lucide-react"

import { Button } from "@button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@dropdown-menu"

export function DropdownMenuRadioIcons() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")

  return (
    <DropdownMenuTrigger>
      <Button variant="outline">Payment Method</Button>
      <DropdownMenu {...dropdownCustom("min-w-56")}>
        <DropdownMenuGroup
          selectionMode="single"
          selectedKeys={[paymentMethod]}
          onSelectionChange={(keys) => setPaymentMethod([...keys][0] as string)}
        >
          <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
          <DropdownMenuItem id="card">
            <CreditCardIcon />
            Credit Card
          </DropdownMenuItem>
          <DropdownMenuItem id="paypal">
            <WalletIcon />
            PayPal
          </DropdownMenuItem>
          <DropdownMenuItem id="bank">
            <Building2Icon />
            Bank Transfer
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </DropdownMenuTrigger>
  )
}
