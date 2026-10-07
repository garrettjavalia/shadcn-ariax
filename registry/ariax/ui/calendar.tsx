"use client";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Calendar as AriaCalendar,
  RangeCalendar as AriaRangeCalendar,
  CalendarGridHeader,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarMonthPicker,
  CalendarYearPicker,
  composeRenderProps,
  type CalendarCellRenderProps,
  type CalendarProps,
  type DateValue,
  type RangeCalendarProps,
} from "react-aria-components";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button, buttonProps } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
type Options = {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  captionLayout?: "label" | "dropdown";
  numberOfMonths?: number;
  showWeekNumber?: boolean;
  headerFormat?: Intl.DateTimeFormatOptions;
  renderCell?: (
    props: CalendarCellRenderProps & { defaultChildren: React.ReactNode },
  ) => React.ReactNode;
};
type Styled<P> = Omit<P, "className"> & {
  className?: never;
  xstyle?: stylex.StyleXStyles;
};
export function Calendar<
  T extends DateValue,
  M extends "single" | "multiple" = "single",
>({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<Omit<CalendarProps<T, M>, "visibleDuration">> & Options) {
  const applied = stylex.props(styles.calendar, xstyle);
  return (
    <AriaCalendar
      {...props}
      data-slot="calendar"
      visibleDuration={{ months: props.numberOfMonths || 1 }}
      className={applied.className}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    >
      <CalendarInner {...props} />
    </AriaCalendar>
  );
}
export function RangeCalendar<T extends DateValue>({
  className: _,
  xstyle,
  style,
  ...props
}: Styled<RangeCalendarProps<T>> & Options) {
  const applied = stylex.props(styles.calendar, xstyle);
  return (
    <AriaRangeCalendar
      {...props}
      data-slot="calendar"
      visibleDuration={{ months: props.numberOfMonths || 1 }}
      className={applied.className}
      style={composeRenderProps(style, (value) => ({
        ...applied.style,
        ...value,
      }))}
    >
      <CalendarInner {...props} isRange />
    </AriaRangeCalendar>
  );
}
function CalendarInner({
  captionLayout = "label",
  buttonVariant = "ghost",
  numberOfMonths = 1,
  showWeekNumber = false,
  headerFormat,
  renderCell,
  isRange,
}: Options & { isRange?: boolean }) {
  return (
    <div {...elementStyle(styles.months)}>
      <header {...elementStyle(styles.navigation)}>
        <Button
          variant={buttonVariant}
          slot="previous"
          xstyle={styles.navigationButton}
        >
          <ChevronLeftIcon {...elementStyle(styles.navigationIcon)} />
        </Button>
        <Button
          variant={buttonVariant}
          slot="next"
          xstyle={styles.navigationButton}
        >
          <ChevronRightIcon {...elementStyle(styles.navigationIcon)} />
        </Button>
      </header>
      {Array.from({ length: numberOfMonths }, (_, i) => (
        <div key={i} {...elementStyle(styles.month)}>
          <div {...elementStyle(styles.caption)}>
            {captionLayout === "dropdown" ? (
              <>
                <MonthDropdown format={headerFormat} />
                <YearDropdown format={headerFormat} />
              </>
            ) : (
              <CalendarHeading
                offset={{ months: i }}
                format={headerFormat}
                {...elementStyle(styles.heading)}
              />
            )}
          </div>
          <CalendarGrid offset={{ months: i }} {...elementStyle(styles.grid)}>
            <CalendarGridHeader>
              {(day) => (
                <CalendarHeaderCell {...elementStyle(styles.headerCell)}>
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={(props) =>
                    [
                      "ariax-calendar-cell",
                      showWeekNumber
                        ? "ariax-calendar-week-numbers"
                        : "ariax-calendar-no-week-numbers",
                      stylex.props(
                        styles.cell,
                        showWeekNumber
                          ? styles.weekNumbers
                          : styles.noWeekNumbers,
                        props.isToday && styles.today,
                        props.isSelectionStart && styles.selectionStart,
                        props.isSelectionEnd && styles.selectionEnd,
                        props.isToday &&
                          props.isSelected &&
                          styles.selectedToday,
                        props.isUnavailable && styles.unavailable,
                        props.isDisabled && styles.disabled,
                        props.isOutsideMonth && styles.outsideMonth,
                      ).className,
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  {(props) => (
                    <div
                      data-selected-single={props.isSelected && !isRange}
                      data-range-start={props.isSelectionStart && isRange}
                      data-range-end={props.isSelectionEnd && isRange}
                      data-range-middle={
                        props.isSelected &&
                        !props.isSelectionStart &&
                        !props.isSelectionEnd &&
                        isRange
                      }
                      {...buttonProps({
                        variant: "ghost",
                        size: "icon",
                        xstyle: styles.day,
                      })}
                      className={[
                        "ariax-calendar-day",
                        buttonProps({
                          variant: "ghost",
                          size: "icon",
                          xstyle: styles.day,
                        }).className,
                      ].join(" ")}
                    >
                      {renderCell ? renderCell(props) : props.defaultChildren}
                    </div>
                  )}
                </CalendarCell>
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </div>
      ))}
    </div>
  );
}
function MonthDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
  return (
    <CalendarMonthPicker format={format?.month}>
      {(props) => (
        <Select {...props} xstyle={styles.picker}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent xstyle={styles.pickerContent}>
            <SelectGroup>
              {props.items.map((item) => (
                <SelectItem key={item.id} id={item.id}>
                  {item.formatted}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </CalendarMonthPicker>
  );
}
function YearDropdown({ format }: { format?: Intl.DateTimeFormatOptions }) {
  return (
    <CalendarYearPicker format={format}>
      {(props) => (
        <Select {...props} xstyle={styles.picker}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent xstyle={styles.pickerContent}>
            {props.items.map((item) => (
              <SelectItem key={item.id} id={item.id}>
                {item.formatted}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </CalendarYearPicker>
  );
}
function elementStyle(value: stylex.StyleXStyles) {
  const { className, style } = stylex.props(value);
  return { className, style };
}
const selected =
  ':is([data-selected-single="true"],[data-range-start="true"],[data-range-end="true"])';
const endpoint = ':is([data-range-start="true"],[data-range-end="true"])';
const middle = ':is([data-range-middle="true"])';
const focused = ':is(.ariax-calendar-cell[data-focused="true"] > *)';
const styles = stylex.create({
  calendar: {
    width: "fit-content",
    padding: "calc(var(--ariax-spacing, .25rem) * 2)",
    "--cell-radius": "calc(var(--radius) * .8)",
    "--cell-size": "calc(var(--ariax-spacing, .25rem) * 7)",
    backgroundColor: {
      default: "var(--background)",
      ':is([data-slot="card-content"] *)': "transparent",
      ':is([data-slot="popover-content"] *)': "transparent",
    },
  },
  months: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "column", "@media (min-width: 48rem)": "row" },
    gap: "calc(var(--ariax-spacing, .25rem) * 4)",
  },
  navigation: {
    position: "absolute",
    insetInline: 0,
    top: 0,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
  },
  navigationButton: {
    width: "var(--cell-size)",
    height: "var(--cell-size)",
    padding: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    userSelect: "none",
    opacity: {
      default: null,
      ":disabled": 0.5,
      ':is([aria-disabled="true"])': 0.5,
    },
  },
  navigationIcon: {
    width: "calc(var(--ariax-spacing, .25rem) * 4)",
    height: "calc(var(--ariax-spacing, .25rem) * 4)",
    rotate: { default: null, ":is(:dir(rtl))": "180deg" },
  },
  month: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: "calc(var(--ariax-spacing, .25rem) * 4)",
  },
  caption: {
    display: "flex",
    height: "var(--cell-size)",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    paddingInline: "var(--cell-size)",
  },
  heading: {
    fontSize: ".875rem",
    lineHeight: "calc(1.25 / .875)",
    fontWeight: 500,
    userSelect: "none",
  },
  grid: { width: "100%", borderCollapse: "collapse" },
  headerCell: {
    borderRadius: "var(--cell-radius)",
    fontSize: ".8rem",
    fontWeight: 400,
    color: "var(--muted-foreground)",
    userSelect: "none",
  },
  picker: { position: "relative" },
  pickerContent: { minWidth: 0 },
  cell: {
    position: "relative",
    marginTop: "calc(var(--ariax-spacing, .25rem) * 2)",
    aspectRatio: "1 / 1",
    height: "100%",
    width: "100%",
    cursor: "default",
    borderRadius: "var(--cell-radius)",
    padding: 0,
    textAlign: "center",
    userSelect: "none",
  },
  weekNumbers: {},
  noWeekNumbers: {},
  today: {
    backgroundColor: "var(--muted)",
    color: "var(--foreground)",
    borderRadius: {
      default: "var(--cell-radius)",
      ':is([data-selected="true"])': 0,
    },
  },
  selectedToday: {
    borderStartStartRadius: 0,
    borderEndStartRadius: 0,
    borderStartEndRadius: 0,
    borderEndEndRadius: 0,
  },
  selectionStart: {
    content: { default: null, "::after": '""' },
    insetBlock: { default: null, "::after": 0 },
    insetInlineEnd: { default: null, "::after": 0 },
    width: {
      default: "100%",
      "::after": "calc(var(--ariax-spacing, .25rem) * 4)",
    },
    position: { default: "relative", "::after": "absolute" },
    isolation: "isolate",
    zIndex: 0,
    borderStartStartRadius: "var(--cell-radius)",
    borderEndStartRadius: "var(--cell-radius)",
    backgroundColor: { default: "var(--muted)", "::after": "var(--muted)" },
  },
  selectionEnd: {
    content: { default: null, "::after": '""' },
    insetBlock: { default: null, "::after": 0 },
    insetInlineStart: { default: null, "::after": 0 },
    width: {
      default: "100%",
      "::after": "calc(var(--ariax-spacing, .25rem) * 4)",
    },
    position: { default: "relative", "::after": "absolute" },
    isolation: "isolate",
    zIndex: 0,
    borderStartEndRadius: "var(--cell-radius)",
    borderEndEndRadius: "var(--cell-radius)",
    backgroundColor: { default: "var(--muted)", "::after": "var(--muted)" },
  },
  unavailable: { color: "var(--muted-foreground)", opacity: 0.5 },
  disabled: { color: "var(--muted-foreground)", opacity: 0.5 },
  outsideMonth: {
    color: {
      default: "var(--muted-foreground)",
      ':is([aria-selected="true"])': "var(--muted-foreground)",
    },
  },
  day: {
    position: "relative",
    isolation: "isolate",
    zIndex: 10,
    display: "flex",
    aspectRatio: "1 / 1",
    height: "100%",
    width: "100%",
    minWidth: "var(--cell-size)",
    flexDirection: "column",
    gap: "calc(var(--ariax-spacing, .25rem) * 1)",
    borderWidth: 0,
    lineHeight: 1,
    fontWeight: 400,
    borderStartStartRadius:
      "var(--ariax-day-start-start,var(--ariax-day-radius,var(--radius)))",
    borderEndStartRadius:
      "var(--ariax-day-end-start,var(--ariax-day-radius,var(--radius)))",
    borderStartEndRadius:
      "var(--ariax-day-start-end,var(--ariax-day-radius,var(--radius)))",
    borderEndEndRadius:
      "var(--ariax-day-end-end,var(--ariax-day-radius,var(--radius)))",
    "--ariax-day-radius": {
      default: null,
      [middle]: "0px",
      [endpoint]: "var(--cell-radius)",
    },
    backgroundColor: {
      default: null,
      ':hover:not([data-selected-single="true"],[data-range-start="true"],[data-range-end="true"])':
        { default: null, "@media (hover: hover)": "var(--muted)" },
      ":is(.dark *):hover": {
        default: null,
        "@media (hover: hover)":
          "color-mix(in oklab,var(--muted) 50%,transparent)",
      },
      ':is(.dark *):hover:not([data-selected-single="true"],[data-range-start="true"],[data-range-end="true"])':
        {
          default: null,
          "@media (hover: hover)":
            "color-mix(in oklab,var(--muted) 50%,transparent)",
        },
      [selected]: "var(--primary)",
      [middle]: "var(--muted)",
    },
    color: {
      default: "inherit",
      ':hover:not([data-selected-single="true"],[data-range-start="true"],[data-range-end="true"])':
        { default: null, "@media (hover: hover)": "var(--foreground)" },
      [selected]: "var(--primary-foreground)",
      [middle]: "var(--foreground)",
      ":is(.dark *):hover": {
        default: null,
        "@media (hover: hover)": "var(--foreground)",
      },
    },
    borderColor: { default: "transparent", [focused]: "var(--ring)" },
    boxShadow: {
      default: null,
      [focused]:
        "0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 0 #0000, 0 0 0 3px color-mix(in oklab,var(--ring) 50%,transparent), 0 0 0 0 #0000",
    },
  },
});
