import * as stylex from '@stylexjs/stylex';
import { Button, LinkButton, buttonProps } from '../../registry/ariax/ui/button';
const styles = stylex.create({ wide: { minWidth: 160 }, dynamic: (width: number) => ({ width }) });
<Button xstyle={[styles.wide, false, styles.dynamic(200)]}>Valid</Button>;
<LinkButton xstyle={styles.wide} href="#">Valid</LinkButton>;
<a {...buttonProps({ xstyle: styles.wide })}>Valid</a>;
// @ts-expect-error External CSS classes are not the customization API.
<Button className="h-10">Invalid</Button>;
// @ts-expect-error Inline CSS bypasses StyleX composition.
<Button style={{ height: 40 }}>Invalid</Button>;
// @ts-expect-error LinkButton follows the same contract.
<LinkButton className="h-10" href="#">Invalid</LinkButton>;
// @ts-expect-error Raw CSS objects must be defined through stylex.create().
<Button xstyle={{ height: 40 }}>Invalid</Button>;
// @ts-expect-error The helper also only accepts StyleX customizations.
buttonProps({ className: 'h-10' });
