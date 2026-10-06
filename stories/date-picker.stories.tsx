import type {Meta,StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import {getLocalTimeZone,type CalendarDate} from '@internationalized/date';
import {CalendarIcon} from 'lucide-react';
import {Button} from '@button';import {Calendar} from '@calendar';import {Popover,PopoverTrigger} from '@popover';
import {datePopover,usageButton} from '@date-picker-customizations';
import {DatePickerDemo} from './date-picker-examples/demo';
import {DatePickerSimple as DatePickerBasic} from './date-picker-examples/basic';
import {DatePickerWithRange} from './date-picker-examples/range';
import {DatePickerSimple as DatePickerDob} from './date-picker-examples/dob';
import {DatePickerInput} from './date-picker-examples/input';
import {DatePickerTime} from './date-picker-examples/time';
import {DatePickerNaturalLanguage} from './date-picker-examples/natural-language';
import {DatePickerRtl} from './date-picker-examples/rtl';
const meta={title:'Components/DatePicker',id:'components-date-picker',tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta;
export default meta;type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <DatePickerDemo/>};export const Basic:Story={render:()=> <DatePickerBasic/>};export const Range:Story={tags:['viewport-390'],render:()=> <DatePickerWithRange/>};export const Dob:Story={render:()=> <DatePickerDob/>};export const Input:Story={render:()=> <DatePickerInput/>};export const Time:Story={render:()=> <DatePickerTime/>};export const NaturalLanguage:Story={render:()=> <DatePickerNaturalLanguage/>};export const Rtl:Story={render:()=> <DatePickerRtl/>};
function UsageExample(){const [date,setDate]=useState<CalendarDate|null>(null);return <PopoverTrigger><Button variant="outline" data-empty={!date} {...usageButton}><CalendarIcon/>{date?date.toDate(getLocalTimeZone()).toLocaleDateString(undefined,{dateStyle:'long'}):<span>Pick a date</span>}</Button><Popover {...datePopover}><Calendar value={date} onChange={setDate}/></Popover></PopoverTrigger>}
export const Usage:Story={render:()=> <UsageExample/>};
