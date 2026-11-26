// A tap can enter this document from another frame before Chromium moves
// focus. Activate the trigger before React Aria handles the compatibility
// mousedown, so it preserves element focus rather than restoring frame focus.
export function focusSelectOnFrameEntry(event: PointerEvent) {
  if (
    event.pointerType !== "touch" ||
    (document.hasFocus() && !(document.activeElement instanceof HTMLIFrameElement))
  ) return;
  if (!(event.target instanceof Element)) return;
  event.target.closest<HTMLButtonElement>('button[data-slot="select-trigger"]')
    ?.focus({ preventScroll: true });
}
