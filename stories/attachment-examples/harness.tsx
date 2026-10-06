import type {ComponentProps} from 'react';
import * as Icons from 'lucide-react';
export function IconPlaceholder({lucide}: {lucide:string;[key:string]:unknown}){const Icon=(Icons as unknown as Record<string,typeof Icons.FileTextIcon>)[lucide];if(!Icon)throw Error('Unknown official Lucide icon '+lucide);return <Icon/>;}
export function ExampleWrapper({children}:ComponentProps<'div'>){return <div style={{display:'flex',flexDirection:'column',width:'100%',gap:'2rem'}}>{children}</div>;}
export function Example({title,children,gap='1.5rem'}:ComponentProps<'div'>&{gap?:string}){return <section style={{width:'100%',maxWidth:'32rem',marginInline:'auto',display:'flex',flexDirection:'column',gap:'1rem'}}><h3>{title}</h3><div style={{display:'flex',flexDirection:'column',alignItems:'flex-start',minWidth:0,gap}}>{children}</div></section>;}
