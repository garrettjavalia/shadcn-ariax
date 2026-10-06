import {tableExampleStyle,tableNativeExampleStyle} from '@table-customizations';
"use client"


import { Button } from "@button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@dropdown-menu"
import { Input } from "@input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@table"
import { MoreHorizontalIcon } from "lucide-react"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]


export function TableBasic() {
  return (
    <section>
      <figure>
        <Table>
          <TableHeader>
            <TableHead isRowHeader {...tableExampleStyle("w-[100px]")}>
              Invoice
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead {...tableExampleStyle("text-right")}>Amount</TableHead>
          </TableHeader>
          <TableBody>
            {invoices.slice(0, 3).map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell {...tableExampleStyle("font-medium")}>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell {...tableExampleStyle("text-right")}>
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
      </figure>
    </section>
  )
}

export function TableWithFooter() {
  return (
    <section>
      <figure>
        <Table>
          <TableHeader>
            <TableHead isRowHeader {...tableExampleStyle("w-[100px]")}>
              Invoice
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead {...tableExampleStyle("text-right")}>Amount</TableHead>
          </TableHeader>
          <TableBody>
            {invoices.slice(0, 3).map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell {...tableExampleStyle("font-medium")}>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell {...tableExampleStyle("text-right")}>
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell {...tableExampleStyle("text-right")}>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
      </figure>
    </section>
  )
}

export function TableSimple() {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableHead isRowHeader>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead {...tableExampleStyle("text-right")}>Role</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Alex Morgan</TableCell>
            <TableCell>alex@example.com</TableCell>
            <TableCell {...tableExampleStyle("text-right")}>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Jordan Lee</TableCell>
            <TableCell>jordan@example.com</TableCell>
            <TableCell {...tableExampleStyle("text-right")}>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Taylor Kim</TableCell>
            <TableCell>taylor@example.com</TableCell>
            <TableCell {...tableExampleStyle("text-right")}>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}

export function TableWithBadges() {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableHead isRowHeader>Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead {...tableExampleStyle("text-right")}>Priority</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Design homepage</TableCell>
            <TableCell>
              <span {...tableNativeExampleStyle("inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400")}>
                Completed
              </span>
            </TableCell>
            <TableCell {...tableExampleStyle("text-right")}>
              <span {...tableNativeExampleStyle("inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400")}>
                High
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Implement API</TableCell>
            <TableCell>
              <span {...tableNativeExampleStyle("inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400")}>
                In Progress
              </span>
            </TableCell>
            <TableCell {...tableExampleStyle("text-right")}>
              <span {...tableNativeExampleStyle("inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400")}>
                Medium
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Write tests</TableCell>
            <TableCell>
              <span {...tableNativeExampleStyle("inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400")}>
                Pending
              </span>
            </TableCell>
            <TableCell {...tableExampleStyle("text-right")}>
              <span {...tableNativeExampleStyle("inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-400")}>
                Low
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}

export function TableWithActions() {
  return (
    <section>
      <Table>
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
                  <MoreHorizontalIcon
                  />
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
                  <MoreHorizontalIcon
                  />
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
                  <MoreHorizontalIcon
                  />
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
    </section>
  )
}

const people = [
  { value: "sarah", label: "Sarah Chen" },
  { value: "marcus", label: "Marc Rodriguez" },
  { value: "emily", label: "Emily Watson" },
  { value: "david", label: "David Kim" },
]

const tasks = [
  {
    task: "Design homepage",
    assignee: "sarah",
    status: "In Progress",
  },
  {
    task: "Implement API",
    assignee: "marcus",
    status: "Pending",
  },
  {
    task: "Write tests",
    assignee: "emily",
    status: "Not Started",
  },
]

export function TableWithSelect() {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableHead isRowHeader>Task</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Status</TableHead>
        </TableHeader>
        <TableBody>
          {tasks.map((item) => (
            <TableRow key={item.task}>
              <TableCell {...tableExampleStyle("font-medium")}>{item.task}</TableCell>
              <TableCell>
                <Select defaultValue={item.assignee}>
                  <SelectTrigger {...tableExampleStyle("w-40")} size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {people.map((person) => (
                        <SelectItem key={person.value} id={person.value}>
                          {person.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export function TableWithInput() {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableHead isRowHeader>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Wireless Mouse</TableCell>
            <TableCell>
              <Input
                type="number"
                defaultValue="1"
                {...tableExampleStyle("h-8 w-20")}
                min="0"
              />
            </TableCell>
            <TableCell>$29.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>Mechanical Keyboard</TableCell>
            <TableCell>
              <Input
                type="number"
                defaultValue="2"
                {...tableExampleStyle("h-8 w-20")}
                min="0"
              />
            </TableCell>
            <TableCell>$129.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell {...tableExampleStyle("font-medium")}>USB-C Hub</TableCell>
            <TableCell>
              <Input
                type="number"
                defaultValue="1"
                {...tableExampleStyle("h-8 w-20")}
                min="0"
              />
            </TableCell>
            <TableCell>$49.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  )
}
