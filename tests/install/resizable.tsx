import * as stylex from '@stylexjs/stylex';
import {ResizablePanelGroup,ResizablePanel,ResizableHandle} from '@resizable';
const styles=stylex.create({root:{height:200},handle:{backgroundColor:'red'}});
export default function Fixture(){return <ResizablePanelGroup xstyle={styles.root} onLayoutChange={()=>{}}><ResizablePanel style={{padding:8}} defaultSize="30%" minSize="20%" collapsible>One</ResizablePanel><ResizableHandle withHandle xstyle={styles.handle}/><ResizablePanel>Two</ResizablePanel></ResizablePanelGroup>;}
