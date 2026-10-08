import type { CSSProperties } from 'react';
import * as stylex from '@stylexjs/stylex';
const spin=stylex.keyframes({to:{transform:'rotate(360deg)'}});
const styles=stylex.create({
  "alertLayout": {
    "display": "grid",
    "width": "100%",
    "maxWidth": "28rem",
    "alignItems": "flex-start",
    "gap": 16
  },
  "landscape": {
    "width": "100%",
    "maxWidth": "24rem",
    "borderRadius": "var(--radius)",
    "backgroundColor": "var(--muted)"
  },
  "photo": {
    "borderRadius": "var(--radius)",
    "objectFit": "cover",
    "filter": {
      "default": "grayscale(100%)",
      ":is(.dark *)": "brightness(0.2) grayscale(100%)"
    }
  },
  "square": {
    "width": "100%",
    "maxWidth": "12rem",
    "borderRadius": "var(--radius)",
    "backgroundColor": "var(--muted)"
  },
  "portrait": {
    "width": "100%",
    "maxWidth": "10rem",
    "borderRadius": "var(--radius)",
    "backgroundColor": "var(--muted)"
  },
  "full": {
    "width": "100%",
    "maxWidth": "24rem"
  },
  "mutedFrame": {
    "borderRadius": "var(--radius)",
    "backgroundColor": "var(--muted)"
  },
  "caption": {
    "marginTop": 8,
    "textAlign": "center",
    "fontSize": 14,
    "lineHeight": "calc(1.25 / .875)",
    "color": "var(--muted-foreground)"
  },
  "badgeRow": {
    "display": "flex",
    "flexWrap": "wrap",
    "gap": 8
  },
  "badgeCenter": {
    "display": "flex",
    "width": "100%",
    "flexWrap": "wrap",
    "justifyContent": "center",
    "gap": 8
  },
  "buttons": {
    "display": "flex",
    "flexWrap": "wrap",
    "alignItems": "center",
    "gap": 8,
    "flexDirection": {
      "default": null,
      "@media (min-width: 48rem)": "row"
    }
  },
  "buttonSizes": {
    "display": "flex",
    "flexDirection": {
      "default": "column",
      "@media (min-width: 40rem)": "row"
    },
    "alignItems": "flex-start",
    "gap": 32
  },
  "buttonSizeRow": {
    "display": "flex",
    "alignItems": "flex-start",
    "gap": 8
  },
  "row": {
    "display": "flex",
    "gap": 8
  },
  "rounded": {
    "borderRadius": "calc(infinity * 1px)"
  },
  "rtlArrow": {
    "rotate": {
      "default": null,
      ":dir(rtl)": "180deg"
    }
  },
  "avatar": {
    "width": 48,
    "height": 48
  },
  "grayscale": {
    "filter": "grayscale(100%)"
  },
  "searchWidth": {
    "width": {
      "default": "100%",
      "@media (min-width: 40rem)": "75%"
    }
  },
  "emptyButtons": {
    "flexDirection": "row",
    "justifyContent": "center",
    "gap": 8
  },
  "muted": {
    "color": "var(--muted-foreground)"
  },
  "rtlLink": {
    "rotate": {
      "default": null,
      ":dir(rtl)": "270deg"
    }
  },
  "maximum": {
    "maxWidth": "24rem"
  },
  "autoHeight": {
    "height": "auto"
  },
  "code": {
    "fontFamily": "var(--font-mono)",
    "fontSize": 14,
    "lineHeight": "calc(1.25 / .875)"
  },
  "mono": {
    "fontFamily": "var(--font-mono)"
  },
  "end": {
    "marginLeft": "auto"
  },
  "screenReader": {
    "position": "absolute",
    "width": 1,
    "height": 1,
    "padding": 0,
    "margin": -1,
    "overflow": "hidden",
    "clipPath": "inset(50%)",
    "whiteSpace": "nowrap",
    "borderWidth": 0
  },
  "inputGroups": {
    "display": "grid",
    "width": "100%",
    "maxWidth": "24rem",
    "gap": 24
  },
  "roundGroup": {

  },
  "popover": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 4,
    "borderRadius": "calc(var(--radius) + 4px)",
    "fontSize": 14,
    "lineHeight": "calc(1.25 / .875)"
  },
  "medium": {
    "fontWeight": 500
  },
  "prefix": {
    "paddingLeft": 6,
    "color": "var(--muted-foreground)"
  },
  "favorite": {
    "fill": {
      "default": null,
      ":is([data-favorite=\"true\"])": "oklch(54.6% 0.245 262.881)"
    },
    "stroke": {
      "default": null,
      ":is([data-favorite=\"true\"])": "oklch(54.6% 0.245 262.881)"
    }
  },
  "inputStack": {
    "display": "grid",
    "width": "100%",
    "maxWidth": "24rem",
    "gap": 16
  },
  "dropdown": {
    "paddingRight": 6,
    "fontSize": 12,
    "lineHeight": "calc(1 / .75)"
  },
  "smallIcon": {
    "width": 12,
    "height": 12
  },
  "spin": {
    "animationName": spin,
    "animationDuration": "1s",
    "animationTimingFunction": "linear",
    "animationIterationCount": "infinite"
  },
  "narrow": {
    "maxWidth": "20rem"
  },
  "logicalEnd": {
    "marginInlineStart": "auto"
  },
  "inputGrid": {
    "display": "grid",
    "maxWidth": "24rem",
    "gridTemplateColumns": "repeat(2, minmax(0, 1fr))"
  },
  "required": {
    "color": "var(--destructive)"
  },
  "formRow": {
    "display": "grid",
    "gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
    "gap": 16
  },
  "keys": {
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "gap": 16
  },
  "keyInputs": {
    "display": "flex",
    "width": "100%",
    "maxWidth": "20rem",
    "flexDirection": "column",
    "gap": 24
  },
  "separator": {
    "display": "flex",
    "maxWidth": "24rem",
    "flexDirection": "column",
    "gap": 16,
    "fontSize": 14,
    "lineHeight": "calc(1.25 / .875)"
  },
  "description": {
    "display": "flex",
    "flexDirection": "column",
    "gap": 6
  },
  "heading": {
    "lineHeight": 1,
    "fontWeight": 500
  },
  "skeleton": {
    "display": "flex",
    "alignItems": "center",
    "gap": 16
  },
  "circle": {
    "height": 48,
    "width": 48,
    "borderRadius": "calc(infinity * 1px)"
  },
  "lines": {},
  "line250": {
    "height": 16,
    "width": 250
  },
  "line200": {
    "height": 16,
    "width": 200
  },
  "payment": {
    "display": "flex",
    "width": "100%",
    "maxWidth": "20rem",
    "flexDirection": "column",
    "gap": 16
  },
  "clamp": {
    "overflow": "hidden",
    "display": "-webkit-box",
    "WebkitBoxOrient": "vertical",
    "WebkitLineClamp": 1
  },
  "paymentEnd": {
    "flex": "none",
    "justifyContent": "flex-end"
  },
  "amount": {
    "fontSize": 14,
    "lineHeight": "calc(1.25 / .875)",
    "fontVariantNumeric": "tabular-nums"
  },
  "textarea": {
    "width": "100%",
    "maxWidth": "20rem"
  },
  "tooltips": {
    "display": "grid",
    "gap": 16
  },
  "tooltipRow": {
    "display": "flex",
    "flexWrap": "wrap",
    "justifyContent": "center",
    "gap": 8
  }
});
export const demoStyle=<K extends keyof typeof styles>(name:K)=>({xstyle:styles[name], style: (name==='roundGroup'?{'--radius':'9999px'}:name==='payment'?{'--radius':'1rem'}:undefined) as CSSProperties | undefined});
export const demoProps=(name:keyof typeof styles)=>name==='lines'?{className:'official-skeleton-lines'}:({...stylex.props(styles[name]), ...(['roundGroup','payment'].includes(name)?{style:demoStyle(name).style}:{})});
