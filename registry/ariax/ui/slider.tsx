'use client';

import * as stylex from '@stylexjs/stylex';
import { Slider as SliderPrimitive, SliderTrack, SliderFill, SliderThumb, composeRenderProps, type SliderProps as PrimitiveProps } from 'react-aria-components';
export type SliderValue = number | number[];
export type SliderProps<T extends SliderValue = SliderValue> = Omit<PrimitiveProps<T>, 'className'> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
function attrs(xstyle: stylex.StyleXStyles) {
  const {
    className,
    style
  } = stylex.props(xstyle);
  return {
    className,
    style
  };
}
export function Slider<T extends SliderValue = SliderValue>({
  className: _className,
  xstyle,
  style,
  ...props
}: SliderProps<T>) {
  const applied = attrs([styles.root, xstyle]);
  return <SliderPrimitive data-slot="slider" {...props} className={['ariax-slider', applied.className].filter(Boolean).join(' ')} style={composeRenderProps(style, value => ({
    ...applied.style,
    ...value
  }))}>{({
      state
    }) => <><SliderTrack data-slot="slider-track" {...attrs(styles.track)}><SliderFill data-slot="slider-range" {...attrs(styles.fill)} /></SliderTrack>{state.values.map((_, index) => <SliderThumb data-slot="slider-thumb" key={index} index={index} {...attrs(styles.thumb)} />)}</>}</SliderPrimitive>;
}
const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'flex',
    width: {
      default: '100%',
      ':where([data-orientation="vertical"])': 'auto',
      ':is(.ariax-field[data-orientation="vertical"] > *)': '100%',
      ':is(.ariax-field[data-orientation="responsive"] > *)': {
        default: '100%',
        '@container field-group (min-width: 28rem)': 'auto'
      }
    },
    touchAction: 'none',
    alignItems: 'center',
    userSelect: 'none',
    opacity: {
      default: null,
      ':where([data-disabled]:not([data-disabled="false"]))': .5
    },
    height: {
      default: null,
      ':where([data-orientation="vertical"])': '100%'
    },
    minHeight: {
      default: null,
      ':where([data-orientation="vertical"])': '10rem'
    },
    flexDirection: {
      default: null,
      ':where([data-orientation="vertical"])': 'column'
    }
  },
  track: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
    userSelect: 'none',
    backgroundColor: 'var(--muted)',
    borderRadius: 'calc(infinity * 1px)',
    height: {
      default: null,
      ':where([data-orientation="horizontal"])': '0.25rem',
      ':where([data-orientation="vertical"])': '100%'
    },
    width: {
      default: null,
      ':where([data-orientation="horizontal"])': '100%',
      ':where([data-orientation="vertical"])': '0.25rem'
    }
  },
  fill: {
    position: 'absolute',
    userSelect: 'none',
    backgroundColor: 'var(--primary)',
    height: {
      default: null,
      ':where([data-orientation="horizontal"])': '100%'
    },
    width: {
      default: null,
      ':where([data-orientation="vertical"])': '100%'
    }
  },
  thumb: {
    display: 'block',
    position: 'relative',
    flexShrink: 0,
    userSelect: 'none',
    top: {
      default: null,
      ':is(.ariax-slider[data-orientation="horizontal"] *)': '50%'
    },
    insetInlineStart: {
      default: null,
      ':is(.ariax-slider[data-orientation="vertical"] *)': '50%'
    },
    pointerEvents: {
      default: null,
      ':disabled': 'none'
    },
    opacity: {
      default: null,
      ':disabled': .5
    },
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: 'calc(infinity * 1px)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--ring)',
    backgroundColor: '#fff',
    transitionProperty: 'color, box-shadow',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: {
      default: null,
      ':hover': {
        default: null,
        '@media (hover: hover)': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000'
      },
      ':focus-visible': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000',
      ':active': '0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent), 0 0 0 0 #0000'
    },
    outlineWidth: {
      default: null,
      ':focus-visible': 2
    },
    outlineStyle: {
      default: null,
      ':focus-visible': 'solid'
    },
    outlineColor: {
      default: null,
      ':focus-visible': 'transparent'
    },
    outlineOffset: {
      default: null,
      ':focus-visible': 2
    },
    '::after': {
      content: '""',
      position: 'absolute',
      inset: '-0.5rem'
    }
  }
});
