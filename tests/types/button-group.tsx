import {createRef} from 'react';
import * as stylex from '@stylexjs/stylex';
import {ButtonGroup,ButtonGroupText,ButtonGroupSeparator,buttonGroupProps,buttonGroupVariants} from '../../registry/ariax/ui/button-group';
const styles=stylex.create({dynamic:(width:number)=>({width})});
<ButtonGroup ref={createRef<HTMLDivElement>()} orientation={null} xstyle={styles.dynamic(120)} style={{width:160}} aria-label="Tools"/>;
<ButtonGroupText render={props=><label {...props} htmlFor="name"/>} xstyle={styles.dynamic(120)} style={{fontSize:20}}/>;
<ButtonGroupSeparator orientation="horizontal" xstyle={styles.dynamic(12)} style={{height:2}}/>;
<div {...buttonGroupProps({orientation:'vertical',xstyle:styles.dynamic(120),style:{width:160}})}/>;
<div {...buttonGroupVariants()}/>;
// @ts-expect-error Unsupported orientation.
<ButtonGroup orientation="diagonal"/>;
// @ts-expect-error External class names are unsupported.
<ButtonGroup className="flex"/>;
// @ts-expect-error External class names are unsupported.
<ButtonGroupText className="flex"/>;
// @ts-expect-error External class names are unsupported.
<ButtonGroupSeparator className="flex"/>;
