import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({field:{width:'fit-content'},rtlField:{marginInline:'auto',maxWidth:'20rem'},card:{marginInline:'auto',maxWidth:'28rem'},large:{height:48,width:44,fontSize:'1.25rem',lineHeight:'calc(1.75 / 1.25)'},separator:{marginInline:'.5rem',display:'block',alignItems:'normal','--ariax-otp-icon-size':'24px'},button:{width:'100%'},footer:{flexDirection:'column',gap:'.5rem'},gap:(gap:number)=>({gap}),customSlot:{height:40,width:40,borderRadius:0}});
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
