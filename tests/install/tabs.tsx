import {Tabs,TabsList,TabsTrigger,TabsContent} from '@tabs';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({dynamic:(width:number)=>({width})});
export default function TabsInstallFixture(){return <Tabs xstyle={styles.dynamic(200)} defaultSelectedKey="one"><TabsList variant="line" style={({orientation})=>({opacity:orientation==='horizontal'?1:.8})}><TabsTrigger id="one" style={({isSelected})=>({opacity:isSelected?1:.5})}>One</TabsTrigger></TabsList><TabsContent id="one" style={({isFocusVisible})=>({opacity:isFocusVisible?.8:1})}>Installed</TabsContent></Tabs>}
