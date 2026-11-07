import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
  "layout": {
    "position": "relative",
    "display": "flex",
    "flexDirection": "column",
    "gap": 16
  },
  "card": {
    "marginInline": "auto",
    "height": 560,
    "width": "100%",
    "maxWidth": "24rem",
    "gap": 0
  },
  "header": {
    "gap": 4,
    "borderBottomWidth": 1, "paddingBottom": "var(--card-spacing)"
  },
  "content": {
    "flex": 1,
    "overflow": "hidden",
    "padding": 0
  },
  "messages": {
    "padding": "var(--card-spacing)"
  },
  "lines": {},
  "text": {
    "whiteSpace": "pre-wrap", "marginBlockStart": {"default": null, ":not(:last-child)": 0}, "marginBlockEnd": {"default": null, ":not(:last-child)": 8}
  },
  "caption": {
    "marginInline": "auto",
    "maxWidth": "24rem",
    "paddingInline": 2,
    "textAlign": "center",
    "fontSize": 12,
    "lineHeight": "calc(1 / .75)",
    "textWrap": "balance",
    "color": "var(--muted-foreground)"
  },
  "menu": {
    "width": 256
  },
  "clamp": {
    "overflow": "hidden",
    "display": "-webkit-box",
    "WebkitBoxOrient": "vertical",
    "WebkitLineClamp": 1,
    "minWidth": 0
  },
  "frame": {
    "position": "relative",
    "marginInline": "auto",
    "width": "100%",
    "maxWidth": "24rem"
  },
  "fullCard": {
    "height": 560,
    "width": "100%",
    "gap": 0
  },
  "navigation": {
    "position": "absolute",
    "top": "50%",
    "right": -48,
    "translate": "0 -50%"
  },
  "plainCaption": {
    "marginInline": "auto",
    "maxWidth": "24rem",
    "paddingInline": 2,
    "textAlign": "center",
    "fontSize": 12,
    "lineHeight": "calc(1 / .75)",
    "color": "var(--muted-foreground)"
  },
  "navButton": {
    "display": "flex",
    "height": 36,
    "width": 36,
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "gap": 4,
    "borderRadius": "calc(var(--radius) * .8)",
    "transitionProperty": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transitionDuration": "150ms",
    "outlineStyle": "none",
    "boxShadow": {
      "default": null,
      ":focus-visible": "0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent)"
    }
  },
  "marker": {
    "height": 2,
    "width": 16,
    "borderRadius": "calc(infinity * 1px)",
    "backgroundColor": {
      "default": "color-mix(in oklab, var(--muted-foreground) 40%, transparent)",
      ":is([data-current=\"true\"])": "var(--foreground)"
    }
  },
  "popover": {
    "display": "flex",
    "width": 256,
    "flexDirection": "column",
    "gap": 4,
    "borderRadius": "calc(var(--radius) * 1.6)",
    "padding": 4
  },
  "jump": {
    "display": "flex",
    "minHeight": 28,
    "alignItems": "center",
    "borderRadius": "calc(var(--radius) * 1.4)",
    "paddingInline": 8,
    "paddingBlock": 6,
    "textAlign": "left",
    "fontSize": 14,
    "lineHeight": "calc(1.25 / .875)",
    "transitionProperty": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
    "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transitionDuration": "150ms",
    "outlineStyle": "none",
    "backgroundColor": {
      "default": null,
      ":hover": {
        "@media (hover: hover)": "var(--accent)"
      },
      ":focus-visible": "var(--accent)",
      ":is([aria-current=\"true\"])": "var(--accent)"
    },
    "color": {
      "default": null,
      ":hover": {
        "@media (hover: hover)": "var(--accent-foreground)"
      },
      ":focus-visible": "var(--accent-foreground)",
      ":is([aria-current=\"true\"])": "var(--accent-foreground)"
    }
  },
  "footer": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "gap": 8,
    "borderTopWidth": 1
  },
  "full": {
    "width": "100%"
  },
  "hint": {
    "fontSize": 12,
    "lineHeight": "calc(1 / .75)",
    "color": "var(--muted-foreground)"
  },
  "positionFooter": {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "borderTopWidth": 1
  },
  "groupContent": {
    "minHeight": 0,
    "flex": 1,
    "padding": 0
  }
});
export const scrollerStyle=<K extends keyof typeof styles>(name:K)=>({xstyle:styles[name]});
export const scrollerProps=(name:keyof typeof styles)=>name==='lines'?{className:'official-skeleton-lines'}:stylex.props(styles[name]);
