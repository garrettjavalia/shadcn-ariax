import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  rounded: { borderRadius: 'calc(infinity * 1px)' },
  initial: { height: 60, minWidth: 120 },
  dynamic: (width: number) => ({ width }),
  custom: { height: 'calc(var(--spacing, .25rem) * 11)', minWidth: 'calc(var(--spacing, .25rem) * 40)', borderRadius: 'calc(var(--radius) * 1.4)', paddingLeft: 'calc(var(--spacing, .25rem) * 5)', paddingRight: 'calc(var(--spacing, .25rem) * 5)', opacity: { default: null, ':hover': { default: null, '@media (hover: hover)': 0.8 } } },
  inline: {width: 'calc(var(--spacing, .25rem) * 40)'},
});
export const rounded = { xstyle: styles.rounded };
// The later style must override both the component defaults and the earlier array entry.
export const customized = { xstyle: [styles.initial, styles.custom] };
export const dynamic = (width: number) => ({ xstyle: styles.dynamic(width) });
const separatorStyles = stylex.create({
  menu: { display: { default: 'none', '@media (width >= 48rem)': 'block' } },
  custom: { height: 4, width: 180, backgroundColor: 'var(--primary)' },
});
export const separatorMenu = { xstyle: separatorStyles.menu };
export const separatorCustom = { xstyle: separatorStyles.custom };
const labelStyles = stylex.create({ custom: { fontSize: '1.5rem', opacity: 0.8 }, dynamic: (width: number) => ({width}) });
export const labelCustomized = { xstyle: [labelStyles.custom, labelStyles.dynamic(240)], style: { opacity: 0.6 } };
const checkboxStyles = stylex.create({ initial:{height:28}, custom:{height:24,opacity:0.8},dynamic:(width:number)=>({width}) });
export const checkboxCustomized = (width:number) => ({xstyle:[checkboxStyles.initial,checkboxStyles.custom,checkboxStyles.dynamic(width)],style:{}});

const fieldStyles = stylex.create({ field: {gap:'1.25rem',padding:'0.75rem'}, dynamic:(width:number)=>({width}), label:{color:'var(--primary)',fontSize:'1.25rem',lineHeight:1.4} });
export const fieldCustomized = {xstyle:[fieldStyles.field,fieldStyles.dynamic(280)],style:{gap:'1.5rem'}};
export const fieldLabelCustomized = {xstyle:fieldStyles.label,style:{opacity:0.75}};

// Dynamic StyleX width must survive a separate inline height override.
export const inlineSizing = { xstyle: styles.inline };
export const inlineSkeletonSizing = inlineSizing;

const typographyStyles=stylex.create({dynamic:(fontSize:number,lineHeight:number)=>({fontSize,lineHeight})});
export const typographySizing={xstyle:typographyStyles.dynamic(18,2)};

const nativeSelectStyles=stylex.create({initial:{width:160,opacity:0.7},custom:{width:220,opacity:0.8},dynamic:(width:number)=>({width}),option:{color:'var(--primary)',fontWeight:500},group:(fontWeight:number)=>({fontWeight})});
export const nativeSelectCustomized=(width:number)=>({xstyle:[nativeSelectStyles.initial,nativeSelectStyles.custom,nativeSelectStyles.dynamic(width)],style:{opacity:0.6}});
export const nativeSelectOptionCustomized={xstyle:nativeSelectStyles.option,style:{color:'blue'}};
export const nativeSelectGroupCustomized={xstyle:nativeSelectStyles.group(600),style:{fontWeight:400}};

const switchStyles=stylex.create({first:{width:60},last:{width:48},dynamic:(height:number)=>({height})});
export const switchCustomized=(height:number)=>({xstyle:[switchStyles.first,switchStyles.last,switchStyles.dynamic(height)],style:({isSelected}:{isSelected:boolean})=>({opacity:isSelected?0.8:0.9})});

const radioStyles=stylex.create({fit:{width:'fit-content'},max:{maxWidth:'24rem'},fieldset:{width:'100%',maxWidth:'20rem'},normal:{fontWeight:400}});
export const radioFit={xstyle:radioStyles.fit};export const radioMax={xstyle:radioStyles.max};export const radioFieldset={xstyle:radioStyles.fieldset};export const radioNormal={xstyle:radioStyles.normal};
const radioCustomStyles=stylex.create({initial:{width:180,gap:'0.25rem'},dynamic:(width:number)=>({width,gap:'1rem'}),item:{width:24,height:24}});
export const radioCustom=(width:number)=>({xstyle:[radioCustomStyles.initial,radioCustomStyles.dynamic(width)],style:({isDisabled}:{isDisabled:boolean})=>({padding:isDisabled?0:8})});
export const radioItemCustom={xstyle:radioCustomStyles.item,style:({isSelected}:{isSelected:boolean})=>({width:isSelected?28:24,opacity:0.8})};
