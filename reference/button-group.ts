import {cn} from 'cn';
import {buttonGroupVariants} from '../generated/reference/aria-nova/ui/button-group';
import type {CSSProperties} from 'react';
export {ButtonGroup,ButtonGroupSeparator,ButtonGroupText} from '../generated/reference/aria-nova/ui/button-group';
export function buttonGroupProps({orientation,style}: {orientation?:'horizontal'|'vertical'|null;style?:CSSProperties}={}) {return {className:cn(buttonGroupVariants({orientation})),style};}
