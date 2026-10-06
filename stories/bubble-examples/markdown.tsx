import type * as React from 'react';
import {code} from '@streamdown/code';
import {Streamdown} from 'streamdown';
import {bubbleMarkdown} from '@bubble-customizations';
// The official example uses Streamdown; keep its real parser and code plugin.
export function Markdown(props:React.ComponentProps<typeof Streamdown>){return <Streamdown data-slot="markdown" plugins={{code}} controls={false} {...bubbleMarkdown} {...props}/>;}
