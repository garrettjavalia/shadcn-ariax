import * as stylex from '@stylexjs/stylex';
import { typographyProps, type TypographyRecipe, type TypographyOptions } from '@typography-recipes';
const styles=stylex.create({dynamic:(size:number)=>({fontSize:`${size}rem`,color:'var(--ariax-typography-color)'})});
const options:TypographyOptions={xstyle:styles.dynamic(2),style:{fontSize:'1rem','--ariax-typography-color':'rgb(123, 45, 67)'} as React.CSSProperties};
const recipe:TypographyRecipe='h1';
export default function TypographyInstallFixture(){return <article><h1 {...typographyProps(recipe,options)}>Installed typography</h1><p {...typographyProps('p')}>Paragraph</p><ul {...typographyProps('list')}><li>List</li></ul><blockquote {...typographyProps('blockquote')}>Quotation</blockquote><table {...typographyProps('table')}><tbody><tr {...typographyProps('tableRow')}><th {...typographyProps('tableHeader')} align="right">Header</th><td {...typographyProps('tableCell')}>Cell</td></tr></tbody></table><code {...typographyProps('inlineCode')}>code</code><small {...typographyProps('small')}>small</small></article>}
