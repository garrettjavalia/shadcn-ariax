import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@accordion';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({width:(width:number)=>({width})});
export default function AccordionInstallFixture(){return <Accordion xstyle={styles.width(200)} style={({isDisabled})=>({opacity:isDisabled?.5:1})} defaultExpandedKeys={['item']}><AccordionItem id="item" style={({isExpanded})=>({opacity:isExpanded?1:.8})}><AccordionTrigger style={({isPressed})=>({color:isPressed?'red':undefined})}>Installed</AccordionTrigger><AccordionContent xstyle={styles.width(180)} style={{opacity:.9}}>Content</AccordionContent></AccordionItem></Accordion>}
