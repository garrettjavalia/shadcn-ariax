import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
 stack:{display:'flex',flexDirection:'column',gap:'1rem'},
 weightItem:{display:'flex',width:'4rem',height:'4rem',flexDirection:'column',alignItems:'center',justifyContent:'center',borderRadius:'calc(var(--radius) * 1.4)'},
 light:{fontSize:'1.5rem',lineHeight:1,fontWeight:300},
 normal:{fontSize:'1.5rem',lineHeight:1,fontWeight:400},
 medium:{fontSize:'1.5rem',lineHeight:1,fontWeight:500},
 bold:{fontSize:'1.5rem',lineHeight:1,fontWeight:700},
 label:{fontSize:'0.75rem',lineHeight:'calc(1/.75)',color:'var(--muted-foreground)'},
 code:{borderRadius:'calc(var(--radius) * .8)',backgroundColor:'var(--muted)',paddingInline:'0.25rem',paddingBlock:'0.125rem',fontFamily:'var(--font-mono)'},
 custom:(width:number)=>({width}),
});
function attrs(xstyle:stylex.StyleXStyles){const{className,style}=stylex.props(xstyle);return{className,style};}
export const groupStack=attrs(styles.stack);
export const weightItem={xstyle:styles.weightItem};
export const weightLight=attrs(styles.light);
export const weightNormal=attrs(styles.normal);
export const weightMedium=attrs(styles.medium);
export const weightBold=attrs(styles.bold);
export const weightLabel=attrs(styles.label);
export const weightCode=attrs(styles.code);
export const groupCustom=(width:number)=>({xstyle:styles.custom(width)});
