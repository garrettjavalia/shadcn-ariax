'use client';
import type { ComponentProps, CSSProperties } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Cell, Column, Row, Table as Primitive, TableBody as Body, TableFooter as Footer, TableHeader as Header, type TableProps as RACProps, type TableBodyProps, type TableHeaderProps, type TableFooterProps, type RowProps, type CellProps, type ColumnProps } from 'react-aria-components';

type Styled<P> = Omit<P, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type TableProps = Styled<RACProps>;
const styles = stylex.create({
  container: { position: 'relative', width: '100%', overflowX: 'auto' },
  table: { width: '100%', captionSide: 'bottom', fontSize: '0.875rem', lineHeight: 'calc(1.25 / .875)' },
  header: { borderBottomWidth: 0, '--ariax-table-header-border': '1px' },
  body: { height: { default: null, ':is([data-empty])': '6rem' }, textAlign: { default: null, ':is([data-empty])': 'center' } },
  footer: { backgroundColor: 'color-mix(in oklab, var(--muted) 50%, transparent)', borderTopWidth: 1, fontWeight: 500 },
  row: {
    borderBottomWidth: 'var(--ariax-table-row-border, 1px)',
    backgroundColor: { default: null, ':hover:not([data-state="selected"])': { default: null, '@media (hover: hover)': 'color-mix(in oklab, var(--muted) 50%, transparent)' }, ':is([data-state="selected"], [data-selected="true"])': 'var(--muted)', ':has([aria-expanded="true"])': 'color-mix(in oklab, var(--muted) 50%, transparent)' },
    transitionProperty: 'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to', transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', transitionDuration: '150ms',
  },
  head: { color: 'var(--foreground)', height: '2.5rem', '--ariax-table-head-right': { default: '.5rem', ':has([role="checkbox"], [data-slot="checkbox"])': '0px' }, padding: '0 var(--ariax-table-head-right) 0 .5rem', textAlign: 'left', verticalAlign: 'middle', fontWeight: 500, whiteSpace: 'nowrap' },
  cell: { '--ariax-table-cell-right': { default: '.5rem', ':has([role="checkbox"], [data-slot="checkbox"])': '0px' }, padding: '.5rem var(--ariax-table-cell-right) .5rem .5rem', verticalAlign: 'middle', whiteSpace: 'nowrap' },
  caption: { color: 'var(--muted-foreground)', marginTop: '1rem', fontSize: '.875rem', lineHeight: 'calc(1.25 / .875)', textAlign: 'center' },
});
function applied(base: stylex.StyleXStyles, xstyle: stylex.StyleXStyles | undefined, style: CSSProperties | undefined, marker?: string) { const result = stylex.props(base, xstyle); return { className: marker ? `${marker} ${result.className ?? ''}` : result.className, style: { ...result.style, ...style } }; }
function renderStyle<State>(base: stylex.StyleXStyles, xstyle: stylex.StyleXStyles | undefined, style: CSSProperties | ((state: State) => CSSProperties | undefined) | undefined, marker?: string) {
  const result = stylex.props(base, xstyle);
  return { className: marker ? `${marker} ${result.className ?? ''}` : result.className, style: typeof style === 'function' ? (state: State) => ({ ...result.style, ...style(state) }) : { ...result.style, ...style } };
}
export function Table({ xstyle, className: _, style, ...props }: TableProps) { return <div data-slot="table-container" {...applied(styles.container, undefined, undefined)}><Primitive data-slot="table" {...props} {...renderStyle(styles.table, xstyle, style)} /></div>; }
export function TableHeader<T>({ xstyle, className: _, style, ...props }: Styled<TableHeaderProps<T>>) { return <Header data-slot="table-header" {...props} {...renderStyle(styles.header, xstyle, style, 'ariax-table-header')} />; }
export function TableBody<T>({ xstyle, className: _, style, ...props }: Styled<TableBodyProps<T>>) { return <Body data-slot="table-body" {...props} {...renderStyle(styles.body, xstyle, style, 'ariax-table-body')} />; }
export function TableFooter<T>({ xstyle, className: _, style, ...props }: Styled<TableFooterProps<T>>) { return <Footer data-slot="table-footer" {...props} {...applied(styles.footer, xstyle, style, 'ariax-table-footer')} />; }
export function TableRow<T>({ xstyle, className: _, style, ...props }: Styled<RowProps<T>>) { return <Row data-slot="table-row" {...props} {...renderStyle(styles.row, xstyle, style)} />; }
export function TableHead({ xstyle, className: _, style, ...props }: Styled<ColumnProps>) { return <Column data-slot="table-head" {...props} {...renderStyle(styles.head, xstyle, style)} />; }
export function TableCell({ xstyle, className: _, style, ...props }: Styled<CellProps>) { return <Cell data-slot="table-cell" {...props} {...renderStyle(styles.cell, xstyle, style)} />; }
export function TableCaption({ xstyle, className: _, style, ...props }: Styled<ComponentProps<'figcaption'>>) { return <figcaption data-slot="table-caption" {...props} {...applied(styles.caption, xstyle, style)} />; }
