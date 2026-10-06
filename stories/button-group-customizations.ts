import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
 responsive: {display:{default:'none','@media (width >= 40rem)':'flex'}},
 active: { backgroundColor:{default:null, ':is([data-active="true"])':'oklch(95.4% 0.038 75.164)', ':is(.dark *)[data-active="true"]':'oklch(47% 0.157 37.304)'}, color:{default:null,':is([data-active="true"])':'oklch(55.3% 0.195 38.402)',':is(.dark *)[data-active="true"]':'oklch(95.4% 0.038 75.164)'} },
 dynamic:(width:number)=>({width}),
});
export const voice={xstyle:styles.active};
export const responsiveGroup={xstyle:styles.responsive};
export const dynamic=(width:number)=>({xstyle:styles.dynamic(width)});

import {buttonProps} from '@button';
const composition=stylex.create({
 menu160:{width:160},menu176:{width:176},menu200:{width:200},
 triggerPadding:{paddingInlineStart:8},mono:{fontFamily:'var(--font-mono)'},muted:{color:'var(--muted-foreground)'},
 popover:{borderRadius:'calc(var(--radius) * 1.4)',fontSize:'0.875rem',lineHeight:'calc(1.25 / .875)'},
 hidden:{position:'absolute',width:{default:1,':is(.ariax-field[data-orientation="vertical"] > *)':'auto',':is(.ariax-field[data-orientation="responsive"] > *)':'auto'},height:1,padding:0,margin:-1,overflow:'hidden',clipPath:'inset(50%)',whiteSpace:'nowrap',borderWidth:0},
 noResize:{resize:'none'},rtlIcon:{rotate:{default:null,':dir(rtl)':'180deg'}},
 column:{display:'flex',flexDirection:'column',gap:'1rem'},luma:{borderColor:{default:null,':is(.style-luma *)':'var(--border)'}},
 grid:{display:'grid',gridTemplateColumns:'repeat(3, minmax(0, 1fr))',gap:'1rem'},span:{gridColumn:'span 2 / span 2'},
 row:{display:'flex',gap:'1.5rem'},fit:{height:'fit-content'},count:{width:48},
});
const dom=(styles:stylex.StyleXStyles)=>{const{className,style}=stylex.props(styles);return{className,style}};
export const menu160={xstyle:composition.menu160},menu176={xstyle:composition.menu176},menu200={xstyle:composition.menu200};
export const triggerPadding={xstyle:composition.triggerPadding},mono={xstyle:composition.mono},muted={xstyle:composition.muted},mutedText=dom(composition.muted);
export const popoverCustom={xstyle:composition.popover},hiddenLabel={xstyle:composition.hidden},noResize={xstyle:composition.noResize},rtlIcon=dom(composition.rtlIcon);
export const column4=dom(composition.column),lumaBorder={},fieldsGrid={xstyle:composition.grid},fieldSpan={xstyle:composition.span},row6=dom(composition.row),fitHeight={xstyle:composition.fit};
export const likeCount=buttonProps({variant:'outline',size:'icon',xstyle:composition.count});
const documentStyles=stylex.create({sizeColumn:{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'2rem'}});
export const sizeColumn=dom(documentStyles.sizeColumn),pill={style:{'--radius':'9999rem'} as import('react').CSSProperties};
