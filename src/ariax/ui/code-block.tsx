"use client";

import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "./button";
import { applied } from "./style-props.internal";
import { animationStyles } from "./animations.stylex";

type Styled<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
type Variant = "default" | "destructive";
type LineVariant = "default" | "added" | "removed" | "highlighted";
export type CodeBlockProps = Styled<React.ComponentProps<"div">> & {
  variant?: Variant | null;
  size?: "default" | "sm";
};

export function CodeBlock({
  className: _,
  xstyle,
  style,
  variant = "default",
  size = "default",
  ...props
}: CodeBlockProps) {
  return (
    <div
      data-slot="code-block"
      data-variant={variant}
      data-size={size}
      {...props}
      {...applied([styles.root, variant && variants[variant]], xstyle, style)}
    />
  );
}

function divPart(slot: string, getStyles: () => stylex.StyleXStyles) {
  return function Part({
    className: _,
    xstyle,
    style,
    ...props
  }: Styled<React.ComponentProps<"div">>) {
    return (
      <div
        data-slot={slot}
        {...props}
        {...applied(getStyles(), xstyle, style)}
      />
    );
  };
}
export const CodeBlockHeader = divPart(
  "code-block-header",
  () => styles.header,
);
export const CodeBlockTitle = divPart("code-block-title", () => styles.title);
export const CodeBlockActions = divPart(
  "code-block-actions",
  () => styles.actions,
);
export const CodeBlockFooter = divPart(
  "code-block-footer",
  () => styles.footer,
);

export function CodeBlockCopyButton({
  value,
  variant = "ghost",
  size = "icon-xs",
  xstyle,
  onPress,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant={variant}
        size={size}
        aria-label={copied ? "Copied" : "Copy"}
        xstyle={xstyle}
        onPress={(event) => {
          onPress?.(event);
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {});
        }}
        {...props}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
      <span aria-live="polite" {...stylex.props(styles.srOnly)}>
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}

export type CodeBlockContentProps = Styled<React.ComponentProps<"pre">> & {
  wrap?: boolean;
  lineNumbers?: boolean;
  startLine?: number;
};
export function CodeBlockContent({
  className: _,
  xstyle,
  children,
  style,
  wrap = false,
  lineNumbers = false,
  startLine = 1,
  ...props
}: CodeBlockContentProps) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      data-numbered={lineNumbers || undefined}
      dir="ltr"
      tabIndex={0}
      {...props}
      {...applied(
        [
          animationStyles.scrollFadeInline,
          wrap && animationStyles.scrollFade,
          styles.content,
        ],
        xstyle,
        { counterReset: `line ${startLine - 1}`, ...style },
      )}
    >
      <code data-slot="code-block-code" {...stylex.props(styles.code)}>
        {lineNumbers && typeof children === "string"
          ? children
              .replace(/\n$/, "")
              .split("\n")
              .map((line, index) => (
                <CodeBlockLine key={index}>{line}</CodeBlockLine>
              ))
          : children}
      </code>
    </pre>
  );
}

