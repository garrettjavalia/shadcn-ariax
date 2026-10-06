import type {Meta,StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import {I18nProvider} from 'react-aria-components';
import {CalendarDate,getLocalTimeZone,today} from '@internationalized/date';
import {Calendar,RangeCalendar} from '@calendar';
import {Basic as BasicExample,Demo as DemoExample,Range as RangeExample,Caption as CaptionExample,Rtl as RtlExample,Hijri as HijriExample} from './calendar-examples/basic';
import {CalendarWithPresets} from './calendar-examples/calendar-presets';
import {CalendarWithTime} from './calendar-examples/calendar-time';
import {CalendarBookedDates} from './calendar-examples/calendar-booked-dates';
import {CalendarCustomDays} from './calendar-examples/calendar-custom-days';
import {calendarCustom} from '@calendar-customizations';
const meta={title:'Components/Calendar',component:Calendar,tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof Calendar>;
export default meta;type Story=StoryObj<typeof meta>;
export const Basic:Story={render:()=> <BasicExample/>};
export const Demo:Story={render:()=> <DemoExample/>};
export const Range:Story={tags:['viewport-390'],render:()=> <RangeExample/>};
export const Caption:Story={render:()=> <CaptionExample/>};
export const Rtl:Story={render:()=> <RtlExample/>};
export const Hijri:Story={render:()=> <HijriExample/>};
export const Presets:Story={render:()=> <CalendarWithPresets/>};
export const Time:Story={render:()=> <CalendarWithTime/>};
export const BookedDates:Story={render:()=> <CalendarBookedDates/>};
export const CustomDays:Story={tags:['viewport-390'],render:()=> <CalendarCustomDays/>};
function UsageExample(){const [date,setDate]=useState<CalendarDate|null>(today(getLocalTimeZone()));return <Calendar value={date} onChange={setDate} style={{border:'1px solid var(--border)',borderRadius:'var(--radius)'}}/>}
export const Usage:Story={render:()=> <UsageExample/>};
function CustomizedExample(){const [width,setWidth]=useState(240);return <><Calendar defaultValue={new CalendarDate(2026,2,12)} {...calendarCustom(width)}/><button onClick={()=>setWidth(300)}>Resize</button></>}
export const Customized:Story={render:()=> <CustomizedExample/>};
export const Multiple:Story={render:()=> <Calendar selectionMode="multiple" defaultValue={[new CalendarDate(2026,2,12),new CalendarDate(2026,2,15)]} showWeekNumber/>};
export const Disabled:Story={render:()=> <Calendar isDisabled defaultValue={new CalendarDate(2026,2,12)} minValue={new CalendarDate(2026,2,1)} maxValue={new CalendarDate(2026,2,28)}/>};
export const Invalid:Story={render:()=> <RangeCalendar isInvalid defaultValue={{start:new CalendarDate(2026,2,12),end:new CalendarDate(2026,2,20)}}/>};

export const RtlRange:Story={render:()=> <I18nProvider locale="ar"><RangeCalendar defaultValue={{start:new CalendarDate(2026,2,7),end:new CalendarDate(2026,2,20)}} numberOfMonths={2}/></I18nProvider>};
export const WeekBoundary:Story={render:()=> <RangeCalendar defaultValue={{start:new CalendarDate(2026,2,1),end:new CalendarDate(2026,2,14)}} showWeekNumber/>};
export const Bounded:Story={render:()=> <Calendar defaultValue={new CalendarDate(2026,2,11)} minValue={new CalendarDate(2026,2,10)} maxValue={new CalendarDate(2026,2,18)} isDateUnavailable={date=>date.day===12} buttonVariant="outline"/>};
