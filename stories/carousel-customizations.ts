import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({
demo:{width:'100%',maxWidth:{default:'12rem','@media (min-width: 640px)':'20rem'}},
plugin:{width:'100%',maxWidth:{default:'10rem','@media (min-width: 640px)':'20rem'}},
wide:{width:'100%',maxWidth:{default:'12rem','@media (min-width: 640px)':'20rem','@media (min-width: 768px)':'24rem'}},
full:{width:'100%',maxWidth:'20rem'},
registry:{marginInline:'auto',maxWidth:{default:'20rem','@media (min-width: 640px)':'24rem'}},
card:{display:'flex',aspectRatio:'1 / 1',alignItems:'center',justifyContent:'center',padding:'1.5rem'},
verticalCard:{display:'flex',alignItems:'center',justifyContent:'center',padding:'1.5rem'},
gap:{marginInlineStart:'-.25rem'},
verticalContent:{marginTop:'-.25rem',height:270},
verticalItem:{flexBasis:'50%',paddingTop:'.25rem'},
size:{flexBasis:{default:'50%','@media (min-width: 1024px)':'calc(100% / 3)'}},
spacing:{paddingInlineStart:'.25rem',flexBasis:{default:'50%','@media (min-width: 1024px)':'calc(100% / 3)'}},
multiple:{flexBasis:{default:'100%','@media (min-width: 640px)':'50%','@media (min-width: 1024px)':'calc(100% / 3)'}},
registryGap:{paddingInlineStart:'.25rem',flexBasis:{default:'100%','@media (min-width: 768px)':'50%'}},
control:{display:{default:'none','@media (min-width: 640px)':'inline-flex'}},
margin:{margin:1},custom:(width:number)=>({width}),item:{backgroundColor:'var(--muted)'},button:{borderRadius:0}});
export const carouseldemo={xstyle:styles.demo};
export const carouselplugin={xstyle:styles.plugin};
export const carouselwide={xstyle:styles.wide};
export const carouselfull={xstyle:styles.full};
export const carouselregistry={xstyle:styles.registry};
export const carouselcard={xstyle:styles.card};
export const carouselverticalCard={xstyle:styles.verticalCard};
export const carouselgap={xstyle:styles.gap};
export const carouselverticalContent={xstyle:styles.verticalContent};
export const carouselverticalItem={xstyle:styles.verticalItem};
export const carouselsize={xstyle:styles.size};
export const carouselspacing={xstyle:styles.spacing};
export const carouselmultiple={xstyle:styles.multiple};
export const carouselregistryGap={xstyle:styles.registryGap};
export const carouselcontrol={xstyle:styles.control};
export const carouselmargin={xstyle:styles.margin};
export const carouselCustom=(width:number)=>({xstyle:styles.custom(width)});
export const carouselCustomItem={xstyle:styles.item};
export const carouselCustomButton={xstyle:styles.button};
