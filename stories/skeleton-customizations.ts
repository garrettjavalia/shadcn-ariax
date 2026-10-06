import * as stylex from '@stylexjs/stylex';

export const shapes = stylex.create({
  demoCircle: { height: 48, width: 48, borderRadius: 'calc(infinity * 1px)' },
  line250: { height: 16, width: 250 },
  line200: { height: 16, width: 200 },
  circle: { width: 40, height: 40, flexShrink: 0, borderRadius: 'calc(infinity * 1px)' },
  line150: { height: 16, width: 150 },
  line100: { height: 16, width: 100 },
  full: { height: 16, width: '100%' },
  threeQuarter: { height: 16, width: '75%' },
  twoThird: { height: 16, width: 'calc(2/3 * 100%)' },
  half: { height: 16, width: 'calc(1/2 * 100%)' },
  video: { aspectRatio: '16 / 9', width: '100%' },
  label80: { height: 16, width: 80 },
  label96: { height: 16, width: 96 },
  input: { height: 32, width: '100%' },
  submit: { height: 32, width: 96 },
  flex: { height: 16, flex: 1 },
  usage: { height: 20, width: 100, borderRadius: 'calc(infinity * 1px)' },
});
const cardStyles=stylex.create({root:{width:'100%',maxWidth:'20rem'}});
export const skeletonCardStyle={xstyle:cardStyles.root};
