import type {CSSProperties} from 'react';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({w32:{width:'8rem'},w36:{width:'9rem'},w40:{width:'10rem'},w44:{width:'11rem'},w48:{width:'12rem'},min56:{minWidth:'14rem'},size8:{width:'2rem',height:'2rem'},right:{textAlign:'right'},medium:{fontWeight:500},sr:{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clipPath:'inset(50%)',whiteSpace:'nowrap',borderWidth:0},dynamic:(width:number)=>({width})});
const map={'w-32':styles.w32,'w-36':styles.w36,'w-40':styles.w40,'w-44':styles.w44,'w-48':styles.w48,'min-w-56':styles.min56,'size-8':styles.size8,'text-right':styles.right,'font-medium':styles.medium};
export function dropdownCustom(key:keyof typeof map){return {xstyle:map[key]};}
export function dropdownDynamic(width:number){return {xstyle:[styles.w32,styles.dynamic(width)],style:undefined as CSSProperties|undefined};}
export function dropdownSr(){const sx=stylex.props(styles.sr);return {className:sx.className,style:sx.style};}
