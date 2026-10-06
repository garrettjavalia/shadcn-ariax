import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({narrow:{maxWidth:{default:null,'@media (width >= 40rem)':'24rem'}},wide:{maxWidth:{default:null,'@media (width >= 40rem)':'28rem'}},footerStart:{justifyContent:{default:null,'@media (width >= 40rem)':'flex-start'}},hidden:{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clipPath:'inset(50%)',whiteSpace:'nowrap',borderWidth:0}});
export const narrow={xstyle:styles.narrow};
export const wide={xstyle:styles.wide};
export const footerStart={xstyle:styles.footerStart};
export const hiddenLabel={xstyle:styles.hidden};
export const customized={xstyle:styles.wide,style:{opacity:.95}};
