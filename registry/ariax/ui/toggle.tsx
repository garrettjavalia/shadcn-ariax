'use client';

import * as stylex from '@stylexjs/stylex';
import { ToggleButton, composeRenderProps, type ToggleButtonProps } from 'react-aria-components';
export type ToggleProps = Omit<ToggleButtonProps, 'className'> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
  variant?: 'default' | 'outline' | null;
  size?: 'default' | 'sm' | 'lg' | null;
};
type Variants = Pick<ToggleProps, 'variant' | 'size'>;
export function toggleVariants({
  variant = 'default',
  size = 'default'
}: Variants = {}) {
  return [styles.base, variant && variants[variant], size && sizes[size]];
}
export function toggleProps({
  variant = 'default',
  size = 'default',
  xstyle
}: Variants & Pick<ToggleProps, 'xstyle'> = {}) {
  const applied = stylex.props(...toggleVariants({
    variant,
    size
  }), xstyle);
  return {
    className: ['ariax-toggle', applied.className].filter(Boolean).join(' '),
    style: applied.style
  };
}
export function Toggle({
  className: _className,
  xstyle,
  style,
  variant = 'default',
  size = 'default',
  ...props
}: ToggleProps) {
  const applied = toggleProps({
    variant,
    size,
    xstyle
  });
  return <ToggleButton data-slot="toggle" {...props} {...applied} style={composeRenderProps(style, value => ({
    ...applied.style,
    ...value
  }))} />;
}
const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    outlineStyle: 'none',
    gap: 'calc(var(--ariax-spacing, .25rem) * 1)',
    borderRadius: 'var(--radius)',
    fontSize: '0.875rem',
    lineHeight: 'calc(1.25 / .875)',
    fontWeight: 500,
    transitionProperty: 'all',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: {
      default: null,
      ':disabled': 'none'
    },
    opacity: {
      default: null,
      ':disabled': 0.5
    },
    color: {
      default: null,
      ':hover': {
        default: null,
        '@media (hover: hover)': 'var(--foreground)'
      }
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': {
        default: null,
        '@media (hover: hover)': 'var(--muted)'
      },
      ':is([aria-pressed="true"])': 'var(--muted)',
      ':is([data-state="on"])': 'var(--muted)',
      ':where([data-selected="true"])': 'var(--muted)'
    },
    borderColor: {
      default: null,
      ':focus-visible': 'var(--ring)',
      ':is([aria-invalid="true"])': 'var(--destructive)'
    },
    '--ariax-toggle-ring': {
      default: 'color-mix(in oklab, var(--ring) 50%, transparent)',
      ':is([aria-invalid="true"])': 'color-mix(in oklab, var(--destructive) 20%, transparent)',
      ':is(.dark *)[aria-invalid="true"]': 'color-mix(in oklab, var(--destructive) 40%, transparent)'
    },
    boxShadow: {
      default: null,
      ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px var(--ariax-toggle-ring), 0 0 0 0 #0000'
    },
    '--ariax-toggle-icon-size': 'calc(var(--ariax-spacing, .25rem) * 4)'
  }
});
const variants = stylex.create({
  default: {},
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: {
      default: 'var(--input)',
      ':focus-visible': 'var(--ring)',
      ':is([aria-invalid="true"])': 'var(--destructive)'
    }
  }
});
const sizes = stylex.create({
  default: {
    height: 'calc(var(--ariax-spacing, .25rem) * 8)',
    minWidth: 'calc(var(--ariax-spacing, .25rem) * 8)',
    paddingInlineStart: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':has([data-icon="inline-start"])': 'calc(var(--ariax-spacing, .25rem) * 2)'
    },
    paddingInlineEnd: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':has([data-icon="inline-end"])': 'calc(var(--ariax-spacing, .25rem) * 2)'
    }
  },
  sm: {
    height: 'calc(var(--ariax-spacing, .25rem) * 7)',
    minWidth: 'calc(var(--ariax-spacing, .25rem) * 7)',
    borderRadius: 'min(calc(var(--radius) * .8), 12px)',
    fontSize: '0.8rem',
    lineHeight: 'inherit',
    paddingInlineStart: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':has([data-icon="inline-start"])': 'calc(var(--ariax-spacing, .25rem) * 1.5)'
    },
    paddingInlineEnd: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':has([data-icon="inline-end"])': 'calc(var(--ariax-spacing, .25rem) * 1.5)'
    },
    '--ariax-toggle-icon-size': 'calc(var(--ariax-spacing, .25rem) * 3.5)'
  },
  lg: {
    height: 'calc(var(--ariax-spacing, .25rem) * 9)',
    minWidth: 'calc(var(--ariax-spacing, .25rem) * 9)',
    paddingInlineStart: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':has([data-icon="inline-start"])': 'calc(var(--ariax-spacing, .25rem) * 2)'
    },
    paddingInlineEnd: {
      default: 'calc(var(--ariax-spacing, .25rem) * 2.5)',
      ':has([data-icon="inline-end"])': 'calc(var(--ariax-spacing, .25rem) * 2)'
    }
  }
});