export function CodeBlockLine({
  className: _,
  xstyle,
  style,
  variant = "default",
  children,
  ...props
}: Styled<React.ComponentProps<"span">> & { variant?: LineVariant | null }) {
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0);
  return (
    <span
      data-slot="code-block-line"
      data-variant={variant}
      {...props}
      {...applied([styles.line, variant && lines[variant]], xstyle, style)}
    >
      <span
        data-slot="code-block-line-content"
        {...stylex.props(styles.lineContent)}
      >
        {empty ? "\n" : children}
      </span>
    </span>
  );
}

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: "var(--radius)",
    fontSize: { default: ".875rem", ':is([data-size="sm"])': ".75rem" },
    lineHeight: {
      default: "calc(1.25 / .875)",
      ':is([data-size="sm"])': "calc(1 / .75)",
    },
    boxShadow: {
      default: null,
      ':has(> [data-slot="code-block-content"]:focus-visible)':
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000",
    },
    "--ariax-code-padding": {
      default: "calc(var(--ariax-spacing, .25rem) * 3)",
      ':is([data-size="sm"])': "calc(var(--ariax-spacing, .25rem) * 2.5)",
    },
  },
  header: {
    display: "flex",
    minWidth: 0,
    flexShrink: 0,
    alignItems: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    paddingInline: "var(--ariax-code-padding)",
    paddingTop: "var(--ariax-code-padding)",
    color: {
      default: "var(--muted-foreground)",
      ':is([data-slot="code-block"][data-variant="destructive"] *)':
        "var(--destructive)",
    },
  },
  footer: {
    display: "flex",
    minWidth: 0,
    flexShrink: 0,
    alignItems: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 2)",
    paddingInline: "var(--ariax-code-padding)",
    paddingBottom: "var(--ariax-code-padding)",
    color: "var(--muted-foreground)",
  },
  title: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "var(--font-sans)",
    fontSize: {
      default: ".875rem",
      ':is([data-slot="code-block"][data-size="sm"] *)': ".75rem",
    },
    lineHeight: {
      default: "calc(1.25 / .875)",
      ':is([data-slot="code-block"][data-size="sm"] *)': "calc(1 / .75)",
    },
    fontWeight: 500,
    color: {
      default: "var(--foreground)",
      ':is([data-slot="code-block"][data-variant="destructive"] *)':
        "var(--destructive)",
    },
  },
  actions: {
    alignItems: "center",
    display: "flex",
    marginInlineStart: {
      default: "auto",
      ':is([data-slot="code-block"] > *)': 0,
    },
    flexShrink: 0,
    marginBlock: {
      default: "calc(var(--ariax-spacing, .25rem) * -1)",
      ':is([data-slot="code-block"] > *)': 0,
    },
    marginInlineEnd: {
      default: "calc(var(--ariax-spacing, .25rem) * -1.5)",
      ':is([data-slot="code-block"] > *)': 0,
    },
    gap: "var(--ariax-spacing, .25rem)",
    position: {
      default: null,
      ':is([data-slot="code-block"] > *)': "absolute",
    },
    zIndex: { default: null, ':is([data-slot="code-block"] > *)': 10 },
    opacity: {
      default: null,
      ':is([data-slot="code-block"] > *)': {
        default: 0,
        "@media (pointer: coarse)": 1,
      },
      ':is([data-slot="code-block"]:focus-within > *)': 1,
      ':is([data-slot="code-block"]:hover > *)': {
        default: null,
        "@media (hover: hover)": 1,
      },
    },
    transitionProperty: {
      default: null,
      ':is([data-slot="code-block"] > *)': "opacity",
    },
    transitionDuration: {
      default: null,
      ':is([data-slot="code-block"] > *)': "150ms",
    },
    transitionTimingFunction: {
      default: null,
      ':is([data-slot="code-block"] > *)': "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  content: {
    scrollbarWidth: "thin",
    minHeight: 0,
    minWidth: 0,
    overflow: "auto",
    textAlign: "start",
    fontFamily: "var(--font-mono)",
    outlineStyle: "none",
    paddingInline: "var(--ariax-code-padding)",
    paddingBlock: "var(--ariax-code-padding)",
    lineHeight: 1.625,
    paddingTop: {
      default: "var(--ariax-code-padding)",
      ':is([data-slot="code-block"]:has([data-slot="code-block-header"]) *)':
        "calc(var(--ariax-spacing, .25rem) * 2)",
      ':is([data-slot="code-block"][data-size="sm"]:has([data-slot="code-block-header"]) *)':
        "calc(var(--ariax-spacing, .25rem) * 1.5)",
    },
    paddingBottom: {
      default: "var(--ariax-code-padding)",
      ':is([data-slot="code-block"]:has([data-slot="code-block-footer"]) *)':
        "calc(var(--ariax-spacing, .25rem) * 2)",
    },
    overflowWrap: { default: null, ":is([data-wrap])": "break-word" },
    whiteSpace: { default: null, ":is([data-wrap])": "pre-wrap" },
  },
  code: {
    display: "grid",
    minHeight: "1lh",
    minWidth: { default: "max-content", ":is([data-wrap] *)": 0 },
    alignContent: "flex-start",
    gridTemplateColumns: {
      default: null,
      ":is([data-numbered] *)": "auto 1fr",
    },
  },
  line: {
    "--ariax-code-line-marker": '""',
    "--ariax-code-marker-color": "var(--muted-foreground)",
    position: "relative",
    display: { default: "block", ":is([data-numbered] *)": "grid" },
    minHeight: "1lh",
    marginInline: "calc(var(--ariax-code-padding) * -1)",
    paddingInline: "var(--ariax-code-padding)",
    gridColumn: { default: null, ":is([data-numbered] *)": "span 2 / span 2" },
    gridTemplateColumns: { default: null, ":is([data-numbered] *)": "subgrid" },
    columnGap: {
      default: null,
      ":is([data-numbered] *)": "calc(var(--ariax-spacing, .25rem) * 3)",
    },
    counterIncrement: { default: null, ":is([data-numbered] *)": "line" },
    content: {
      default: null,
      "::after": 'var(--ariax-code-line-marker, "")',
      ":is([data-numbered] *)::before": {
        default: "counter(line)",
        "@supports (content: counter(line) / '')": "counter(line) / ''",
      },
    },
    minWidth: {
      default: null,
      "::before": "calc(var(--ariax-spacing, .25rem) * 6)",
    },
    textAlign: { default: null, "::before": "end" },
    color: {
      default: null,
      "::before": "var(--muted-foreground)",
      "::after": "var(--ariax-code-marker-color, var(--muted-foreground))",
    },
    userSelect: {
      default: null,
      ":is([data-numbered] *)::before": "none",
      "::after": "none",
    },
    top: { default: null, "::after": 0 },
    insetInlineStart: {
      default: null,
      "::after": "var(--ariax-spacing, .25rem)",
    },
  },
  lineContent: { minWidth: 0 },
  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
});
const variants = stylex.create({
  default: {
    borderWidth: 1,
    borderColor: {
      default: "var(--input)",
      ':has(> [data-slot="code-block-content"]:focus-visible)': "var(--ring)",
    },
    color: "var(--foreground)",
    backgroundColor: {
      default: null,
      ":is(.dark *)": "color-mix(in oklab, var(--input) 30%, transparent)",
    },
  },
  destructive: {
    borderWidth: 1,
    borderColor: {
      default: "color-mix(in oklab, var(--destructive) 30%, transparent)",
      ":is(.dark *)":
        "color-mix(in oklab, var(--destructive) 40%, transparent)",
    },
    color: "var(--destructive)",
  },
});
const lines = stylex.create({
  default: {},
  highlighted: { backgroundColor: "var(--muted)" },
  added: {
    backgroundColor: "var(--muted)",
    "--ariax-code-line-marker": '"+"',
  },
  removed: {
    backgroundColor: "color-mix(in oklab, var(--destructive) 10%, transparent)",
    "--ariax-code-line-marker": '"−"',
    "--ariax-code-marker-color": "var(--destructive)",
  },
});

export { useHighlightedCode } from "./code-block-highlight.internal";
export { highlightCode } from "./code-block-highlighter.internal";
