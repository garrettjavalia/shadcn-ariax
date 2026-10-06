import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({dynamic:(width:number)=>({width}),addon:{paddingLeft:'1rem'},input:{fontSize:'1.25rem'}});
export const groupCustomization={xstyle:styles.dynamic(280),style:{width:240}};
export const addonCustomization={xstyle:styles.addon};
export const inputGroupCustomization={xstyle:styles.input,style:{fontSize:18}};
const official=stylex.create({
 textarea:{minHeight:200},
 bottom:{borderTopWidth:1,paddingTop:'.5rem'},
 top:{borderBottomWidth:1,paddingBottom:'.5rem'},
 auto:{marginLeft:'auto'},
 // The original font-mono utility inherits when its token is absent.
 mono:{fontFamily:'var(--font-mono)',fontWeight:500},
 custom:{display:'flex',fieldSizing:'content',minHeight:'4rem',width:'100%',resize:'none',borderRadius:'calc(var(--radius) * .8)',backgroundColor:'transparent',paddingInline:'.75rem',paddingBlock:'.625rem',fontSize:{default:'1rem','@media (min-width: 48rem)':'.875rem'},lineHeight:{default:1.5,'@media (min-width: 48rem)':'calc(1.25 / .875)'},transitionProperty:'color, box-shadow',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',transitionDuration:'150ms',outlineStyle:'none'},
});
export const officialTextarea={xstyle:official.textarea};
export const officialBottom={xstyle:official.bottom};
export const officialTop={xstyle:official.top};
export const officialAuto={xstyle:official.auto};
export const officialMono={xstyle:official.mono};
const custom=stylex.props(official.custom);
export const officialCustom={className:custom.className,style:custom.style};
