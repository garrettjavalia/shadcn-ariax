import * as stylex from "@stylexjs/stylex";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@breadcrumb";
const styles = stylex.create({
  space: { gap: 20 },
  separator: { color: "red" },
});
export default function Fixture() {
  return (
    <Breadcrumb>
      <BreadcrumbList xstyle={styles.space}>
        <BreadcrumbItem separatorXstyle={styles.separator}>
          <BreadcrumbLink
            href="#"
            style={({ isFocused }) => ({ opacity: isFocused ? 0.5 : 1 })}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Current</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
