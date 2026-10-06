import * as React from 'react'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { I18nProvider, type DateRange } from 'react-aria-components'
import { Calendar, RangeCalendar } from '@calendar'
import './font.css'
const border = { borderRadius: 'var(--radius)', border: '1px solid var(--border)' }
export function Basic() { return <Calendar style={border} /> }
export function Demo() { const [date,setDate] = React.useState<CalendarDate | undefined>(today(getLocalTimeZone())); return <Calendar value={date} onChange={setDate} style={border} captionLayout="dropdown" /> }
export function Caption() { return <Calendar captionLayout="dropdown" style={border} /> }
export function Range() { const [dateRange,setDateRange] = React.useState<DateRange | undefined>({start:new CalendarDate(new Date().getFullYear(),1,12),end:new CalendarDate(new Date().getFullYear(),1,12).add({days:30})}); return <RangeCalendar value={dateRange} onChange={setDateRange} numberOfMonths={2} style={border} /> }
export function Rtl() { const [date,setDate] = React.useState<CalendarDate | undefined>(today(getLocalTimeZone())); return <I18nProvider locale="ar"><Calendar value={date} onChange={setDate} style={{...border,'--cell-size':'2.25rem'} as React.CSSProperties} captionLayout="dropdown" /></I18nProvider> }
export function Hijri() { const [date,setDate] = React.useState<CalendarDate | undefined>(new CalendarDate(2025,6,12)); return <div style={{fontFamily:'Vazirmatn, sans-serif'}}><I18nProvider locale="fa-AF-u-ca-persian"><Calendar value={date} onChange={setDate} style={border} /></I18nProvider></div> }
