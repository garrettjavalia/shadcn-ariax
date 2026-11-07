const classes={
  "layout": "relative flex flex-col gap-4",
  "card": "mx-auto h-140 w-full max-w-sm gap-0",
  "header": "gap-1 border-b",
  "content": "flex-1 overflow-hidden p-0",
  "messages": "p-(--card-spacing)",
  "lines": "space-y-2",
  "text": "whitespace-pre-wrap",
  "caption": "mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground",
  "menu": "w-64",
  "clamp": "line-clamp-1 min-w-0",
  "frame": "relative mx-auto w-full max-w-sm",
  "fullCard": "h-140 w-full gap-0",
  "navigation": "absolute top-1/2 -right-12 -translate-y-1/2",
  "plainCaption": "mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground",
  "navButton": "flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  "marker": "h-0.5 w-4 rounded-full bg-muted-foreground/40 data-[current=true]:bg-foreground",
  "popover": "flex w-64 flex-col gap-1 rounded-2xl p-1",
  "jump": "flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-current:bg-accent aria-current:text-accent-foreground",
  "footer": "flex flex-col items-center gap-2 border-t",
  "full": "w-full",
  "hint": "text-xs text-muted-foreground",
  "positionFooter": "flex items-center justify-center border-t",
  "groupContent": "min-h-0 flex-1 p-0"
};
export const scrollerStyle=(name:keyof typeof classes)=>({className:classes[name]});
export const scrollerProps=scrollerStyle;
