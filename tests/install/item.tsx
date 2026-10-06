import * as stylex from "@stylexjs/stylex";
import {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
} from "@item";
const styles = stylex.create({ width: (width: number) => ({ width }) });
export default function Fixture() {
  return (
    <ItemGroup>
      <Item
        href="#"
        variant="outline"
        size="sm"
        xstyle={styles.width(320)}
        style={{ width: 400 }}
      >
        <ItemHeader>Header</ItemHeader>
        <ItemMedia variant="icon">
          <svg />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Title</ItemTitle>
          <ItemDescription>Description</ItemDescription>
        </ItemContent>
        <ItemActions>Actions</ItemActions>
        <ItemFooter>Footer</ItemFooter>
      </Item>
      <ItemSeparator />
      <Item variant={null} size={null}>
        Plain
      </Item>
    </ItemGroup>
  );
}
