import * as stylex from '@stylexjs/stylex';
import './bubble-markdown.css';
const styles=stylex.create({
 pre:{whiteSpace:'pre-line'},toggle:{gap:'calc(var(--spacing, .25rem) * 1)',padding:0,paddingInlineStart:0,color:'var(--muted-foreground)'},chevron:{rotate:{default:null,':is([data-panel-open] *)':'180deg'}},expanded:{color:{default:null,':is([aria-expanded="true"])':'var(--destructive)'}},small:{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'},reactionPadding:{paddingInline:'calc(var(--spacing, .25rem) * 1.5)',paddingBlock:'calc(var(--spacing, .25rem) * 0.5)'},reactionBackground:{gap:'calc(var(--spacing, .25rem) * 1)',backgroundColor:'var(--background)'},dashed:{borderStyle:'dashed',borderColor:'var(--border)'},
 custom:(gap:number)=>({gap,height:'calc(var(--spacing, .25rem) * 12)',backgroundColor:'var(--accent)',padding:4}),
});
export const bubblePre={xstyle:styles.pre},bubbleToggle={xstyle:styles.toggle},bubbleExpanded={xstyle:styles.expanded},bubbleSmall={xstyle:styles.small},bubbleReactionPadding={xstyle:styles.reactionPadding},bubbleReactionBackground={xstyle:styles.reactionBackground},bubbleDashed={xstyle:styles.dashed};
const chevron=stylex.props(styles.chevron);
export const bubbleChevron={className:chevron.className,style:chevron.style};
export const bubbleMarkdown={className:'ariax-example-markdown'};
export const bubbleCustom=(gap:number)=>({xstyle:styles.custom(gap)});
