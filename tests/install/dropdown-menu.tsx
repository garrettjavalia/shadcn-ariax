import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@dropdown-menu";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@table";
import { Button } from "@button";
import * as stylex from "@stylexjs/stylex";
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function DropdownMenuInstallFixture() {
  return (
    <Table aria-label="Installed actions">
      <TableHeader>
        <TableHead isRowHeader>Name</TableHead>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            Row
            <DropdownMenuTrigger>
              <Button aria-label="Actions">Actions</Button>
              <DropdownMenu
                xstyle={styles.dynamic(200)}
                style={({ defaultStyle }) => ({
                  ...defaultStyle,
                  opacity: 0.9,
                })}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    id="edit"
                    style={({ isSelected }) => ({
                      fontWeight: isSelected ? 600 : 400,
                    })}
                  >
                    Edit<DropdownMenuShortcut>E</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                </DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuTrigger>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
