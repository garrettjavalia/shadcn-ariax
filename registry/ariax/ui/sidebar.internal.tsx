import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>();
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(window.innerWidth < 768);
    mql.addEventListener('change', onChange);
    onChange();
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return !!isMobile;
}
export function attrs(xstyle: stylex.StyleXStyles, style?: React.CSSProperties, marker?: string) {
  const applied = stylex.props(xstyle);
  return {
    className: [marker, applied.className].filter(Boolean).join(' '),
    style: {
      ...applied.style,
      ...style
    }
  };
}
const ring = '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 2px var(--sidebar-ring), 0 0 0 0 #0000';
const smallShadow = '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
export const styles = stylex.create({
  provider: {
    display: 'flex',
    minHeight: '100svh',
    width: '100%',
    backgroundColor: {
      default: null,
      ':has([data-variant="inset"])': 'var(--sidebar)'
    }
  },
  plain: {
    display: 'flex',
    height: '100%',
    width: 'var(--sidebar-width)',
    flexDirection: 'column',
    backgroundColor: 'var(--sidebar)',
    color: 'var(--sidebar-foreground)'
  },
  mobile: {
    width: {
      default: 'var(--sidebar-width)',
      ':is([data-side="left"],[data-side="right"])': '75%'
    },
    backgroundColor: 'var(--sidebar)',
    padding: 0,
    color: 'var(--sidebar-foreground)'
  },
  mobileHeader: {
    padding: 'calc(var(--ariax-spacing, .25rem) * 4)'
  },
  column: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column'
  },
  sr: {
    position: 'absolute',
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    borderWidth: 0
  },
  shell: {
    display: {
      default: 'none',
      '@media (width >= 48rem)': 'block'
    },
    color: 'var(--sidebar-foreground)'
  },
  gap: {
    position: 'relative',
    width: {
      default: 'var(--sidebar-width)',
      ':is(.ariax-sidebar[data-collapsible="offcanvas"] *)': 0,
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'var(--sidebar-width-icon)',
      ':is(.ariax-sidebar[data-collapsible="icon"][data-variant="floating"] *, .ariax-sidebar[data-collapsible="icon"][data-variant="inset"] *)': 'calc(var(--sidebar-width-icon) + calc(var(--ariax-spacing, .25rem) * 4))'
    },
    backgroundColor: 'transparent',
    rotate: {
      default: null,
      ':is(.ariax-sidebar[data-side="right"] *)': '180deg'
    },
    transitionProperty: 'width',
    transitionDuration: '200ms',
    transitionTimingFunction: 'linear'
  },
  container: {
    position: 'fixed',
    insetBlock: 0,
    zIndex: 10,
    display: {
      default: 'none',
      '@media (width >= 48rem)': 'flex'
    },
    height: '100svh',
    width: {
      default: 'var(--sidebar-width)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'var(--sidebar-width-icon)'
    },
    transitionProperty: 'left, right, width',
    transitionDuration: '200ms',
    transitionTimingFunction: 'linear',
    left: {
      default: null,
      ':is([data-side="left"])': 0,
      ':is(.ariax-sidebar[data-collapsible="offcanvas"] [data-side="left"])': 'calc(var(--sidebar-width) * -1)'
    },
    right: {
      default: null,
      ':is([data-side="right"])': 0,
      ':is(.ariax-sidebar[data-collapsible="offcanvas"] [data-side="right"])': 'calc(var(--sidebar-width) * -1)'
    },
    borderInlineEndWidth: {
      default: null,
      ':is(.ariax-sidebar[data-side="left"][data-variant="sidebar"] *)': 1
    },
    borderInlineStartWidth: {
      default: null,
      ':is(.ariax-sidebar[data-side="right"][data-variant="sidebar"] *)': 1
    }
  },
  floatingContainer: {
    padding: 'calc(var(--ariax-spacing, .25rem) * 2)',
    width: {
      default: 'var(--sidebar-width)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--sidebar-width-icon) + calc(var(--ariax-spacing, .25rem) * 4) + 2px)'
    }
  },
  inner: {
    backgroundColor: 'var(--sidebar)',
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    borderRadius: {
      default: null,
      ':is(.ariax-sidebar[data-variant="floating"] *)': 'var(--radius)'
    },
    boxShadow: {
      default: null,
      ':is(.ariax-sidebar[data-variant="floating"] *)': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px var(--sidebar-border), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    }
  },
  flip: {
    rotate: {
      default: null,
      ':dir(rtl)': '180deg'
    }
  },
  rail: {
    position: {
      default: 'absolute',
      '::after': 'absolute'
    },
    insetBlock: {
      default: 0,
      '::after': 0
    },
    zIndex: 20,
    display: {
      default: 'none',
      '@media (width >= 40rem)': 'flex'
    },
    width: {
      default: 'calc(var(--ariax-spacing, .25rem) * 4)',
      '::after': 2
    },
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'linear',
    insetInlineEnd: {
      default: null,
      ':is(.ariax-sidebar[data-side="left"] *):dir(ltr)': 'calc(var(--ariax-spacing, .25rem) * -4)',
      ':is(.ariax-sidebar[data-side="right"] *):dir(rtl)': 0,
      ':is(.ariax-sidebar[data-side="left"][data-collapsible="offcanvas"] *)': 'calc(var(--ariax-spacing, .25rem) * -2)'
    },
    insetInlineStart: {
      default: null,
      '::after': 'var(--ariax-rail-after-start)',
      ':is(.ariax-sidebar[data-side="left"] *):dir(rtl)': 'calc(var(--ariax-spacing, .25rem) * -4)',
      ':is(.ariax-sidebar[data-side="right"] *):dir(ltr)': 0,
      ':is(.ariax-sidebar[data-side="right"][data-collapsible="offcanvas"] *)': 'calc(var(--ariax-spacing, .25rem) * -2)'
    },
    translate: {
      default: '-50% 0',
      ':is(.ariax-sidebar[data-collapsible="offcanvas"] *)': '0 0'
    },
    cursor: {
      default: null,
      ':is([data-side="left"] *)': 'w-resize',
      ':is([data-side="left"] *):dir(rtl)': 'e-resize',
      ':is([data-side="right"] *)': 'e-resize',
      ':is([data-side="right"] *):dir(rtl)': 'w-resize',
      ':is([data-side="left"][data-state="collapsed"] *)': 'e-resize',
      ':is([data-side="left"][data-state="collapsed"] *):dir(rtl)': 'w-resize',
      ':is([data-side="right"][data-state="collapsed"] *)': 'w-resize',
      ':is([data-side="right"][data-state="collapsed"] *):dir(rtl)': 'e-resize'
    },
    backgroundColor: {
      default: null,
      ':hover::after': 'var(--sidebar-border)',
      ':is(.ariax-sidebar[data-collapsible="offcanvas"] *):hover': 'var(--sidebar)'
    },
    content: {
      default: null,
      '::after': '""'
    },
    '--ariax-rail-after-start': {
      default: '50%',
      ':is(.ariax-sidebar[data-collapsible="offcanvas"] *)': '100%'
    }
  },
  inset: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    flex: '1',
    flexDirection: 'column',
    backgroundColor: 'var(--background)',
    margin: {
      default: null,
      '@media (width >= 48rem)': {
        default: null,
        ':is(.ariax-sidebar[data-variant="inset"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 2)'
      }
    },
    marginInlineStart: {
      default: null,
      '@media (width >= 48rem)': {
        default: null,
        ':is(.ariax-sidebar[data-variant="inset"] ~ *)': 0,
        ':is(.ariax-sidebar[data-variant="inset"][data-state="collapsed"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 2)'
      }
    },
    borderRadius: {
      default: null,
      '@media (width >= 48rem)': {
        default: null,
        ':is(.ariax-sidebar[data-variant="inset"] ~ *)': 'calc(var(--radius) * 1.4)'
      }
    },
    boxShadow: {
      default: null,
      '@media (width >= 48rem)': {
        default: null,
        ':is(.ariax-sidebar[data-variant="inset"] ~ *)': smallShadow
      }
    }
  },
  input: {
    backgroundColor: {
      default: 'var(--background)',
      ':is(.dark *)': 'color-mix(in oklab, var(--input) 30%, transparent)',
      ':disabled': 'color-mix(in oklab, var(--input) 50%, transparent)',
      ':is(.dark *):disabled': 'color-mix(in oklab, var(--input) 80%, transparent)',
      '::file-selector-button': 'transparent'
    },
    height: 'calc(var(--ariax-spacing, .25rem) * 8)',
    width: '100%',
    boxShadow: {
      default: '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000',
      ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-input-ring), 0 0 0 0 #0000',
      ':is([aria-invalid="true"])': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-input-ring), 0 0 0 0 #0000'
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--ariax-spacing, .25rem) * 2)',
    padding: 'calc(var(--ariax-spacing, .25rem) * 2)'
  },
  separator: {
    backgroundColor: 'var(--sidebar-border)',
    marginInline: 'calc(var(--ariax-spacing, .25rem) * 2)',
    width: 'auto'
  },
  content: {
    display: {
      default: 'flex',
      '::-webkit-scrollbar': 'none'
    },
    minHeight: 0,
    flex: '1',
    flexDirection: 'column',
    overflow: {
      default: 'auto',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'hidden'
    },
    gap: 0,
    scrollbarWidth: 'none'
  },
  group: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    minWidth: 0,
    flexDirection: 'column',
    padding: 'calc(var(--ariax-spacing, .25rem) * 2)'
  },
  label: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    outlineWidth: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    outlineStyle: {
      default: 'none',
      '@media (forced-colors: active)': 'solid'
    },
    outlineColor: {
      default: null,
      '@media (forced-colors: active)': 'transparent'
    },
    outlineOffset: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    color: 'color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)',
    height: 'calc(var(--ariax-spacing, .25rem) * 8)',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: 'calc(var(--ariax-spacing, .25rem) * 2)',
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)',
    fontWeight: 500,
    transitionProperty: 'margin, opacity',
    transitionDuration: '200ms',
    transitionTimingFunction: 'linear',
    marginTop: {
      default: null,
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * -8)'
    },
    opacity: {
      default: null,
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 0
    },
    boxShadow: {
      default: null,
      ':focus-visible': ring
    }
  },
  groupAction: {
    display: {
      default: 'flex',
      '::after': {
        default: null,
        '@media (width >= 48rem)': 'none'
      },
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'none'
    },
    aspectRatio: '1 / 1',
    alignItems: 'center',
    justifyContent: 'center',
    outlineWidth: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    outlineStyle: {
      default: 'none',
      '@media (forced-colors: active)': 'solid'
    },
    outlineColor: {
      default: null,
      '@media (forced-colors: active)': 'transparent'
    },
    outlineOffset: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    color: {
      default: 'var(--sidebar-foreground)',
      ':hover': 'var(--sidebar-accent-foreground)'
    },
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)'
    },
    position: {
      default: 'absolute',
      '::after': 'absolute'
    },
    inset: {
      default: null,
      '::after': 'calc(var(--ariax-spacing, .25rem) * -2)'
    },
    top: 'calc(var(--ariax-spacing, .25rem) * 3.5)',
    insetInlineEnd: 'calc(var(--ariax-spacing, .25rem) * 3)',
    width: 'calc(var(--ariax-spacing, .25rem) * 5)',
    borderRadius: 'calc(var(--radius) * .8)',
    padding: 0,
    boxShadow: {
      default: null,
      ':focus-visible': ring
    },
    content: {
      default: null,
      '::after': '""'
    }
  },
  groupContent: {
    width: '100%',
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)'
  },
  menu: {
    display: 'flex',
    width: '100%',
    minWidth: 0,
    flexDirection: 'column',
    gap: 0
  },
  item: {
    position: 'relative'
  },
  button: {
    display: 'flex',
    width: {
      default: '100%',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)'
    },
    height: {
      default: null,
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)'
    },
    alignItems: 'center',
    overflow: 'hidden',
    outlineWidth: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    outlineStyle: {
      default: 'none',
      '@media (forced-colors: active)': 'solid'
    },
    outlineColor: {
      default: null,
      '@media (forced-colors: active)': 'transparent'
    },
    outlineOffset: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    pointerEvents: {
      default: null,
      ':disabled': 'none',
      ':is([aria-disabled="true"])': 'none'
    },
    opacity: {
      default: null,
      ':disabled': .5,
      ':is([aria-disabled="true"])': .5
    },
    gap: 'calc(var(--ariax-spacing, .25rem) * 2)',
    borderRadius: 'calc(var(--radius) * .8)',
    padding: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 2)'
    },
    paddingInlineEnd: {
      default: null,
      ':is(.ariax-sidebar-menu-item:has([data-sidebar="menu-action"]) *)': 'calc(var(--ariax-spacing, .25rem) * 8)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 2)'
    },
    textAlign: 'start',
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)',
    transitionProperty: 'width, height, padding',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)'
    },
    color: {
      default: null,
      ':hover': 'var(--sidebar-accent-foreground)',
      ':active': 'var(--sidebar-accent-foreground)',
      ':is([data-active="true"])': 'var(--sidebar-accent-foreground)'
    },
    fontWeight: {
      default: null,
      ':is([data-active="true"])': 500
    },
    boxShadow: {
      default: null,
      ':focus-visible': ring
    }
  },
  outline: {
    backgroundColor: {
      default: 'var(--background)',
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)'
    },
    boxShadow: {
      default: '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px var(--sidebar-border)',
      ':hover': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 1px var(--sidebar-accent)',
      ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 2px var(--sidebar-ring), 0 0 0 1px var(--sidebar-border)',
      ':focus-visible:hover': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 2px var(--sidebar-ring), 0 0 0 1px var(--sidebar-accent)'
    }
  },
  normal: {
    height: {
      default: 'calc(var(--ariax-spacing, .25rem) * 8)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)'
    },
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)'
  },
  small: {
    height: {
      default: 'calc(var(--ariax-spacing, .25rem) * 7)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)'
    },
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)'
  },
  large: {
    height: {
      default: 'calc(var(--ariax-spacing, .25rem) * 12)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)'
    },
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)',
    padding: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 0
    },
    paddingInlineEnd: {
      default: null,
      ':is(.ariax-sidebar-menu-item:has([data-sidebar="menu-action"]) *)': 'calc(var(--ariax-spacing, .25rem) * 8)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 0
    }
  },
  action: {
    display: {
      default: 'flex',
      '::after': {
        default: null,
        '@media (width >= 48rem)': 'none'
      },
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'none'
    },
    alignItems: 'center',
    justifyContent: 'center',
    outlineWidth: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    outlineStyle: {
      default: 'none',
      '@media (forced-colors: active)': 'solid'
    },
    outlineColor: {
      default: null,
      '@media (forced-colors: active)': 'transparent'
    },
    outlineOffset: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    color: {
      default: 'var(--sidebar-foreground)',
      ':hover': 'var(--sidebar-accent-foreground)',
      ':is(.ariax-sidebar-menu-button:hover ~ *)': 'var(--sidebar-accent-foreground)'
    },
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)'
    },
    position: {
      default: 'absolute',
      '::after': 'absolute'
    },
    inset: {
      default: null,
      '::after': 'calc(var(--ariax-spacing, .25rem) * -2)'
    },
    top: {
      default: 'calc(var(--ariax-spacing, .25rem) * 1.5)',
      ':is(.ariax-sidebar-menu-button[data-size="lg"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':is(.ariax-sidebar-menu-button[data-size="sm"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 1)'
    },
    insetInlineEnd: 'calc(var(--ariax-spacing, .25rem) * 1)',
    aspectRatio: '1 / 1',
    width: 'calc(var(--ariax-spacing, .25rem) * 5)',
    borderRadius: 'calc(var(--radius) * .8)',
    padding: 0,
    boxShadow: {
      default: null,
      ':focus-visible': ring
    },
    content: {
      default: null,
      '::after': '""'
    }
  },
  hoverAction: {
    opacity: {
      default: 1,
      '@media (width >= 48rem)': {
        default: 0,
        ':is(.ariax-sidebar-menu-item:hover *)': 1,
        ':is(.ariax-sidebar-menu-item:focus-within *)': 1,
        ':is([aria-expanded="true"])': 1
      }
    },
    color: {
      default: 'var(--sidebar-foreground)',
      ':hover': 'var(--sidebar-accent-foreground)',
      ':is(.ariax-sidebar-menu-button:hover ~ *)': 'var(--sidebar-accent-foreground)',
      ':is(.ariax-sidebar-menu-button[data-active="true"] ~ *)': 'var(--sidebar-accent-foreground)'
    }
  },
  badge: {
    display: {
      default: 'flex',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'none'
    },
    alignItems: 'center',
    justifyContent: 'center',
    fontVariantNumeric: 'tabular-nums',
    userSelect: 'none',
    color: {
      default: 'var(--sidebar-foreground)',
      ':is(.ariax-sidebar-menu-button:hover ~ *)': 'var(--sidebar-accent-foreground)',
      ':is(.ariax-sidebar-menu-button[data-active="true"] ~ *)': 'var(--sidebar-accent-foreground)'
    },
    pointerEvents: 'none',
    position: 'absolute',
    insetInlineEnd: 'calc(var(--ariax-spacing, .25rem) * 1)',
    height: 'calc(var(--ariax-spacing, .25rem) * 5)',
    minWidth: 'calc(var(--ariax-spacing, .25rem) * 5)',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: 'calc(var(--ariax-spacing, .25rem) * 1)',
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)',
    fontWeight: 500,
    top: {
      default: null,
      ':is(.ariax-sidebar-menu-button[data-size="default"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 1.5)',
      ':is(.ariax-sidebar-menu-button[data-size="lg"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':is(.ariax-sidebar-menu-button[data-size="sm"] ~ *)': 'calc(var(--ariax-spacing, .25rem) * 1)'
    }
  },
  skeleton: {
    display: 'flex',
    alignItems: 'center',
    height: 'calc(var(--ariax-spacing, .25rem) * 8)',
    gap: 'calc(var(--ariax-spacing, .25rem) * 2)',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: 'calc(var(--ariax-spacing, .25rem) * 2)'
  },
  skeletonIcon: {
    width: 'calc(var(--ariax-spacing, .25rem) * 4)',
    height: 'calc(var(--ariax-spacing, .25rem) * 4)',
    borderRadius: 'calc(var(--radius) * .8)'
  },
  skeletonText: {
    height: 'calc(var(--ariax-spacing, .25rem) * 4)',
    maxWidth: 'var(--skeleton-width)',
    flex: '1'
  },
  sub: {
    display: {
      default: 'flex',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'none'
    },
    minWidth: 0,
    flexDirection: 'column',
    borderColor: 'var(--sidebar-border)',
    marginInline: 'calc(var(--ariax-spacing, .25rem) * 3.5)',
    translate: {
      default: '1px 0',
      ':dir(rtl)': '-1px 0'
    },
    gap: 'calc(var(--ariax-spacing, .25rem) * 1)',
    borderInlineStartWidth: 1,
    paddingInline: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
    paddingBlock: 'calc(var(--ariax-spacing, .25rem) * 0.5)'
  },
  subButton: {
    display: {
      default: 'flex',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'none'
    },
    minWidth: 0,
    translate: {
      default: '-1px 0',
      ':dir(rtl)': '1px 0'
    },
    alignItems: 'center',
    overflow: 'hidden',
    outlineWidth: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    outlineStyle: {
      default: 'none',
      '@media (forced-colors: active)': 'solid'
    },
    outlineColor: {
      default: null,
      '@media (forced-colors: active)': 'transparent'
    },
    outlineOffset: {
      default: null,
      '@media (forced-colors: active)': 2
    },
    pointerEvents: {
      default: null,
      ':disabled': 'none',
      ':is([aria-disabled="true"])': 'none'
    },
    opacity: {
      default: null,
      ':disabled': .5,
      ':is([aria-disabled="true"])': .5
    },
    color: {
      default: 'var(--sidebar-foreground)',
      ':hover': 'var(--sidebar-accent-foreground)',
      ':active': 'var(--sidebar-accent-foreground)',
      ':is([data-active="true"])': 'var(--sidebar-accent-foreground)'
    },
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)'
    },
    height: 'calc(var(--ariax-spacing, .25rem) * 7)',
    gap: 'calc(var(--ariax-spacing, .25rem) * 2)',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: 'calc(var(--ariax-spacing, .25rem) * 2)',
    boxShadow: {
      default: null,
      ':focus-visible': ring
    },
    fontSize: {
      default: null,
      ':is([data-size="md"])': '.875rem',
      ':is([data-size="sm"])': '.75rem'
    },
    lineHeight: {
      default: null,
      ':is([data-size="md"])': 'calc(1.25/.875)',
      ':is([data-size="sm"])': 'calc(1/.75)'
    }
  }
});
