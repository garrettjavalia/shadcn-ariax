import * as stylex from '@stylexjs/stylex';
import type { CSSProperties } from 'react';

const styles = stylex.create({
  blockquote:{marginTop:'calc(var(--ariax-spacing, .25rem) * 6)',borderInlineStartWidth:2,paddingInlineStart:'calc(var(--ariax-spacing, .25rem) * 6)',fontStyle:'italic'},
  h1:{scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',fontSize:'2.25rem',lineHeight:'calc(2.5 / 2.25)',fontWeight:800,letterSpacing:'-.025em',textWrap:'balance'},
  h1Centered:{scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',textAlign:'center',fontSize:'2.25rem',lineHeight:'calc(2.5 / 2.25)',fontWeight:800,letterSpacing:'-.025em',textWrap:'balance'},
  leadParagraph:{fontSize:'1.25rem',lineHeight:'calc(var(--ariax-spacing, .25rem) * 7)',color:'var(--muted-foreground)',marginTop:{default:null,':not(:first-child)':'calc(var(--ariax-spacing, .25rem) * 6)'}},
  h2:{scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',borderBottomWidth:1,paddingBottom:'calc(var(--ariax-spacing, .25rem) * 2)',fontSize:'1.875rem',lineHeight:'calc(2.25 / 1.875)',fontWeight:600,letterSpacing:'-.025em',marginTop:{default:null,':first-child':0}},
  h2Spaced:{marginTop:{default:'calc(var(--ariax-spacing, .25rem) * 10)',':first-child':0},scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',borderBottomWidth:1,paddingBottom:'calc(var(--ariax-spacing, .25rem) * 2)',fontSize:'1.875rem',lineHeight:'calc(2.25 / 1.875)',fontWeight:600,letterSpacing:'-.025em',transitionProperty:'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to',transitionDuration:'150ms',transitionTimingFunction:'cubic-bezier(0.4,0,0.2,1)'},
  p:{lineHeight:'calc(var(--ariax-spacing, .25rem) * 7)',marginTop:{default:null,':not(:first-child)':'calc(var(--ariax-spacing, .25rem) * 6)'}},
  link:{fontWeight:500,color:'var(--primary)',textDecorationLine:'underline',textUnderlineOffset:4},
  h3:{scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',fontSize:'1.5rem',lineHeight:'calc(2 / 1.5)',fontWeight:600,letterSpacing:'-.025em'},
  h3Spaced:{marginTop:'calc(var(--ariax-spacing, .25rem) * 8)',scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',fontSize:'1.5rem',lineHeight:'calc(2 / 1.5)',fontWeight:600,letterSpacing:'-.025em'},
  h4:{scrollMargin:'calc(var(--ariax-spacing, .25rem) * 20)',fontSize:'1.25rem',lineHeight:'calc(1.75 / 1.25)',fontWeight:600,letterSpacing:'-.025em'},
  list:{marginBlock:'calc(var(--ariax-spacing, .25rem) * 6)',marginInlineStart:'calc(var(--ariax-spacing, .25rem) * 6)',listStyleType:'disc'},
  tableContainer:{marginBlock:'calc(var(--ariax-spacing, .25rem) * 6)',width:'100%',overflowY:'auto'},
  table:{width:'100%'},
  tableRow:{margin:0,borderTopWidth:1,padding:0,backgroundColor:{default:null,':nth-child(even)':'var(--muted)'}},
  tableHeader:{borderWidth:1,paddingInline:'calc(var(--ariax-spacing, .25rem) * 4)',paddingBlock:'calc(var(--ariax-spacing, .25rem) * 2)',textAlign:{default:'left',':is([align="center"])':'center',':is([align="right"])':'right'},fontWeight:700},
  tableCell:{borderWidth:1,paddingInline:'calc(var(--ariax-spacing, .25rem) * 4)',paddingBlock:'calc(var(--ariax-spacing, .25rem) * 2)',textAlign:{default:'left',':is([align="center"])':'center',':is([align="right"])':'right'}},
  tableHeaderPlain:{borderWidth:1,paddingInline:'calc(var(--ariax-spacing, .25rem) * 4)',paddingBlock:'calc(var(--ariax-spacing, .25rem) * 2)',textAlign:'start',fontWeight:700},
  tableCellPlain:{borderWidth:1,paddingInline:'calc(var(--ariax-spacing, .25rem) * 4)',paddingBlock:'calc(var(--ariax-spacing, .25rem) * 2)',textAlign:'start'},
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
