import {Switch} from '../../registry/ariax/ui/switch';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({dynamic:(width:number)=>({width})});
<Switch size="sm" xstyle={[styles.dynamic(32),false]} style={({isSelected})=>({opacity:isSelected?0.5:1})}>{({isSelected})=>isSelected?'Yes':'No'}</Switch>;
// @ts-expect-error external className is forbidden
<Switch className="custom"/>;
// @ts-expect-error only two sizes
<Switch size="large"/>;
// @ts-expect-error raw CSS is not StyleX
<Switch xstyle={{width:32}}/>;
<Switch isReadOnly isSelected aria-label="Read only"/>;
