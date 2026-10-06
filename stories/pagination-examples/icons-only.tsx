import { paginationFit, paginationTrigger, paginationCompact } from "@pagination-customizations";
import { Field, FieldLabel } from "@field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@select"

export function PaginationIconsOnly() {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
      <Field orientation="horizontal" {...paginationFit}>
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue="25">
          <SelectTrigger {...paginationTrigger} id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent data-parity-portal="" placement="bottom start">
            <SelectGroup>
              <SelectItem id="10">10</SelectItem>
              <SelectItem id="25">25</SelectItem>
              <SelectItem id="50">50</SelectItem>
              <SelectItem id="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination {...paginationCompact}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
