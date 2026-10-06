import {tableExampleStyle,tableNativeExampleStyle} from '@table-customizations';
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
        <TableHead {...tableExampleStyle("text-right")}>Actions</TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell {...tableExampleStyle("font-medium")}>Wireless Mouse</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell {...tableExampleStyle("text-right")}>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" {...tableExampleStyle("size-8")}>
                <MoreHorizontalIcon />
                <span {...tableNativeExampleStyle("sr-only")}>Open menu</span>
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
          <TableCell {...tableExampleStyle("font-medium")}>Mechanical Keyboard</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell {...tableExampleStyle("text-right")}>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" {...tableExampleStyle("size-8")}>
                <MoreHorizontalIcon />
                <span {...tableNativeExampleStyle("sr-only")}>Open menu</span>
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
          <TableCell {...tableExampleStyle("font-medium")}>USB-C Hub</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell {...tableExampleStyle("text-right")}>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon" {...tableExampleStyle("size-8")}>
                <MoreHorizontalIcon />
                <span {...tableNativeExampleStyle("sr-only")}>Open menu</span>
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
