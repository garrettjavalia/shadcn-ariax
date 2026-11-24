import postcss from "postcss";
import { format } from "prettier";

/** Keep global font registrations only when the selected example uses the face. */
export async function exampleStylesheet(
  code: string,
  sheets: readonly { path: string; contents: string }[],
): Promise<string | undefined> {
  const styles = new Set<string>();
  for (const sheet of sheets) {
    const root = postcss.parse(sheet.contents, { from: sheet.path });
    root.walkAtRules("font-face", (face) => {
      const family = face.nodes?.find(
        (node) => node.type === "decl" && node.prop === "font-family",
      );
      if (
        family?.type === "decl" &&
        !code.includes(family.value.replace(/^['"]|['"]$/g, ""))
      )
        face.remove();
    });
    if (root.nodes.some((node) => node.type !== "comment"))
      styles.add(root.toString());
  }
  if (styles.size) return format([...styles].join("\n"), { parser: "css" });
}
