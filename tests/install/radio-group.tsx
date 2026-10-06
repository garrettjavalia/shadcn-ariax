import {RadioGroup, RadioGroupItem} from '@radio-group';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({dynamic:(width:number)=>({width})});
export default function RadioGroupInstallFixture(){return <RadioGroup aria-label="Installed choices" name="installed-choices" style={state=>({opacity:state.isDisabled?0.5:1})} xstyle={styles.dynamic(200)}><RadioGroupItem value="one" style={state=>({opacity:state.isSelected?1:0.8})}>One</RadioGroupItem></RadioGroup>;}
