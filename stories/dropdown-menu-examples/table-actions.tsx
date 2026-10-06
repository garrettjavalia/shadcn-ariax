// Pinned official example; only shared import and customization adapters differ.
import { dropdownCustom, dropdownSr } from '@dropdown-menu-customizations';
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@table"

export function TableActions() {
  return (
    <Table aria-label="Products">
      <TableHeader>
        <TableHead isRowHeader>Product</TableHead>
        <TableHead>Price</TableHead>
        <TableHead {...dropdownCustom("text-right")}>Actions</TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell {...dropdownCustom("font-medium")}>Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell {...dropdownCustom("text-right")}>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" {...dropdownCustom("size-8")}>
                <MoreHorizontalIcon />
                <span {...dropdownSr()}>Open menu</span>
              </Button>
              <DropdownMenu placement="bottom end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell {...dropdownCustom("font-medium")}>Mechanical Keyboard</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell {...dropdownCustom("text-right")}>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" {...dropdownCustom("size-8")}>
                <MoreHorizontalIcon />
                <span {...dropdownSr()}>Open menu</span>
              </Button>
              <DropdownMenu placement="bottom end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell {...dropdownCustom("font-medium")}>USB-C Hub</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell {...dropdownCustom("text-right")}>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" {...dropdownCustom("size-8")}>
                <MoreHorizontalIcon />
                <span {...dropdownSr()}>Open menu</span>
              </Button>
              <DropdownMenu placement="bottom end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
