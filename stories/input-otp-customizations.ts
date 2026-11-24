import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
  spaced:{marginBlockStart:0,marginBlockEnd:'.5rem'},
  support:{textDecorationLine:'underline',textUnderlineOffset:4,transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionDuration:'150ms',transitionTimingFunction:'cubic-bezier(.4,0,.2,1)',color:{default:null,'@media (hover: hover)':{default:null,':hover':'var(--primary)'}}},field:{width:'fit-content'},rtlField:{marginInline:'auto',maxWidth:'20rem'},card:{marginInline:'auto',maxWidth:'28rem'},large:{height:48,width:44,fontSize:'1.25rem',lineHeight:'calc(1.75 / 1.25)'},separator:{marginInline:'.5rem',display:'block',alignItems:'normal','--ariax-otp-icon-size':'24px'},button:{width:'100%'},footer:{flexDirection:'column',gap:'.5rem'},gap:(gap:number)=>({gap}),customSlot:{height:40,width:40,borderRadius:0}});
export const otpSupport = stylex.props(styles.support);
export const otpControlled = {containerXstyle:styles.spaced};
export const otpField={xstyle:styles.field};
export const otpRtlField={xstyle:styles.rtlField};
export const otpCard={xstyle:styles.card};
export const otpLargeGroup={};
export const otpRegistryGroup={};
export const otpLargeSlot={xstyle:styles.large};
export const otpSeparator={xstyle:styles.separator};
export const otpButton={xstyle:styles.button};
export const otpFooter={xstyle:styles.footer};
export const otpCustom=(gap:number)=>({containerXstyle:styles.gap(gap)});
export const otpCustomSlot={xstyle:styles.customSlot};

export const otpInputStyle={};
