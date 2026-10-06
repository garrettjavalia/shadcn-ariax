'use client';

import * as React from 'react';
import * as stylex from '@stylexjs/stylex';
import { Tabs as TabsPrimitive, TabList, Tab, TabPanel } from 'react-aria-components';
type Custom<P> = Omit<P, 'className'> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export type TabsProps = Custom<React.ComponentProps<typeof TabsPrimitive>>;
export type TabsListProps = Custom<React.ComponentProps<typeof TabList>> & {
  variant?: 'default' | 'line' | null;
};
export type TabsTriggerProps = Custom<React.ComponentProps<typeof Tab>>;
export type TabsContentProps = Custom<React.ComponentProps<typeof TabPanel>>;
export function tabsListVariants({
  variant = 'default'
}: {
  variant?: TabsListProps['variant'];
} = {}) {
  return [styles.list, variant === 'default' ? styles.defaultList : variant === 'line' ? styles.lineList : undefined];
}
export function tabsListProps({
  variant = 'default',
  xstyle,
  style
}: {
  variant?: TabsListProps['variant'];
  xstyle?: stylex.StyleXStyles;
  style?: React.CSSProperties;
} = {}) {
  const applied = stylex.props(...tabsListVariants({
    variant
  }), xstyle);
  return {
    className: ['ariax-tabs-list', applied.className].filter(Boolean).join(' '),
    style: {
      ...applied.style,
      ...style
    }
  };
}
export function Tabs({
  className: _className,
  xstyle,
  style,
  ...props
}: TabsProps) {
  const applied = stylex.props(styles.root, xstyle);
  return <TabsPrimitive data-slot="tabs" {...props} className={['ariax-tabs', applied.className].filter(Boolean).join(' ')} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
export function TabsList({
  className: _className,
  variant = 'default',
  xstyle,
  style,
  ...props
}: TabsListProps) {
  const applied = tabsListProps({
    variant,
    xstyle
  });
  return <TabList data-slot="tabs-list" data-variant={variant} {...props} className={applied.className} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
export function TabsTrigger({
  className: _className,
  xstyle,
  style,
  ...props
}: TabsTriggerProps) {
  const applied = stylex.props(styles.trigger, xstyle);
  return <Tab data-slot="tabs-trigger" {...props} className={['ariax-tabs-trigger', applied.className].filter(Boolean).join(' ')} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
export function TabsContent({
  className: _className,
  xstyle,
  style,
  ...props
}: TabsContentProps) {
  const applied = stylex.props(styles.content, xstyle);
  return <TabPanel data-slot="tabs-content" {...props} className={applied.className} style={state => ({
    ...applied.style,
    ...(typeof style === 'function' ? style(state) : style)
  })} />;
}
const styles = stylex.create({
  root: {
    display: 'flex',
    gap: 'calc(var(--ariax-spacing, .25rem) * 2)',
    flexDirection: {
      default: null,
      ':is([data-orientation="horizontal"])': 'column'
    }
  },
  list: {
    display: 'inline-flex',
    width: 'fit-content',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted-foreground)',
    borderRadius: {
      default: 'var(--radius)',
      ':is([data-variant="line"])': 0
    },
    padding: 3,
    height: {
      default: null,
      ':is(.ariax-tabs[data-orientation="horizontal"] *)': 'calc(var(--ariax-spacing, .25rem) * 8)',
      ':is(.ariax-tabs[data-orientation="vertical"] *)': 'fit-content'
    },
    flexDirection: {
      default: null,
      ':is(.ariax-tabs[data-orientation="vertical"] *)': 'column'
    }
  },
  defaultList: {
    backgroundColor: 'var(--muted)'
  },
  lineList: {
    gap: 'calc(var(--ariax-spacing, .25rem) * 1)',
    backgroundColor: 'transparent'
  },
  trigger: {
    position: {
      default: 'relative',
      '::after': 'absolute'
    },
    content: {
      default: null,
      '::after': '""'
    },
    display: 'inline-flex',
    height: {
      default: 'calc(100% - 1px)',
      '::after': 'var(--ariax-tabs-after-height)'
    },
    flex: 1,
    cursor: 'default',
    alignItems: 'center',
    justifyContent: {
      default: 'center',
      ':is(.ariax-tabs[data-orientation="vertical"] *)': 'flex-start'
    },
    width: {
      default: null,
      ':is(.ariax-tabs[data-orientation="vertical"] *)': '100%',
      '::after': 'var(--ariax-tabs-after-width)'
    },
    whiteSpace: 'nowrap',
    gap: 'calc(var(--ariax-spacing, .25rem) * 1.5)',
    borderRadius: 'calc(var(--radius) * 0.8)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: {
      default: 'transparent',
      ':focus-visible': 'var(--ring)',
      ':is(.dark *)[data-selected="true"]': 'var(--input)',
      ':is(.dark *):is(.ariax-tabs-list[data-variant="line"] *)[data-selected="true"]': 'transparent'
    },
    paddingInline: 'calc(var(--ariax-spacing, .25rem) * 1.5)',
    paddingBlock: 'calc(var(--ariax-spacing, .25rem) * 0.5)',
    fontSize: '0.875rem',
    lineHeight: 'calc(1.25 / 0.875)',
    fontWeight: 500,
    color: {
      default: 'color-mix(in oklab, var(--foreground) 60%, transparent)',
      ':hover': {
        default: null,
        '@media (hover: hover)': 'var(--foreground)'
      },
      ':is(.dark *)': 'var(--muted-foreground)',
      ':is(.dark *):hover': {
        default: null,
        '@media (hover: hover)': 'var(--foreground)'
      },
      ':is([data-selected="true"])': 'var(--foreground)',
      ':is(.dark *)[data-selected="true"]': 'var(--foreground)'
    },
    backgroundColor: {
      default: null,
      ':is([data-selected="true"])': 'var(--background)',
      ':is(.dark *)[data-selected="true"]': 'color-mix(in oklab, var(--input) 30%, transparent)',
      ':is(.ariax-tabs-list[data-variant="line"] *)': 'transparent',
      ':is(.ariax-tabs-list[data-variant="line"] *)[data-selected="true"]': 'transparent',
      ':is(.dark *):is(.ariax-tabs-list[data-variant="line"] *)[data-selected="true"]': 'transparent',
      '::after': 'var(--foreground)'
    },
    pointerEvents: {
      default: null,
      ':disabled': 'none',
      ':is([data-disabled])': 'none'
    },
    opacity: {
      default: null,
      ':disabled': .5,
      ':is([data-disabled])': .5,
      '::after': 'var(--ariax-tabs-after-opacity)'
    },
    outlineStyle: {
      default: null,
      ':focus-visible': 'solid'
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 1
    },
    outlineColor: {
      default: null,
      ':focus-visible': 'var(--ring)'
    },
    transitionProperty: {
      default: 'all',
      '::after': 'opacity'
    },
    transitionTimingFunction: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      '::after': 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    transitionDuration: {
      default: '150ms',
      '::after': '150ms'
    },
    '--ariax-tabs-shadow': {
      default: '0 0 0 0 #0000',
      ':is(.ariax-tabs-list[data-variant="default"] *):is([data-state="active"], [data-active]:not([data-active="false"]))': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      ':is(.ariax-tabs-list[data-variant="default"] *)[data-selected="true"]': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    },
    '--ariax-tabs-ring-shadow': {
      default: '0 0 0 0 #0000',
      ':focus-visible': '0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent)'
    },
    boxShadow: {
      default: null,
      ':is(.ariax-tabs-list[data-variant="default"] *):is([data-state="active"], [data-active]:not([data-active="false"]))': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, var(--ariax-tabs-ring-shadow), var(--ariax-tabs-shadow)',
      ':is(.ariax-tabs-list[data-variant="line"] *):is([data-state="active"], [data-active]:not([data-active="false"]))': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, var(--ariax-tabs-ring-shadow), var(--ariax-tabs-shadow)',
      ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, var(--ariax-tabs-ring-shadow), var(--ariax-tabs-shadow)',
      ':is(.ariax-tabs-list[data-variant="default"] *)[data-selected="true"]': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, var(--ariax-tabs-ring-shadow), var(--ariax-tabs-shadow)',
      ':is(.ariax-tabs-list[data-variant="line"] *)[data-selected="true"]': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, var(--ariax-tabs-ring-shadow), var(--ariax-tabs-shadow)'
    },
    '--ariax-tabs-after-opacity': {
      default: 0,
      ':is(.ariax-tabs-list[data-variant="line"] *)[data-selected="true"]': 1
    },
    '--ariax-tabs-after-start': {
      default: 'auto',
      ':is(.ariax-tabs[data-orientation="horizontal"] *)': '0px'
    },
    '--ariax-tabs-after-end': {
      default: 'auto',
      ':is(.ariax-tabs[data-orientation="horizontal"] *)': '0px',
      ':is(.ariax-tabs[data-orientation="vertical"] *)': 'calc(var(--ariax-spacing, .25rem) * -1)'
    },
    '--ariax-tabs-after-top': {
      default: 'auto',
      ':is(.ariax-tabs[data-orientation="vertical"] *)': '0px'
    },
    '--ariax-tabs-after-bottom': {
      default: 'auto',
      ':is(.ariax-tabs[data-orientation="horizontal"] *)': '-5px',
      ':is(.ariax-tabs[data-orientation="vertical"] *)': '0px'
    },
    '--ariax-tabs-after-height': {
      default: 'auto',
      ':is(.ariax-tabs[data-orientation="horizontal"] *)': 'calc(var(--ariax-spacing, .25rem) * 0.5)'
    },
    '--ariax-tabs-after-width': {
      default: 'auto',
      ':is(.ariax-tabs[data-orientation="vertical"] *)': 'calc(var(--ariax-spacing, .25rem) * 0.5)'
    },
    insetInlineStart: {
      default: null,
      '::after': 'var(--ariax-tabs-after-start)'
    },
    insetInlineEnd: {
      default: null,
      '::after': 'var(--ariax-tabs-after-end)'
    },
    top: {
      default: null,
      '::after': 'var(--ariax-tabs-after-top)'
    },
    bottom: {
      default: null,
      '::after': 'var(--ariax-tabs-after-bottom)'
    },
    minHeight: {
      default: null,
      '::after': 0
    }
  },
  content: {
    flex: 1,
    outlineStyle: 'none',
    fontSize: '0.875rem',
    lineHeight: 'calc(1.25 / 0.875)'
  }
});
