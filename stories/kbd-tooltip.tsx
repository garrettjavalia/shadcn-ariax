import {ButtonGroup} from '@button-group';
import {Button} from '@button';
import {Tooltip,TooltipTrigger} from '@tooltip';
import {Kbd,KbdGroup} from '@kbd';
export function KbdTooltipComposition(){return <div style={{display:"flex",flexWrap:"wrap",gap:16}}><ButtonGroup><TooltipTrigger><Button variant="outline">Save</Button><Tooltip data-parity-portal>Save Changes <Kbd>S</Kbd></Tooltip></TooltipTrigger><TooltipTrigger><Button variant="outline">Print</Button><Tooltip data-parity-portal>Print Document <KbdGroup><Kbd>Ctrl</Kbd><Kbd>P</Kbd></KbdGroup></Tooltip></TooltipTrigger></ButtonGroup></div>;}
