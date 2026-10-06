import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  bounded: {
    marginInline: 'auto',
    width: '100%',
    maxWidth: '20rem'
  },
  controlledRoot: {
    display: 'grid',
    marginInline: 'auto',
    width: '100%',
    maxWidth: '20rem',
    gap: '0.75rem'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem'
  },
  value: {
    fontSize: '0.875rem',
    lineHeight: 'calc(1.25/.875)',
    color: 'var(--muted-foreground)'
  },
  verticalRoot: {
    display: 'flex',
    marginInline: 'auto',
    width: '100%',
    maxWidth: '20rem',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem'
  },
  vertical: {
    height: '10rem'
  },
  custom: (width: number) => ({
    width
  })
});
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
export const sliderBounded = {
  xstyle: styles.bounded
};
export const controlledRoot = attrs(styles.controlledRoot);
export const controlledHeader = attrs(styles.header);
export const controlledValue = attrs(styles.value);
export const verticalRoot = attrs(styles.verticalRoot);
export const verticalSlider = {
  xstyle: styles.vertical
};
export const sliderCustom = (width: number) => ({
  xstyle: styles.custom(width)
});
