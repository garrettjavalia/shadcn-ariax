import * as stylex from '@stylexjs/stylex';
import type {ComponentProps} from 'react';
import {animationStyles} from '../registry/ariax/ui/animations.stylex';
function dom(...styles:stylex.StyleXStyles[]){const{className,style}=stylex.props(...styles);return{className,style};}
const s=stylex.create({
custom0:{flex:'1',overflowY:'auto',padding:'calc(var(--spacing, .25rem) * 4)'},
custom1:{gap:'calc(var(--spacing, .25rem) * 2)'},
custom2:{display:'flex',alignItems:'center',gap:'calc(var(--spacing, .25rem) * 2)'},
custom3:{height:34},
custom4:{maxWidth:{default:null,'@media (min-width: 640px)':425}},
custom5:{textAlign:{default:'left','@media (min-width: 768px)':'start',":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'center'}},
custom6:{paddingInline:'calc(var(--spacing, .25rem) * 4)'},
custom7:{paddingTop:'calc(var(--spacing, .25rem) * 2)'},
custom8:{display:'grid',gap:'calc(var(--spacing, .25rem) * 3)'},
custom9:{flex:'1',padding:'calc(var(--spacing, .25rem) * 4)'},
custom10:{backgroundColor:'var(--muted)',width:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"x\"] *)":'100%',":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'100%'},height:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"x\"] *)":'100%'},aspectRatio:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'16 / 9'}},
custom11:{borderRadius:'calc(var(--radius) * 1.8)',backgroundColor:'var(--muted)',width:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"x\"] *)":'100%',":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'100%'},height:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"x\"] *)":'100%',":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'calc(var(--spacing, .25rem) * 80)'}},
custom12:{width:'100%',height:'100%',borderRadius:'calc(var(--radius) * 1.8)',backgroundColor:'var(--muted)'},
custom13:{display:'flex',flexWrap:'wrap',gap:'calc(var(--spacing, .25rem) * 2)'},
custom14:{padding:'calc(var(--spacing, .25rem) * 4)'},
custom15:{height:'calc(var(--spacing, .25rem) * 80)',width:'100%',backgroundColor:'var(--muted)'},
custom16:{height:'calc(var(--spacing, .25rem) * 80)',width:'100%',backgroundColor:'oklch(0.882 0.059 254.128)'},
custom17:{textTransform:'capitalize'},
custom18:{backgroundColor:'var(--muted)',width:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"x\"] *)":'100%',":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'100%'},height:{default:null,":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"x\"] *)":'100%',":is(:where(.ariax-drawer-popup)[data-swipe-axis=\"y\"] *)":'calc(var(--spacing, .25rem) * 80)'}},
custom19:{height:{default:null,':is([data-swipe-direction=down])':'calc(var(--spacing, .25rem) * 64)'}},
custom20:{flex:'1',overflowY:'auto',padding:'calc(var(--spacing, .25rem) * 4)',scrollbarWidth:'thin'},
custom21:{marginBottom:'calc(var(--spacing, .25rem) * 4)',lineHeight:1.5},
custom22:{height:{default:null,':is([data-swipe-direction=up])':'50vh'}},
custom23:{width:{default:null,':is([data-swipe-direction=left])':'calc(var(--spacing, .25rem) * 144)'}},
custom24:{width:{default:null,':is([data-swipe-direction=right])':'calc(var(--spacing, .25rem) * 80)'}},
custom25:{maxHeight:'calc(100dvh - 1rem)'},
custom26:{display:'grid',flex:'1',gap:'calc(var(--spacing, .25rem) * 3)',overflowY:'auto',padding:'calc(var(--spacing, .25rem) * 4)'},
custom27:{height:'calc(var(--spacing, .25rem) * 12)',backgroundColor:'var(--muted)'},
form:{display:'grid',alignItems:'flex-start',gap:'calc(var(--spacing, .25rem) * 6)'}});
export const custom0=dom(animationStyles.scrollFade,s.custom0);
export const custom1={xstyle:s.custom1};
export const custom2={xstyle:s.custom2};
export const custom3={xstyle:s.custom3};
export const custom4={xstyle:s.custom4};
export const custom5={xstyle:s.custom5};
export const custom6=dom(s.custom6);
export const custom7={xstyle:s.custom7};
export const custom8=dom(s.custom8);
export const custom9=dom(s.custom9);
export const custom10=dom(s.custom10);
export const custom11=dom(s.custom11);
export const custom12=dom(s.custom12);
export const custom13=dom(s.custom13);
export const custom14=dom(s.custom14);
export const custom15=dom(s.custom15);
export const custom16=dom(s.custom16);
export const custom17={xstyle:s.custom17};
export const custom18=dom(s.custom18);
export const custom19={xstyle:s.custom19};
export const custom20=dom(animationStyles.scrollFade,s.custom20);
export const custom21=dom(s.custom21);
export const custom22={xstyle:s.custom22};
export const custom23={xstyle:s.custom23};
export const custom24={xstyle:s.custom24};
export const custom25={xstyle:s.custom25};
export const custom26=dom(animationStyles.scrollFade,s.custom26);
export const custom27=dom(s.custom27);
export function profileFormProps(props:ComponentProps<'form'>){const sx=dom(s.form);return {...props,className:[sx.className,props.className].filter(Boolean).join(' '),style:{...sx.style,...props.style}};}
const callbacks=stylex.create({trigger:{height:34,width:180},popup:(width:number)=>({width})});
export const callbackTrigger={xstyle:callbacks.trigger};
export const callbackPopup={xstyle:callbacks.popup(280)};
