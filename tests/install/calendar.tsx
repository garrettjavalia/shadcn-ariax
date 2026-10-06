import {useState} from 'react';
import {Button} from '@button';
import {Popover,PopoverTrigger} from '@popover';
import { Calendar,RangeCalendar } from '@calendar';
import { CalendarDate } from '@internationalized/date';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({width:(width:number)=>({width})});
export default function CalendarInstallFixture(){return <><DatePickerInstallComposition/><Calendar defaultValue={new CalendarDate(2026,2,12)} xstyle={styles.width(240)} style={({isDisabled})=>({opacity:isDisabled?.5:1,lineHeight:1.75})} captionLayout="dropdown" renderCell={({defaultChildren,isToday})=><span>{defaultChildren}{isToday?'today':''}</span>}/><Calendar selectionMode="multiple" defaultValue={[new CalendarDate(2026,2,12)]} style={{padding:0}}/><RangeCalendar defaultValue={{start:new CalendarDate(2026,2,12),end:new CalendarDate(2026,2,20)}} numberOfMonths={2} showWeekNumber headerFormat={{month:'long'}} xstyle={styles.width(480)} style={({isInvalid})=>({opacity:isInvalid?.5:1})}/></>}

function DatePickerInstallComposition(){const [date,setDate]=useState<CalendarDate|null>(null);const [open,setOpen]=useState(false);return <PopoverTrigger isOpen={open} onOpenChange={setOpen}><Button variant="outline" style={({isPressed})=>({opacity:isPressed?.8:1})}>{date?.toString()??'Pick a date'}</Button><Popover style={{padding:0,width:'auto'}}><Calendar value={date} onChange={value=>{setDate(value);setOpen(false)}}/></Popover></PopoverTrigger>;}
