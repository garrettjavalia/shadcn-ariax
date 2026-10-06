import * as stylex from "@stylexjs/stylex";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  type ContextMenuProps,
} from "@context-menu";
import { Button } from "@button";
const s = stylex.create({ dynamic: (width: number) => ({ width }) });
const props: ContextMenuProps = {
  placement: "end",
  xstyle: s.dynamic(300),
  style: ({ isEmpty }) => ({ opacity: isEmpty ? 0.5 : 1 }),
};
export default function InstalledContextMenu() {
  return (
    <ContextMenuTrigger>
      <Button>Context</Button>
      <ContextMenu {...props}>
        <ContextMenuGroup>
          <ContextMenuLabel style={{ fontSize: 20 }}>Actions</ContextMenuLabel>
          <ContextMenuItem
            style={({ isFocused }) => ({ opacity: isFocused ? 1 : 0.9 })}
            xstyle={s.dynamic(250)}
          >
            {({ isSelected }) => (
              <>
                Open{String(isSelected)}
                <ContextMenuShortcut>⌘O</ContextMenuShortcut>
              </>
            )}
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Nested</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
      </ContextMenu>
    </ContextMenuTrigger>
  );
}
// @ts-expect-error external className is unsupported
export const externalClass = <ContextMenu className="custom" />;
export const wrongTrigger = (
  // @ts-expect-error the source fixes the trigger mode to contextMenu
  <ContextMenuTrigger trigger="press">
    <Button>Open</Button>
    <ContextMenu />
  </ContextMenuTrigger>
);
