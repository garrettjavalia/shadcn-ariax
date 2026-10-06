import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell, TableFooter, TableCaption } from '@table';
import { Checkbox } from '@checkbox';
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ custom: { minWidth: 160 }, dynamic: (width: number) => ({ width }) });
export default function TableInstallFixture() {
  return <><Table aria-label="Installed table" selectionMode="multiple" xstyle={styles.dynamic(320)} style={{ width: 300 }}><TableHeader><TableHead><Checkbox slot="selection" /></TableHead><TableHead isRowHeader>Name</TableHead></TableHeader><TableBody><TableRow><TableCell><Checkbox slot="selection" /></TableCell><TableCell style={{ fontWeight: 500 }} xstyle={styles.custom}>Row</TableCell></TableRow></TableBody><TableFooter><TableRow><TableCell>Total</TableCell></TableRow></TableFooter></Table><TableCaption>Installed caption</TableCaption></>;
}
