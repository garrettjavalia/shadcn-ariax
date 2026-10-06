import { Calendar, RangeCalendar } from "@calendar";
import { CalendarDate } from "@internationalized/date";
const date = new CalendarDate(2026, 2, 12);
<Calendar
  defaultValue={date}
  style={({ isDisabled }) => ({ opacity: isDisabled ? 0.5 : 1 })}
/>;
<Calendar selectionMode="multiple" defaultValue={[date]} />;
<RangeCalendar
  defaultValue={{ start: date, end: date.add({ days: 3 }) }}
  style={({ isInvalid }) => ({ opacity: isInvalid ? 0.5 : 1 })}
/>;
// @ts-expect-error External classes are not part of the StyleX API.
<Calendar className="calendar" />;
// @ts-expect-error External classes are not part of the StyleX API.
<RangeCalendar className="calendar" />;
// @ts-expect-error Single selection accepts one date.
<Calendar defaultValue={[date]} />;
// @ts-expect-error Multiple selection accepts an array.
<Calendar selectionMode="multiple" defaultValue={date} />;
// @ts-expect-error Calendar duration is controlled through numberOfMonths.
<Calendar visibleDuration={{ months: 2 }} />;
