import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
 demoRoot:{display:'flex',width:350,flexDirection:'column',gap:'0.5rem'},
 demoHeader:{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'1rem',paddingInline:'1rem'},
 demoTitle:{fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)',fontWeight:600},
 toggleSize:{width:'2rem',height:'2rem'},
 hidden:{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0, 0, 0, 0)',whiteSpace:'nowrap',borderWidth:0},
 fieldHidden:{position:'absolute',width:'auto',height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0, 0, 0, 0)',whiteSpace:'nowrap',borderWidth:0},
 statusRow:{display:'flex',alignItems:'center',justifyContent:'space-between',borderRadius:'calc(var(--radius) * 0.8)',borderWidth:1,borderStyle:'solid',paddingInline:'1rem',paddingBlock:'0.5rem',fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)'},
 muted:{color:'var(--muted-foreground)'},medium:{fontWeight:500},panelStack:{display:'flex',flexDirection:'column',gap:'0.5rem'},
 detailBox:{borderRadius:'calc(var(--radius) * 0.8)',borderWidth:1,borderStyle:'solid',paddingInline:'1rem',paddingBlock:'0.5rem',fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)'},
 cardWidth:{marginInline:'auto',width:'100%',maxWidth:'24rem'},
 basicRoot:{borderRadius:'calc(var(--radius) * 0.8)',backgroundColor:{default:null,':is([data-state="open"], [data-open]:not([data-open="false"]))':'var(--muted)'}},
 fullWidth:{width:'100%'},
 basicChevron:{marginLeft:'auto',rotate:{default:null,':is(.ariax-button[data-panel-open] *)':'180deg'}},
 basicPanel:{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'0.5rem',padding:'0.625rem',paddingTop:0,fontSize:'0.875rem',lineHeight:'calc(1.25 / 0.875)'},
 settingsWidth:{marginInline:'auto',width:'100%',maxWidth:'20rem'},settingsRoot:{display:'flex',alignItems:'flex-start',gap:'0.5rem'},
 settingsGrid:{display:'grid',width:'100%',gridTemplateColumns:'repeat(2, minmax(0, 1fr))',gap:'0.5rem'},
 settingsPanel:{gridColumn:'1 / -1',display:'grid',gridTemplateColumns:'subgrid',gap:'0.5rem'},
 folderButton:{width:'100%',justifyContent:'flex-start',transitionProperty:'none',backgroundColor:{default:null,':hover':{default:null,'@media (hover: hover)':'var(--accent)'}},color:{default:null,':hover':{default:null,'@media (hover: hover)':'var(--accent-foreground)'}}},
 folderChevron:{transitionProperty:'transform, translate, scale, rotate',transitionTimingFunction:'cubic-bezier(0.4, 0, 0.2, 1)',transitionDuration:'150ms',rotate:{default:null,':is(.ariax-button[data-state="open"] *)':'90deg'}},
 nestedFolder:{marginTop:'0.25rem',marginLeft:'1.25rem',display:'flex',flexDirection:'column',gap:'0.25rem'},
 fileButton:{width:'100%',justifyContent:'flex-start',gap:'0.5rem',color:'var(--foreground)'},
 treeWidth:{marginInline:'auto',width:'100%',maxWidth:'16rem',gap:'0.5rem'},treeStack:{display:'flex',flexDirection:'column',gap:'0.25rem'},
});
export const basicRoot={xstyle:styles.basicRoot};
export const cardWidth={xstyle:styles.cardWidth};
export const demoRoot={xstyle:styles.demoRoot};
export const fieldHidden={xstyle:styles.fieldHidden};
export const fileButton={xstyle:styles.fileButton};
export const folderButton={xstyle:styles.folderButton};
export const fullWidth={xstyle:styles.fullWidth};
export const settingsGrid={xstyle:styles.settingsGrid};
export const settingsRoot={xstyle:styles.settingsRoot};
export const settingsWidth={xstyle:styles.settingsWidth};
export const toggleSize={xstyle:styles.toggleSize};
export const treeWidth={xstyle:styles.treeWidth};
function attrs(style:stylex.StyleXStyles){const applied=stylex.props(style);return {className:applied.className,style:applied.style}}
export const basicChevron=attrs(styles.basicChevron);
export const basicPanel=attrs(styles.basicPanel);
export const demoHeader=attrs(styles.demoHeader);
export const demoTitle=attrs(styles.demoTitle);
export const detailBox=attrs(styles.detailBox);
export const folderChevron=attrs(styles.folderChevron);
export const hidden=attrs(styles.hidden);
export const medium=attrs(styles.medium);
export const muted=attrs(styles.muted);
export const nestedFolder=attrs(styles.nestedFolder);
export const panelStack=attrs(styles.panelStack);
export const settingsPanel=attrs(styles.settingsPanel);
export const statusRow=attrs(styles.statusRow);
export const treeStack=attrs(styles.treeStack);
