import {Checkbox} from '@checkbox';
import {Label} from '@label';
import {useState} from 'react';
import {tableCustom,cellCustom} from '@table-customizations';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@table';
const meta = { title: 'Components/Table', component: Table, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;
const invoices = [['INV001','Paid','Credit Card','$250.00'],['INV002','Pending','PayPal','$150.00'],['INV003','Unpaid','Bank Transfer','$350.00'],['INV004','Paid','Credit Card','$450.00'],['INV005','Paid','PayPal','$550.00'],['INV006','Pending','Bank Transfer','$200.00'],['INV007','Unpaid','Credit Card','$300.00']];
function Invoices({count=7, rtl=false, selection=false, wide=false}: {count?:number;rtl?:boolean;selection?:boolean;wide?:boolean}) { return <figure style={{width:'100%'}}><Table aria-label="Invoices" dir={rtl?'rtl':undefined} selectionMode={selection?'multiple':'none'} style={wide?{minWidth:1200}:undefined}><TableHeader><TableHead isRowHeader style={{width:100}}>{rtl?'الفاتورة':'Invoice'}</TableHead><TableHead>{rtl?'الحالة':'Status'}</TableHead><TableHead>{rtl?'الطريقة':'Method'}</TableHead><TableHead style={{textAlign:'right'}}>{rtl?'المبلغ':'Amount'}</TableHead></TableHeader><TableBody>{invoices.slice(0,count).map((row,index)=><TableRow id={row[0]} key={row[0]}>{row.map((text,i)=><TableCell key={i} style={i===0?{fontWeight:500}:i===3?{textAlign:'right'}:undefined}>{rtl&&i===1?({Paid:'مدفوع',Pending:'قيد الانتظار',Unpaid:'غير مدفوع'}[text as 'Paid']):rtl&&i===2?({'Credit Card':'بطاقة ائتمانية',PayPal:'PayPal','Bank Transfer':'تحويل بنكي'}[text as 'PayPal']):text}</TableCell>)}</TableRow>)}</TableBody><TableFooter><TableRow><TableCell colSpan={3}>{rtl?'المجموع':'Total'}</TableCell><TableCell style={{textAlign:'right'}}>$2,500.00</TableCell></TableRow></TableFooter></Table><TableCaption>{rtl?'قائمة بفواتيرك الأخيرة.':'A list of your recent invoices.'}</TableCaption></figure>; }
export const Demo: Story = {render:()=> <TableDemo/>};
export const Footer: Story = {render:()=> <TableFooterExample/>};
export const Rtl: Story = {render:()=> <TableRtl/>};
export const Selection: Story = {render:()=> <Invoices selection/>};
export const Scroll: Story = {tags:['viewport-390'],render:()=> <Invoices wide/>};
export const Empty: Story = {render:()=> <Table aria-label="Empty"><TableHeader><TableHead isRowHeader>Name</TableHead></TableHeader><TableBody renderEmptyState={()=>'No results'}>{[]}</TableBody></Table>};
export const Expanded: Story = {render:()=> <Table aria-label="Expanded"><TableHeader><TableHead isRowHeader>Name</TableHead></TableHeader><TableBody><TableRow><TableCell><button aria-expanded="true">Details</button></TableCell></TableRow></TableBody></Table>};

function CustomizedTable(){const [width,setWidth]=useState(150);return <><button onClick={()=>setWidth(240)}>Resize</button><Table aria-label="Custom" {...tableCustom} style={{fontSize:'1rem'}}><TableHeader><TableHead isRowHeader>Name</TableHead></TableHeader><TableBody><TableRow id="a" style={({isSelected,defaultStyle})=>({...defaultStyle,color:isSelected?'red':undefined})}><TableCell {...cellCustom(width)}>Customized</TableCell></TableRow></TableBody></Table><TableCaption style={{marginTop:24}}>Caption</TableCaption></>;}
export const Customized: Story = {render:()=> <CustomizedTable/>};

const users=[['1','Sarah Chen','sarah.chen@example.com','Admin'],['2','Marcus Rodriguez','marcus.rodriguez@example.com','User'],['3','Priya Patel','priya.patel@example.com','User'],['4','David Kim','david.kim@example.com','Editor']];
function CheckboxTable({labels=false}:{labels?:boolean}){return <>{labels&&<div><Label htmlFor="select-all-checkbox">Select all</Label>{users.map(([id,name])=><Label key={id} htmlFor={`row-${id}-checkbox`}>Select {name}</Label>)}</div>}<Table aria-label="Users" selectionMode="multiple"><TableHeader><TableHead style={{width:'2rem'}}><Checkbox id="select-all-checkbox" name="select-all-checkbox" slot="selection"/></TableHead><TableHead isRowHeader>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead></TableHeader><TableBody>{users.map(([id,name,email,role])=><TableRow key={id}><TableCell><Checkbox id={`row-${id}-checkbox`} name={`row-${id}-checkbox`} slot="selection"/></TableCell><TableCell style={{fontWeight:500}}>{name}</TableCell><TableCell>{email}</TableCell><TableCell>{role}</TableCell></TableRow>)}</TableBody></Table></>;}
export const CheckboxSelection:Story={render:()=> <CheckboxTable/>};
export const CheckboxLabels:Story={render:()=> <CheckboxTable labels/>};

import {TableDemo} from './table-examples/demo';
import {TableFooterExample} from './table-examples/footer';
import {TableRtl} from './table-examples/rtl';
import * as Registry from './table-examples/registry';
export const RegistryBasic:Story={render:()=> <Registry.TableBasic/>};
export const RegistryFooter:Story={render:()=> <Registry.TableWithFooter/>};
export const RegistrySimple:Story={render:()=> <Registry.TableSimple/>};
export const RegistryBadges:Story={render:()=> <Registry.TableWithBadges/>};
export const RegistryActions:Story={render:()=> <Registry.TableWithActions/>};
export const RegistrySelect:Story={render:()=> <Registry.TableWithSelect/>};
export const RegistryInput:Story={render:()=> <Registry.TableWithInput/>};
import {TableActions} from './table-examples/actions';
export const OfficialActions:Story={render:()=> <TableActions/>};
