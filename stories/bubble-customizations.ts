import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
 pre:{whiteSpace:'pre-line'},toggle:{gap:'calc(var(--spacing, .25rem) * 1)',padding:0,paddingInlineStart:0,color:'var(--muted-foreground)'},chevron:{rotate:{default:null,':is([data-panel-open] *)':'180deg'}},expanded:{color:{default:null,':is([aria-expanded="true"])':'var(--destructive)'}},small:{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)'},reactionPadding:{paddingInline:'calc(var(--spacing, .25rem) * 1.5)',paddingBlock:'calc(var(--spacing, .25rem) * 0.5)'},reactionBackground:{gap:'calc(var(--spacing, .25rem) * 1)',backgroundColor:'var(--background)'},dashed:{borderStyle:'dashed',borderColor:'var(--border)'},
 custom:(gap:number)=>({gap,height:'calc(var(--spacing, .25rem) * 12)',backgroundColor:'var(--accent)',padding:4}),
});
export const bubblePre={xstyle:styles.pre},bubbleToggle={xstyle:styles.toggle},bubbleExpanded={xstyle:styles.expanded},bubbleSmall={xstyle:styles.small},bubbleReactionPadding={xstyle:styles.reactionPadding},bubbleReactionBackground={xstyle:styles.reactionBackground},bubbleDashed={xstyle:styles.dashed};
const chevron=stylex.props(styles.chevron);
export const bubbleChevron={className:chevron.className,style:chevron.style};
export const bubbleCustom=(gap:number)=>({xstyle:styles.custom(gap)});

const markdownStyles = stylex.create({
  root: {
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
    whiteSpace: "normal",
  },
  block: {
    marginBlockStart: 0,
    marginBlockEnd: {
      default: 0,
      ":not(:last-child)": "calc(var(--ariax-spacing, .25rem) * 4)",
    },
  },
  strong: { fontWeight: 600 },
  list: { listStylePosition: "inside", listStyleType: "decimal" },
  item: { paddingBlock: "var(--ariax-spacing, .25rem)" },
});
export const markdown = {
  block: stylex.props(markdownStyles.block),
  strong: stylex.props(markdownStyles.strong),
  item: stylex.props(markdownStyles.item),
  root: stylex.props(markdownStyles.root),
  list: stylex.props(markdownStyles.block, markdownStyles.list),
};
