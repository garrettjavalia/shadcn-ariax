import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({gray:{filter:'grayscale(100%)'},green:{backgroundColor:{default:'oklch(62.7% 0.194 149.214)',':is(.dark *)':'oklch(44.8% 0.119 151.328)'}},round:{borderRadius:'calc(infinity * 1px)'},w32:{width:'calc(var(--spacing, .25rem) * 32)'},layout:{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:{default:'calc(var(--spacing, .25rem) * 6)','@media (min-width: 48rem)':'calc(var(--spacing, .25rem) * 12)'}},sizes:{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'calc(var(--spacing, .25rem) * 2)',filter:'grayscale(100%)'},states:{display:'flex',flexWrap:'wrap',alignItems:'center',gap:'calc(var(--spacing, .25rem) * 2)'},dynamic:(size:number)=>({width:size,height:size}),fallback:{backgroundColor:'var(--primary)',color:'var(--primary-foreground)'}});
const map={'grayscale':styles.gray,'bg-green-600 dark:bg-green-800':styles.green,'rounded-full':styles.round,'w-32':styles.w32};
export function avatarCustom(key:keyof typeof map){return {xstyle:map[key]};}
export function avatarLayout(key:'layout'|'sizes'|'states'){const {className,style}=stylex.props(styles[key]);return {className,style};}
export function avatarDynamic(size:number){return {xstyle:[styles.dynamic(32),styles.dynamic(size)]};}
export function avatarFallbackCustom(){return {xstyle:styles.fallback};}

const registryStyles=stylex.create({empty:{width:'100%',flex:'none',borderWidth:1}});
export const avatarRegistryEmpty={xstyle:registryStyles.empty};
