import * as stylex from '@stylexjs/stylex';
import {animationStyles} from '../src/ariax/ui/animations.stylex';
import {markerVariants} from '@marker';
const styles=stylex.create({column:{flexDirection:'column'},center:{justifyContent:'center'},flex:{flex:1},hover:{transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',transitionDuration:'150ms',color:{default:'var(--muted-foreground)',':hover':{default:null,'@media (hover: hover)':'var(--foreground)'}}},custom:(gap:number)=>({gap,color:'var(--primary)',padding:8}),icon:{width:20,height:20,'--ariax-marker-icon-size':'20px'}});
export const markerShimmer={xstyle:animationStyles.shimmer};
export const markerColumn={xstyle:styles.column};
export const markerCenter={xstyle:styles.center};
export const markerFlex={xstyle:styles.flex};
export const markerHover={xstyle:styles.hover};
export const markerCustom=(gap:number)=>({xstyle:styles.custom(gap)});
export const markerCustomIcon={xstyle:styles.icon};
export const markerHelper={xstyle:markerVariants({variant:'border'})};

const drawerStyles=stylex.create({
 grid:{display:'grid',gap:'.75rem',paddingInline:'1rem',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'},
 row:{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',borderRadius:'calc(var(--radius) * .8)',borderWidth:1,borderStyle:'solid',paddingInline:'.75rem',paddingBlock:'.5rem'},
 truncate:{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'},muted:{color:'var(--muted-foreground)'},
});
function nativeDrawerStyle(value:stylex.StyleXStyles){const applied=stylex.props(value);return {className:applied.className,style:applied.style};}
export const markerDrawerClasses={grid:nativeDrawerStyle(drawerStyles.grid),row:nativeDrawerStyle(drawerStyles.row),truncate:nativeDrawerStyle(drawerStyles.truncate),muted:nativeDrawerStyle(drawerStyles.muted)};
