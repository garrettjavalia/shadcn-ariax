import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@card';
import * as stylex from '@stylexjs/stylex';
import {useState} from 'react';
import {ToggleGroup,ToggleGroupItem} from '@toggle-group';
const styles = stylex.create({ dynamic: (width: number) => ({ width }) });
export default function CardInstallFixture() {
  const [spacing,setSpacing]=useState('4');
  return <><ToggleGroup variant="outline" size="sm" selectedKeys={[spacing]} onSelectionChange={keys=>{const key=Array.from(keys)[0];if(key)setSpacing(String(key));}}>{[4,5,6,8].map(value=><ToggleGroupItem key={value} id={String(value)}>{value*4}px</ToggleGroupItem>)}</ToggleGroup><Card style={{ width: 300,'--card-spacing':`calc(var(--ariax-spacing, .25rem) * ${spacing})`} as React.CSSProperties} xstyle={styles.dynamic(320)}><CardHeader><CardTitle>Title</CardTitle><CardDescription>Description</CardDescription><CardAction>Action</CardAction></CardHeader><CardContent>Content</CardContent><CardFooter>Footer</CardFooter></Card></>;
}
