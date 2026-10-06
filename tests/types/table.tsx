import * as stylex from '@stylexjs/stylex';
import {Table,TableBody,TableHead,TableHeader,TableRow,TableCell,TableFooter,TableCaption} from '../../registry/ariax/ui/table';
const s=stylex.create({wide:{width:'100%'},dynamic:(height:number)=>({height})});
<Table xstyle={[s.wide,s.dynamic(100)]} style={({isFocused})=>({opacity:isFocused?1:.9})}><TableHeader><TableHead isRowHeader>Name</TableHead></TableHeader><TableBody><TableRow id="a" style={({isSelected})=>({color:isSelected?'red':undefined})}><TableCell style={{fontWeight:500}}>A</TableCell></TableRow></TableBody><TableFooter><TableRow><TableCell>Total</TableCell></TableRow></TableFooter></Table>;
<TableCaption style={{marginTop:20}}>Caption</TableCaption>;
// @ts-expect-error External className is unsupported.
<Table className="foo" />;
// @ts-expect-error Plain CSS object is not a StyleX object.
<Table xstyle={{width:100}} />;
