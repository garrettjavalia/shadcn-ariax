import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({demo:{maxWidth:'24rem',borderWidth:1,borderStyle:'solid'},fit:{width:'fit-content'},card:{width:'100%',padding:0,paddingTop:0,paddingBottom:0},zero:{padding:0,paddingInline:0},custom:{width:320,height:240},item:{fontWeight:600}});
export const commandDemo={xstyle:styles.demo};
export const commandFit={xstyle:styles.fit};
export const commandCard={xstyle:styles.card};
export const commandZero={xstyle:styles.zero};
export const commandCustom={xstyle:styles.custom};
export const commandItem={xstyle:styles.item};
