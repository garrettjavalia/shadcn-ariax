import * as stylex from '@stylexjs/stylex';
const s=stylex.create({fit:{width:'fit-content'},row:{display:'flex',flexWrap:'wrap',gap:'.5rem'},center:{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'.5rem'},custom:{opacity:.9},toast:{borderRadius:'calc(var(--radius) * 1.4)'}});
function dom(xstyle:stylex.StyleXStyles){const{className,style}=stylex.props(xstyle);return{className,style};}
export const fit={xstyle:s.fit},row=dom(s.row),center=dom(s.center);
export const custom={xstyle:s.custom,style:{opacity:.95}};
export const toastCustom={xstyle:s.toast,style:{padding:20,borderRadius:14}};
