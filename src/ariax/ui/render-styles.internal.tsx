import { createContext } from "react";
import type { StyleXStyles } from "@stylexjs/stylex";
// Primitive render elements receive internal styles without opening the className API.
export const RenderStylesContext = createContext<StyleXStyles | undefined>(
  undefined,
);
