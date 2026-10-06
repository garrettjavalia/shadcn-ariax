import { buttonProps } from '@button';
import * as stylex from "@stylexjs/stylex";
import { collapsibleGroup } from './sidebar-markers.stylex';
const styles = stylex.create({
  toast: {
    marginLeft: 160
  },
  controlHeader: {
    display: 'flex',
    height: 'calc(var(--spacing, .25rem) * 12)',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: 'calc(var(--spacing, .25rem) * 4)'
  },
  stateOpen: {
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)',
      ':is([data-state="open"])': 'var(--sidebar-accent)'
    },
    color: {
      default: null,
      ':hover': 'var(--sidebar-accent-foreground)',
      ':active': 'var(--sidebar-accent-foreground)',
      ':is([data-active="true"])': 'var(--sidebar-accent-foreground)',
      ':is([data-state="open"])': 'var(--sidebar-accent-foreground)'
    }
  },
  team: {
    display: 'flex',
    aspectRatio: '1 / 1',
    width: 'calc(var(--spacing, .25rem) * 8)',
    height: 'calc(var(--spacing, .25rem) * 8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius)',
    backgroundColor: 'var(--sidebar-primary)',
    color: 'var(--sidebar-primary-foreground)'
  },
  size16: {
    width: 'calc(var(--spacing, .25rem) * 4)',
    height: 'calc(var(--spacing, .25rem) * 4)'
  },
  details: {
    display: 'grid',
    flex: '1',
    textAlign: 'left',
    fontSize: '.875rem',
    lineHeight: 1.25
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 500
  },
  email: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)'
  },
  leftAuto: {
    marginLeft: 'auto'
  },
  menuWidth: {
    width: 'var(--radix-dropdown-menu-trigger-width)',
    minWidth: 'calc(var(--spacing, .25rem) * 56)',
    borderRadius: 'var(--radius)'
  },
  mutedXs: {
    fontSize: '.75rem',
    lineHeight: 'calc(1/.75)',
    color: 'var(--muted-foreground)'
  },
  padded: {
    gap: 'calc(var(--spacing, .25rem) * 2)',
    padding: 'calc(var(--spacing, .25rem) * 2)'
  },
  teamSmall: {
    display: 'flex',
    width: 'calc(var(--spacing, .25rem) * 6)',
    height: 'calc(var(--spacing, .25rem) * 6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'calc(var(--radius) * .8)',
    borderWidth: 1
  },
  size14: {
    width: 'calc(var(--spacing, .25rem) * 3.5)',
    height: 'calc(var(--spacing, .25rem) * 3.5)',
    flexShrink: 0
  },
  addTeam: {
    display: 'flex',
    width: 'calc(var(--spacing, .25rem) * 6)',
    height: 'calc(var(--spacing, .25rem) * 6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'calc(var(--radius) * .8)',
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  mutedMedium: {
    fontWeight: 500,
    color: 'var(--muted-foreground)'
  },
  chevronState: {
    marginLeft: 'auto',
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    rotate: {
      default: null,
      [stylex.when.ancestor('[data-state="open"]', collapsibleGroup)]: '90deg'
    }
  },
  hiddenIcon: {
    display: {
      default: 'flex',
      ':is(.ariax-sidebar[data-collapsible="icon"] *)': 'none'
    }
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
  menu48: {
    width: 'calc(var(--spacing, .25rem) * 48)',
    borderRadius: 'var(--radius)'
  },
  muted: {
    color: 'var(--muted-foreground)'
  },
  dim: {
    color: 'color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)'
  },
  avatar: {
    height: 'calc(var(--spacing, .25rem) * 8)',
    width: 'calc(var(--spacing, .25rem) * 8)',
    borderRadius: 'var(--radius)'
  },
  round: {
    borderRadius: 'var(--radius)'
  },
  leftIcon: {
    marginLeft: 'auto',
    width: 'calc(var(--spacing, .25rem) * 4)',
    height: 'calc(var(--spacing, .25rem) * 4)'
  },
  userLabel: {
    padding: 0,
    fontWeight: 400
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing, .25rem) * 2)',
    paddingInline: 'calc(var(--spacing, .25rem) * 1)',
    paddingBlock: 'calc(var(--spacing, .25rem) * 1.5)',
    textAlign: 'left',
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)'
  },
  header: {
    display: 'flex',
    height: {
      default: 'calc(var(--spacing, .25rem) * 16)',
      ':is(.ariax-sidebar-wrapper:has([data-collapsible="icon"]) *)': 'calc(var(--spacing, .25rem) * 12)'
    },
    flexShrink: 0,
    alignItems: 'center',
    gap: 'calc(var(--spacing, .25rem) * 2)',
    transitionProperty: 'width, height',
    transitionDuration: '150ms',
    transitionTimingFunction: 'linear'
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 'calc(var(--spacing, .25rem) * 2)',
    paddingInline: 'calc(var(--spacing, .25rem) * 4)'
  },
  trigger: {
    marginLeft: 'calc(var(--spacing, .25rem) * -1)'
  },
  anchorWidth: {
    width: 'var(--radix-popper-anchor-width)'
  },
  hoverLabel: {
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)',
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)'
    },
    color: {
      default: 'color-mix(in oklab, var(--sidebar-foreground) 70%, transparent)',
      ':hover': 'var(--sidebar-accent-foreground)'
    }
  },
  chevron180: {
    marginLeft: 'auto',
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    rotate: {
      default: null,
      [stylex.when.ancestor('[data-state="open"]', collapsibleGroup)]: '180deg'
    }
  },
  itemOpen: {
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)',
      ':is(.ariax-sidebar-menu-item:has([data-state="open"]) *)': 'var(--sidebar-accent)'
    }
  },
  chevron90: {
    marginLeft: 'auto',
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    rotate: {
      default: null,
      [stylex.when.ancestor('[data-state="open"]', collapsibleGroup)]: '90deg'
    }
  },
  relative: {
    position: 'relative'
  },
  language: {
    position: 'absolute',
    top: 'calc(var(--spacing, .25rem) * 4)',
    right: {
      default: 'calc(var(--spacing, .25rem) * 4)',
      ':is([dir="rtl"] *)': 'auto'
    },
    left: {
      default: null,
      ':is([dir="rtl"] *)': 'calc(var(--spacing, .25rem) * 4)'
    },
    zIndex: 10
  },
  teamDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'calc(var(--spacing, .25rem) * 0.5)',
    lineHeight: 1
  },
  medium: {
    fontWeight: 500
  },
  empty: {},
  rtlChevron: {
    marginInlineStart: 'auto',
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    rotate: {
      default: null,
      ':dir(rtl)': '180deg',
      [stylex.when.ancestor('[data-open="true"]', collapsibleGroup)]: '90deg'
    }
  },
  dataOpen: {
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)',
      ':is([data-open="true"])': 'var(--sidebar-accent)'
    },
    color: {
      default: null,
      ':hover': 'var(--sidebar-accent-foreground)',
      ':active': 'var(--sidebar-accent-foreground)',
      ':is([data-active="true"])': 'var(--sidebar-accent-foreground)',
      ':is([data-open="true"])': 'var(--sidebar-accent-foreground)'
    }
  },
  rtlDetails: {
    display: 'grid',
    flex: '1',
    textAlign: 'start',
    fontSize: '.875rem',
    lineHeight: 1.25
  },
  startIcon: {
    marginInlineStart: 'auto',
    width: 'calc(var(--spacing, .25rem) * 4)',
    height: 'calc(var(--spacing, .25rem) * 4)'
  }
});
const extraStyles = stylex.create({
  expanded: {
    backgroundColor: {
      default: null,
      ':hover': 'var(--sidebar-accent)',
      ':active': 'var(--sidebar-accent)',
      ':is([data-active="true"])': 'var(--sidebar-accent)',
      ':is([aria-expanded="true"])': 'var(--sidebar-accent)'
    },
    color: {
      default: null,
      ':hover': 'var(--sidebar-accent-foreground)',
      ':active': 'var(--sidebar-accent-foreground)',
      ':is([data-active="true"])': 'var(--sidebar-accent-foreground)',
      ':is([aria-expanded="true"])': 'var(--sidebar-accent-foreground)'
    }
  },
  noPadding: {
    padding: 0,
    paddingInline: 0,
    paddingBlock: 0
  },
  textSm: {
    fontSize: '.875rem',
    lineHeight: 'calc(1.25/.875)'
  },
  noBlockPadding: {
    paddingBlock: 0
  },
  searchPadding: {
    paddingLeft: 'calc(var(--spacing, .25rem) * 8)'
  },
  searchIcon: {
    pointerEvents: 'none',
    position: 'absolute',
    top: '50%',
    left: 'calc(var(--spacing, .25rem) * 2)',
    width: 'calc(var(--spacing, .25rem) * 4)',
    height: 'calc(var(--spacing, .25rem) * 4)',
    translate: '0 -50%',
    opacity: .5,
    userSelect: 'none'
  },
  header: {
    display: 'flex',
    height: 'calc(var(--spacing, .25rem) * 16)',
    flexShrink: 0,
    alignItems: 'center',
    gap: 'calc(var(--spacing, .25rem) * 2)',
    paddingInline: 'calc(var(--spacing, .25rem) * 4)'
  },
  main: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    gap: 'calc(var(--spacing, .25rem) * 4)',
    padding: 'calc(var(--spacing, .25rem) * 4)'
  },
  cards: {
    display: 'grid',
    gridAutoRows: 'min-content',
    gap: 'calc(var(--spacing, .25rem) * 4)',
    gridTemplateColumns: {
      default: null,
      '@media (width >= 48rem)': 'repeat(3, minmax(0, 1fr))'
    }
  },
  card: {
    aspectRatio: '16 / 9',
    borderRadius: 'calc(var(--radius) * 1.4)',
    backgroundColor: 'color-mix(in oklab, var(--muted) 50%, transparent)'
  },
  fillCard: {
    minHeight: {
      default: '100vh',
      '@media (width >= 48rem)': 'min-content'
    },
    flex: '1',
    borderRadius: 'calc(var(--radius) * 1.4)',
    backgroundColor: 'color-mix(in oklab, var(--muted) 50%, transparent)'
  },
  chevronOpen: {
    rotate: {
      default: null,
      ':is(.ariax-sidebar-menu-item[data-open="true"] *)': '90deg'
    }
  },
  bottom: {
    marginTop: 'auto'
  },
  borderHeader: {
    display: 'flex',
    height: 'calc(var(--spacing, .25rem) * 16)',
    flexShrink: 0,
    alignItems: 'center',
    gap: 'calc(var(--spacing, .25rem) * 2)',
    borderBottomWidth: 1,
    paddingInline: 'calc(var(--spacing, .25rem) * 4)'
  },
  background: {
    backgroundColor: 'var(--background)'
  },
  cardMargin: {
    marginInline: 'calc(var(--spacing, .25rem) * -2)'
  },
  cta: {
    width: '100%',
    backgroundColor: {
      default: 'var(--sidebar-primary)',
      ':hover': 'var(--muted)'
    },
    color: {
      default: 'var(--sidebar-primary-foreground)',
      ':hover': 'var(--foreground)'
    }
  },
  chevronExpanded: {
    marginLeft: 'auto',
    transitionProperty: 'transform, translate, scale, rotate',
    transitionDuration: '100ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    rotate: {
      default: null,
      [stylex.when.ancestor('[data-expanded="true"]', collapsibleGroup)]: '90deg'
    }
  },
  iconHeader: {
    display: 'flex',
    height: {
      default: 'calc(var(--spacing, .25rem) * 16)',
      ':is(.ariax-sidebar-wrapper:has([data-collapsible="icon"]) *)': 'calc(var(--spacing, .25rem) * 12)'
    },
    flexShrink: 0,
    alignItems: 'center',
    gap: 'calc(var(--spacing, .25rem) * 2)',
    borderBottomWidth: 1,
    transitionProperty: 'width, height',
    transitionDuration: '150ms',
    transitionTimingFunction: 'linear'
  },
  iconMain: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    gap: 'calc(var(--spacing, .25rem) * 4)',
    padding: 'calc(var(--spacing, .25rem) * 4)',
    paddingTop: 0
  }
});
const map = {
  "aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground": extraStyles.expanded,
  "p-0": extraStyles.noPadding,
  "text-sm": extraStyles.textSm,
  "py-0": extraStyles.noBlockPadding,
  "pl-8": extraStyles.searchPadding,
  "pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none": extraStyles.searchIcon,
  "flex h-16 shrink-0 items-center gap-2 px-4": extraStyles.header,
  "flex flex-1 flex-col gap-4 p-4": extraStyles.main,
  "grid auto-rows-min gap-4 md:grid-cols-3": extraStyles.cards,
  "aspect-video rounded-xl bg-muted/50": extraStyles.card,
  "min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min": extraStyles.fillCard,
  "group-data-open/menu-item:rotate-90": extraStyles.chevronOpen,
  "mt-auto": extraStyles.bottom,
  "flex h-16 shrink-0 items-center gap-2 border-b px-4": extraStyles.borderHeader,
  "bg-background": extraStyles.background,
  "-mx-2": extraStyles.cardMargin,
  "w-full bg-sidebar-primary text-sidebar-primary-foreground": extraStyles.cta,
  "ml-auto transition-transform duration-100 group-data-expanded/collapsible:rotate-90": extraStyles.chevronExpanded,
  "flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12": extraStyles.iconHeader,
  "flex flex-1 flex-col gap-4 p-4 pt-0": extraStyles.iconMain,
  "flex h-12 items-center justify-between px-4": styles.controlHeader,
  "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground": styles.stateOpen,
  "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground": styles.team,
  "size-4": styles.size16,
  "grid flex-1 text-left text-sm leading-tight": styles.details,
  "truncate font-medium": styles.name,
  "truncate text-xs": styles.email,
  "ml-auto": styles.leftAuto,
  "w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg": styles.menuWidth,
  "text-xs text-muted-foreground": styles.mutedXs,
  "gap-2 p-2": styles.padded,
  "flex size-6 items-center justify-center rounded-md border": styles.teamSmall,
  "size-3.5 shrink-0": styles.size14,
  "flex size-6 items-center justify-center rounded-md border bg-transparent": styles.addTeam,
  "font-medium text-muted-foreground": styles.mutedMedium,
  // StyleX markers are accepted by props(), but its StyleXStyles type treats
  // the marker namespace as the unrelated CSS marker property.
  "group/collapsible": collapsibleGroup as unknown as stylex.StyleXStyles,
  "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90": styles.chevronState,
  "group-data-[collapsible=icon]:hidden": styles.hiddenIcon,
  "sr-only": styles.sr,
  "w-48 rounded-lg": styles.menu48,
  "text-muted-foreground": styles.muted,
  "text-sidebar-foreground/70": styles.dim,
  "h-8 w-8 rounded-lg": styles.avatar,
  "rounded-lg": styles.round,
  "ml-auto size-4": styles.leftIcon,
  "p-0 font-normal": styles.userLabel,
  "flex items-center gap-2 px-1 py-1.5 text-left text-sm": styles.userRow,
  "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12": styles.header,
  "flex items-center gap-2 px-4": styles.headerInner,
  "-ml-1": styles.trigger,
  "w-(--radix-popper-anchor-width)": styles.anchorWidth,
  "text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground": styles.hoverLabel,
  "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180": styles.chevron180,
  "group-has-[[data-state=open]]/menu-item:bg-sidebar-accent": styles.itemOpen,
  "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90": styles.chevron90,
  "relative": styles.relative,
  "absolute top-4 right-4 z-10 rtl:right-auto rtl:left-4": styles.language,
  "flex flex-col gap-0.5 leading-none": styles.teamDetails,
  "font-medium": styles.medium,
  "": styles.empty,
  "ms-auto transition-transform duration-200 group-data-open/collapsible:rotate-90 rtl:rotate-180 rtl:group-data-open/collapsible:rotate-90": styles.rtlChevron,
  "data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground": styles.dataOpen,
  "grid flex-1 text-start text-sm leading-tight": styles.rtlDetails,
  "ms-auto size-4": styles.startIcon
};
export function sidebarCustom(key: keyof typeof map) {
  return {
    xstyle: map[key]
  };
}
export function sidebarNative(key: keyof typeof map) {
  const {
    className,
    style
  } = stylex.props(map[key]);
  return {
    className,
    style
  };
}
const {
  className: toastClass,
  style: toastStyle
} = stylex.props(styles.toast);
export const sidebarToast = {
  className: toastClass,
  style: toastStyle
};
export const sidebarTeamButton = buttonProps({
  size: "icon-sm",
  style: {
    width: 32,
    height: 32
  }
});
const customStyles = stylex.create({
  width: (width: number) => ({
    width
  })
});
export const sidebarCustomized = (width: number) => ({
  xstyle: customStyles.width(width)
});
export const sidebarCustomizedButton = (width: number) => ({
  xstyle: customStyles.width(width)
});
const avatarOverrides = stylex.create({
  rounded: {
    borderRadius: {
      default: "var(--radius)",
      "::after": "calc(infinity * 1px)"
    }
  }
});
export const sidebarAvatar = (key: "h-8 w-8 rounded-lg" | "rounded-lg") => ({
  xstyle: [map[key], avatarOverrides.rounded]
});
