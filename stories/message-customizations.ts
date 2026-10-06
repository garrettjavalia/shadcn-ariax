import * as stylex from '@stylexjs/stylex';
import './message-examples.css';
const styles=stylex.create({
 doc6:{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'1.5rem',paddingBlock:'3rem'},doc8:{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'2rem',paddingBlock:'3rem'},
 registry10Min:{display:'flex',width:'100%',maxWidth:'28rem',minWidth:0,flexDirection:'column',gap:'2.5rem'},registry10:{display:'flex',width:'100%',maxWidth:'28rem',flexDirection:'column',gap:'2.5rem'},registry12:{display:'flex',width:'100%',maxWidth:'28rem',flexDirection:'column',gap:'3rem'},registry8:{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:'2rem'},
 medium:{fontWeight:500},normal:{fontWeight:400},error:{fontWeight:400,color:'var(--destructive)'},timestamp:{marginInlineStart:'auto',fontWeight:400},gap2:{gap:'.5rem'},end:{justifyContent:'flex-end'},width80:{width:'80%'},full:{width:'100%'},wide:{width:'16rem'},gray:{filter:'grayscale(100%)'},pre:{whiteSpace:'pre-wrap'},
});
const native=(value:stylex.StyleXStyles)=>{const {className,style}=stylex.props(value);return {className,style};};
export const messageClasses={doc6:native(styles.doc6),doc8:native(styles.doc8),registry10Min:native(styles.registry10Min),registry10:native(styles.registry10),registry12:native(styles.registry12),registry8:native(styles.registry8),medium:native(styles.medium),normal:native(styles.normal),error:native(styles.error),timestamp:native(styles.timestamp),pre:native(styles.pre),gap2:{xstyle:styles.gap2},end:{xstyle:styles.end},width80:{xstyle:styles.width80},full:{xstyle:styles.full},wide:{xstyle:styles.wide},gray:{xstyle:styles.gray},space2:{'data-message-space':''}};
const custom=stylex.create({root:(gap:number)=>({gap,color:'var(--primary)',lineHeight:1.5})});
export const messageCustom=(gap:number)=>({xstyle:custom.root(gap)});
