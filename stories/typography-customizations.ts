export {typographyProps} from '../src/ariax/ui/typography.recipe.stylex';
import * as stylex from '@stylexjs/stylex';
import{typographyProps as recipeProps}from'../src/ariax/ui/typography.recipe.stylex';
const overrides=stylex.create({dynamic:(size:number)=>({fontSize:`${size}rem`,fontWeight:600,color:'var(--ariax-typography-user-color)'})});
export const typographyNative=()=>recipeProps('h1',{xstyle:overrides.dynamic(2),style:{fontSize:'1rem',fontWeight:400,lineHeight:1.75,'--ariax-typography-user-color':'rgb(123, 45, 67)'} as React.CSSProperties});
