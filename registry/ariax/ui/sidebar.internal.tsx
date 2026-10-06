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
    padding: '1rem'
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
      ':is(.ariax-sidebar[data-collapsible="icon"][data-variant="floating"] *, .ariax-sidebar[data-collapsible="icon"][data-variant="inset"] *)': 'calc(var(--sidebar-width-icon) + 1rem)'
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
    padding: '.5rem',
    width: {
      default: 'var(--sidebar-width)',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'calc(var(--sidebar-width-icon) + 1rem + 2px)'
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
      default: '1rem',
      '::after': 2
    },
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'linear',
    insetInlineEnd: {
      default: null,
      ':is(.ariax-sidebar[data-side="left"] *):dir(ltr)': '-1rem',
      ':is(.ariax-sidebar[data-side="right"] *):dir(rtl)': 0,
      ':is(.ariax-sidebar[data-side="left"][data-collapsible="offcanvas"] *)': '-.5rem'
    },
    insetInlineStart: {
      default: null,
      '::after': 'var(--ariax-rail-after-start)',
      ':is(.ariax-sidebar[data-side="left"] *):dir(rtl)': '-1rem',
      ':is(.ariax-sidebar[data-side="right"] *):dir(ltr)': 0,
      ':is(.ariax-sidebar[data-side="right"][data-collapsible="offcanvas"] *)': '-.5rem'
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
        ':is(.ariax-sidebar[data-variant="inset"] ~ *)': '.5rem'
      }
    },
    marginInlineStart: {
      default: null,
      '@media (width >= 48rem)': {
        default: null,
        ':is(.ariax-sidebar[data-variant="inset"] ~ *)': 0,
        ':is(.ariax-sidebar[data-variant="inset"][data-state="collapsed"] ~ *)': '.5rem'
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
    height: '2rem',
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
    gap: '.5rem',
    padding: '.5rem'
  },
  separator: {
    backgroundColor: 'var(--sidebar-border)',
    marginInline: '.5rem',
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
    padding: '.5rem'
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
    height: '2rem',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: '.5rem',
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)',
    fontWeight: 500,
    transitionProperty: 'margin, opacity',
    transitionDuration: '200ms',
    transitionTimingFunction: 'linear',
    marginTop: {
      default: null,
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '-2rem'
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
      '::after': '-.5rem'
    },
    top: '.875rem',
    insetInlineEnd: '.75rem',
    width: '1.25rem',
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
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '2rem'
    },
    height: {
      default: null,
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '2rem'
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
    gap: '.5rem',
    borderRadius: 'calc(var(--radius) * .8)',
    padding: {
      default: '.5rem',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '.5rem'
    },
    paddingInlineEnd: {
      default: null,
      ':is(.ariax-sidebar-menu-item:has([data-sidebar="menu-action"]) *)': '2rem',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '.5rem'
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
      default: '2rem',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '2rem'
    },
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)'
  },
  small: {
    height: {
      default: '1.75rem',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '2rem'
    },
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)'
  },
  large: {
    height: {
      default: '3rem',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': '2rem'
    },
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)',
    padding: {
      default: '.5rem',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 0
    },
    paddingInlineEnd: {
      default: null,
      ':is(.ariax-sidebar-menu-item:has([data-sidebar="menu-action"]) *)': '2rem',
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
      '::after': '-.5rem'
    },
    top: {
      default: '.375rem',
      ':is(.ariax-sidebar-menu-button[data-size="lg"] ~ *)': '.625rem',
      ':is(.ariax-sidebar-menu-button[data-size="sm"] ~ *)': '.25rem'
    },
    insetInlineEnd: '.25rem',
    aspectRatio: '1 / 1',
    width: '1.25rem',
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
      default: null,
      '@media (width >= 48rem)': 0,
      ':is(.ariax-sidebar-menu-item:hover *)': 1,
      ':is(.ariax-sidebar-menu-item:focus-within *)': 1,
      ':is([aria-expanded="true"])': 1
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
    insetInlineEnd: '.25rem',
    height: '1.25rem',
    minWidth: '1.25rem',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: '.25rem',
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)',
    fontWeight: 500,
    top: {
      default: null,
      ':is(.ariax-sidebar-menu-button[data-size="default"] ~ *)': '.375rem',
      ':is(.ariax-sidebar-menu-button[data-size="lg"] ~ *)': '.625rem',
      ':is(.ariax-sidebar-menu-button[data-size="sm"] ~ *)': '.25rem'
    }
  },
  skeleton: {
    display: 'flex',
    alignItems: 'center',
    height: '2rem',
    gap: '.5rem',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: '.5rem'
  },
  skeletonIcon: {
    width: '1rem',
    height: '1rem',
    borderRadius: 'calc(var(--radius) * .8)'
  },
  skeletonText: {
    height: '1rem',
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
    marginInline: '.875rem',
    translate: {
      default: '1px 0',
      ':dir(rtl)': '-1px 0'
    },
    gap: '.25rem',
    borderInlineStartWidth: 1,
    paddingInline: '.625rem',
    paddingBlock: '.125rem'
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
    height: '1.75rem',
    gap: '.5rem',
    borderRadius: 'calc(var(--radius) * .8)',
    paddingInline: '.5rem',
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
