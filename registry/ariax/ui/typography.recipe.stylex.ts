import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';

const styles = stylex.create({
  blockquote:{marginTop:'1.5rem',borderInlineStartWidth:2,paddingInlineStart:'1.5rem',fontStyle:'italic'},
  h1:{scrollMargin:'5rem',fontSize:'2.25rem',lineHeight:'calc(2.5 / 2.25)',fontWeight:800,letterSpacing:'-.025em',textWrap:'balance'},
  h1Centered:{scrollMargin:'5rem',textAlign:'center',fontSize:'2.25rem',lineHeight:'calc(2.5 / 2.25)',fontWeight:800,letterSpacing:'-.025em',textWrap:'balance'},
  leadParagraph:{fontSize:'1.25rem',lineHeight:'1.75rem',color:'var(--muted-foreground)',marginTop:{default:null,':not(:first-child)':'1.5rem'}},
  h2:{scrollMargin:'5rem',borderBottomWidth:1,paddingBottom:'.5rem',fontSize:'1.875rem',lineHeight:'calc(2.25 / 1.875)',fontWeight:600,letterSpacing:'-.025em',marginTop:{default:null,':first-child':0}},
  h2Spaced:{marginTop:{default:'2.5rem',':first-child':0},scrollMargin:'5rem',borderBottomWidth:1,paddingBottom:'.5rem',fontSize:'1.875rem',lineHeight:'calc(2.25 / 1.875)',fontWeight:600,letterSpacing:'-.025em',transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionDuration:'150ms',transitionTimingFunction:'cubic-bezier(0.4,0,0.2,1)'},
  p:{lineHeight:'1.75rem',marginTop:{default:null,':not(:first-child)':'1.5rem'}},
  link:{fontWeight:500,color:'var(--primary)',textDecorationLine:'underline',textUnderlineOffset:4},
  h3:{scrollMargin:'5rem',fontSize:'1.5rem',lineHeight:'calc(2 / 1.5)',fontWeight:600,letterSpacing:'-.025em'},
  h3Spaced:{marginTop:'2rem',scrollMargin:'5rem',fontSize:'1.5rem',lineHeight:'calc(2 / 1.5)',fontWeight:600,letterSpacing:'-.025em'},
  h4:{scrollMargin:'5rem',fontSize:'1.25rem',lineHeight:'calc(1.75 / 1.25)',fontWeight:600,letterSpacing:'-.025em'},
  list:{marginBlock:'1.5rem',marginInlineStart:'1.5rem',listStyleType:'disc'},
  tableContainer:{marginBlock:'1.5rem',width:'100%',overflowY:'auto'},
  table:{width:'100%'},
  tableRow:{margin:0,borderTopWidth:1,padding:0,backgroundColor:{default:null,':nth-child(even)':'var(--muted)'}},
  tableHeader:{borderWidth:1,paddingInline:'1rem',paddingBlock:'.5rem',textAlign:{default:'start',':is([align="center"])':'center',':is([align="right"])':'end'},fontWeight:700},
  tableCell:{borderWidth:1,paddingInline:'1rem',paddingBlock:'.5rem',textAlign:{default:'start',':is([align="center"])':'center',':is([align="right"])':'end'}},
  tableHeaderPlain:{borderWidth:1,paddingInline:'1rem',paddingBlock:'.5rem',textAlign:'start',fontWeight:700},
  tableCellPlain:{borderWidth:1,paddingInline:'1rem',paddingBlock:'.5rem',textAlign:'start'},
  inlineCode:{position:'relative',borderRadius:'.25rem',backgroundColor:'var(--muted)',paddingInline:'.3rem',paddingBlock:'.2rem',fontFamily:'var(--font-mono)',fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',fontWeight:600},
  large:{fontSize:'1.125rem',lineHeight:'calc(1.75 / 1.125)',fontWeight:600},
  lead:{fontSize:'1.25rem',lineHeight:'calc(1.75 / 1.25)',color:'var(--muted-foreground)'},
  muted:{fontSize:'.875rem',lineHeight:'calc(1.25 / .875)',color:'var(--muted-foreground)'},
  small:{fontSize:'.875rem',lineHeight:1,fontWeight:500},
});
export type TypographyRecipe = keyof typeof styles;
export type TypographyOptions = { xstyle?:stylex.StyleXStyles; style?:CSSProperties; className?:never };
export function typographyProps(recipe:TypographyRecipe, options:TypographyOptions={}) {
  const props=stylex.props(styles[recipe],options.xstyle);
  return {className:[props.className,recipe==='list'?'ariax-typography-list':undefined].filter(Boolean).join(' '),style:{...props.style,...options.style}};
}
