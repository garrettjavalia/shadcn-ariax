import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
 active: { backgroundColor:{default:null, ':is([data-active="true"])':'oklch(95.4% 0.038 75.164)', ':is(.dark *)[data-active="true"]':'oklch(47% 0.157 37.304)'}, color:{default:null,':is([data-active="true"])':'oklch(55.3% 0.195 38.402)',':is(.dark *)[data-active="true"]':'oklch(95.4% 0.038 75.164)'} },
 dynamic:(width:number)=>({width}),
});
export const voice={xstyle:styles.active};
export const dynamic=(width:number)=>({xstyle:styles.dynamic(width)});
