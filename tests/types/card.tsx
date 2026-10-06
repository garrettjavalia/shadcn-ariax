import { createRef } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "../../registry/ariax/ui/card";
const styles = stylex.create({ card: (width: number) => ({ width }) });
<Card
  ref={createRef<HTMLDivElement>()}
  size="sm"
  style={{ width: 320 }}
  xstyle={[styles.card(280), false]}
  aria-label="Card"
/>;
for (const Part of [
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
]) {
  <Part
    ref={createRef<HTMLDivElement>()}
    style={{ color: "red" }}
    xstyle={styles.card(200)}
    onClick={(e) => e.currentTarget.focus()}
  />;
  // @ts-expect-error External class names remain unsupported.
  <Part className="p-4" />;
}
// @ts-expect-error Unknown size.
<Card size="lg" />;
// @ts-expect-error CSS objects are not compiled StyleX styles.
<Card xstyle={{ width: 200 }} />;
