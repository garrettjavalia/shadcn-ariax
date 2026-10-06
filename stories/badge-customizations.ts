import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
 blue:{backgroundColor:{default:'oklch(97% 0.014 254.604)', ':is(.dark *)':'oklch(28.2% 0.091 267.935)'},color:{default:'oklch(48.8% 0.243 264.376)', ':is(.dark *)':'oklch(80.9% 0.105 251.813)'}},
 green:{backgroundColor:{default:'oklch(98.2% 0.018 155.826)', ':is(.dark *)':'oklch(26.6% 0.065 152.934)'},color:{default:'oklch(52.7% 0.154 150.069)', ':is(.dark *)':'oklch(87.1% 0.15 154.449)'}},
 sky:{backgroundColor:{default:'oklch(97.7% 0.013 236.62)', ':is(.dark *)':'oklch(29.3% 0.066 243.157)'},color:{default:'oklch(50% 0.134 242.749)', ':is(.dark *)':'oklch(82.8% 0.111 230.318)'}},
 purple:{backgroundColor:{default:'oklch(97.7% 0.014 308.299)', ':is(.dark *)':'oklch(29.1% 0.149 302.717)'},color:{default:'oklch(49.6% 0.265 301.924)', ':is(.dark *)':'oklch(82.7% 0.119 306.383)'}},
 red:{backgroundColor:{default:'oklch(97.1% 0.013 17.38)', ':is(.dark *)':'oklch(25.8% 0.092 26.042)'},color:{default:'oklch(50.5% 0.213 27.518)', ':is(.dark *)':'oklch(80.8% 0.114 19.571)'}},
 dynamic:(width:number)=>({width}),
});
export const colors = [styles.blue,styles.green,styles.sky,styles.purple,styles.red].map(xstyle=>({xstyle}));
export const dynamic = {xstyle:styles.dynamic(123)};
