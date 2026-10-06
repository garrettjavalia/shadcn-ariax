import type { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react';
import { LinkButton } from './button';
type Custom<P> = Omit<P, 'className'> & { className?: never; xstyle?: stylex.StyleXStyles };
export type PaginationProps = Custom<ComponentProps<'nav'>>;
export type PaginationContentProps = Custom<ComponentProps<'ul'>>;
export type PaginationItemProps = Custom<ComponentProps<'li'>>;
export type PaginationLinkProps = Omit<ComponentProps<typeof LinkButton>, 'variant'> & { isActive?: boolean };
export type PaginationPreviousProps = PaginationLinkProps & { text?: string };
export type PaginationNextProps = PaginationPreviousProps;
export type PaginationEllipsisProps = Custom<ComponentProps<'span'>>;
export function Pagination({ className: _, xstyle, style, ...props }: PaginationProps) {
  const sx=stylex.props(styles.root,xstyle);
  return <nav role="navigation" aria-label="pagination" data-slot="pagination" {...props} className={sx.className} style={{...sx.style,...style}} />;
}
export function PaginationContent({ className: _, xstyle, style, ...props }: PaginationContentProps) {
  const sx=stylex.props(styles.content,xstyle);
  return <ul data-slot="pagination-content" {...props} className={sx.className} style={{...sx.style,...style}} />;
}
export function PaginationItem({ className: _, xstyle, style, ...props }: PaginationItemProps) {
  const sx=stylex.props(xstyle);
  return <li data-slot="pagination-item" {...props} className={sx.className} style={{...sx.style,...style}} />;
}
export function PaginationLink({ className: _, isActive, size='icon', ...props }: PaginationLinkProps) {
  return <LinkButton variant={isActive?'outline':'ghost'} size={size} aria-current={isActive?'page':undefined} data-slot="pagination-link" data-active={isActive} {...props} />;
}
export function PaginationPrevious({ className: _, text='Previous', xstyle, ...props }: PaginationPreviousProps) {
  return <PaginationLink aria-label="Go to previous page" size="default" {...props} xstyle={[styles.previous,xstyle]}><ChevronLeftIcon data-icon="inline-start" className={stylex.props(styles.flip).className}/><span className={stylex.props(styles.text).className}>{text}</span></PaginationLink>;
}
export function PaginationNext({ className: _, text='Next', xstyle, ...props }: PaginationNextProps) {
  return <PaginationLink aria-label="Go to next page" size="default" {...props} xstyle={[styles.next,xstyle]}><span className={stylex.props(styles.text).className}>{text}</span><ChevronRightIcon data-icon="inline-end" className={stylex.props(styles.flip).className}/></PaginationLink>;
}
export function PaginationEllipsis({ className: _, xstyle, style, ...props }: PaginationEllipsisProps) {
  const sx=stylex.props(styles.ellipsis,xstyle);
  return <span aria-hidden data-slot="pagination-ellipsis" {...props} className={sx.className} style={{...sx.style,...style}}><MoreHorizontalIcon className={stylex.props(styles.icon).className}/><span className={stylex.props(styles.srOnly).className}>More pages</span></span>;
}
const styles=stylex.create({
  root:{marginInline:'auto',display:'flex',width:'100%',justifyContent:'center'},
  content:{display:'flex',alignItems:'center',gap:'calc(var(--ariax-spacing, .25rem) * 0.5)'},
  previous:{paddingInlineStart:{default:'calc(var(--ariax-spacing, .25rem) * 1.5)',':has([data-icon="inline-start"])':'calc(var(--ariax-spacing, .25rem) * 1.5)'}},
  next:{paddingInlineEnd:{default:'calc(var(--ariax-spacing, .25rem) * 1.5)',':has([data-icon="inline-end"])':'calc(var(--ariax-spacing, .25rem) * 1.5)'}},
  text:{display:{default:'none','@media (min-width: 40rem)':'block'}},
  flip:{rotate:{default:null,':where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)':'180deg'}},
  ellipsis:{display:'flex',width:'calc(var(--ariax-spacing, .25rem) * 8)',height:'calc(var(--ariax-spacing, .25rem) * 8)',alignItems:'center',justifyContent:'center'},
  icon:{width:'calc(var(--ariax-spacing, .25rem) * 4)',height:'calc(var(--ariax-spacing, .25rem) * 4)'},
  srOnly:{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clipPath:'inset(50%)',whiteSpace:'nowrap',borderWidth:0},
});
