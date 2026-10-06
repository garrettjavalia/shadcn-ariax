import * as stylex from '@stylexjs/stylex';
import {ButtonGroup,ButtonGroupText,ButtonGroupSeparator,buttonGroupProps} from '@button-group';
const styles=stylex.create({dynamic:(width:number)=>({width})});
export default function Fixture(){return <><ButtonGroup orientation="vertical" xstyle={styles.dynamic(240)} style={{width:280}}><ButtonGroupText xstyle={styles.dynamic(80)} style={{width:90}}>Text</ButtonGroupText><ButtonGroupSeparator orientation="horizontal" xstyle={styles.dynamic(120)} style={{width:140}}/></ButtonGroup><div {...buttonGroupProps({xstyle:styles.dynamic(200),style:{width:220}})}>Helper</div></>;}
