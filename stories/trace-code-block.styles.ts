import * as stylex from "@stylexjs/stylex";
const spin = stylex.keyframes({ to: { transform: "rotate(360deg)" } });
export const exampleAnimations = stylex.create({
  spin: {
    animationName: spin,
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
});
export const exampleStyles = stylex.create({
  s0: {
    whiteSpace: "pre-wrap",
  },
  s1: {
    maxHeight: "16rem",
  },
  s2: {
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
  s3: {
    display: "flex",
    minHeight: "18rem",
    width: "100%",
    maxWidth: "24rem",
    flexDirection: "column",
    gap: "1rem",
    paddingBlock: "1.5rem",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
  },
  s4: {
    gap: "1rem",
  },
  s5: {
    marginTop: "auto",
    alignSelf: "flex-start",
  },
  s6: {
    maxWidth: "24rem",
  },
  s7: {
    fontFamily: "var(--font-mono)",
  },
  s8: {
    width: "100%",
    maxWidth: "24rem",
  },
  s9: {
    display: "flex",
    width: "100%",
    maxWidth: "24rem",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "1rem",
  },
  s10: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
    paddingInline: "1.5rem",
    fontFamily: "var(--font-mono)",
    fontSize: ".75rem",
    lineHeight: "calc(1 / .75)",
  },
  s11: {
    display: "flex",
    flexWrap: "wrap",
    gap: ".375rem",
  },
  s12: {
    color: "var(--muted-foreground)",
  },
  s13: {
    marginInline: "1.5rem",
    marginBottom: "1.5rem",
    width: "auto",
  },
  s14: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },
  s15: {
    width: "100%",
    maxWidth: "32rem",
  },
  s16: {
    color: {
      default: null,
      ':is([aria-pressed="true"])': "var(--foreground)",
    },
  },
  s17: {
    width: "100%",
    maxWidth: "28rem",
  },
  s18: {
    display: "flex",
    width: "100%",
    maxWidth: "28rem",
    flexDirection: "column",
    gap: "1rem",
  },
  s19: {
    maxHeight: "12rem",
  },
  s20: {
    justifyContent: "center",
  },
  s21: {
    maxHeight: "16rem",
    overflowY: "hidden",
  },
  s22: {
    maxHeight: "24rem",
  },
  s23: {
    display: "flex",
    width: "100%",
    maxWidth: "28rem",
    flexDirection: "column",
    gap: "1rem",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
  },
  s24: {
    gap: ".75rem",
  },
  s25: {
    width: "100%",
    maxWidth: "28rem",
  },
  s26: {
    display: "flex",
    width: "100%",
    maxWidth: "28rem",
    flexDirection: "column",
    gap: ".75rem",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
  },
  s27: {
    alignSelf: "flex-start",
  },
  s28: {
    borderRadius: "calc(var(--radius) * .6)",
    backgroundColor: "var(--muted)",
    paddingInline: ".25rem",
    paddingBlock: ".125rem",
    fontFamily: "var(--font-mono)",
    fontSize: ".9em",
  },
  s29: {
    display: "flex",
    minHeight: "28rem",
    width: "100%",
    maxWidth: "28rem",
    flexDirection: "column",
    gap: "1rem",
    paddingBlock: "1.5rem",
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
  },
  s30: {
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    rotate: {
      default: null,
      ':is([aria-expanded="true"] *)': "180deg",
    },
  },
});
