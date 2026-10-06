import * as stylex from '@stylexjs/stylex';
import {NativeSelect,NativeSelectOption,NativeSelectOptGroup} from '../../registry/ariax/ui/native-select';
const styles=stylex.create({custom:{width:200,lineHeight:1.5},dynamic:(width:number)=>({width})});
<NativeSelect size="sm" style={{lineHeight:1.5}} xstyle={[styles.custom,styles.dynamic(220)]}><NativeSelectOptGroup label="Group" xstyle={styles.custom}><NativeSelectOption value="one" style={{color:'red'}}>One</NativeSelectOption></NativeSelectOptGroup></NativeSelect>;
// @ts-expect-error external classes are forbidden
<NativeSelect className="external"/>;
// @ts-expect-error native numeric size is intentionally replaced by the original size API
<NativeSelect size={2}/>;
// @ts-expect-error xstyle requires a compiled StyleX object
<NativeSelect xstyle={{width:200}}/>;
// @ts-expect-error external option classes are forbidden
<NativeSelectOption className="external"/>;
// @ts-expect-error external group classes are forbidden
<NativeSelectOptGroup label="Group" className="external"/>;
