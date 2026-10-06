import * as stylex from '@stylexjs/stylex';
import { Tooltip, TooltipTrigger } from '../../registry/ariax/ui/tooltip';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
<Tooltip xstyle={[styles.dynamic(200), false]} style={({placement})=>({color:placement==='top'?'red':'blue'})}>Text</Tooltip>;
<TooltipTrigger delay={250} closeDelay={100} isDisabled><button>Trigger</button><Tooltip>Text</Tooltip></TooltipTrigger>;
// @ts-expect-error External className is unsupported.
<Tooltip className="bg-red-500" />;
// @ts-expect-error Raw CSS is not a compiled StyleX style.
<Tooltip xstyle={{width:200}} />;
// @ts-expect-error Children do not accept a render function in the original wrapper.
<Tooltip>{()=> 'Text'}</Tooltip>;
