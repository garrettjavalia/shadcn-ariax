import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({
  rounded: { borderRadius: 'calc(infinity * 1px)' },
  initial: { height: 60, minWidth: 120 },
  dynamic: (width: number) => ({ width }),
  custom: { height: 44, minWidth: 160, borderRadius: '0.75rem', paddingLeft: 20, paddingRight: 20, opacity: { default: null, ':hover': { default: null, '@media (hover: hover)': 0.8 } } },
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

const radioStyles=stylex.create({fit:{width:'fit-content'},max:{maxWidth:'24rem'},fieldset:{width:'100%',maxWidth:'20rem'},normal:{fontWeight:400}});
export const radioFit={xstyle:radioStyles.fit};export const radioMax={xstyle:radioStyles.max};export const radioFieldset={xstyle:radioStyles.fieldset};export const radioNormal={xstyle:radioStyles.normal};
const radioCustomStyles=stylex.create({initial:{width:180,gap:'0.25rem'},dynamic:(width:number)=>({width,gap:'1rem'}),item:{width:24,height:24}});
export const radioCustom=(width:number)=>({xstyle:[radioCustomStyles.initial,radioCustomStyles.dynamic(width)],style:({isDisabled}:{isDisabled:boolean})=>({padding:isDisabled?0:8})});
export const radioItemCustom={xstyle:radioCustomStyles.item,style:({isSelected}:{isSelected:boolean})=>({width:isSelected?28:24,opacity:0.8})};
