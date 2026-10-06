import{typographyProps,type TypographyRecipe,type TypographyOptions}from'../../registry/ariax/ui/typography.recipe.stylex';
const recipe:TypographyRecipe='blockquote';const options:TypographyOptions={style:{color:'red'}};
<blockquote {...typographyProps(recipe,options)}>Quote</blockquote>;
// @ts-expect-error typography accepts supported intrinsic recipes
 typographyProps('dialog');
// @ts-expect-error external classes are not a recipe customization API
 typographyProps('h1',{className:'text-lg'});
