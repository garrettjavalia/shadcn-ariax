"use client";
import { useCallback, type Ref } from "react";

// React Aria dismisses on click. A blank backdrop mousedown can blur the
// collection before that click and cause its focus scope to select item one.
export function useCollectionPopoverRef(forwarded?: Ref<HTMLElement>) {
  return useCallback(
    (popover: HTMLElement | null) => {
      const cleanup =
        typeof forwarded === "function" ? forwarded(popover) : undefined;
      if (forwarded && typeof forwarded !== "function")
        forwarded.current = popover;
      if (!popover) return;
      const doc = popover.ownerDocument;
      function keepCollectionFocus(event: PointerEvent) {
        const focus = doc.activeElement;
        if (
          event.pointerType !== "mouse" ||
          event.button !== 0 ||
          !focus?.matches('[role="menu"], [role="listbox"]') ||
          !popover?.contains(focus) ||
          event.composedPath().includes(popover)
        )
          return;
        const target = event.target;
        if (
          target === doc.body ||
          target === doc.documentElement ||
          (target instanceof Element && target.closest("[inert]"))
        ) {
          event.preventDefault();
        }
      }
      doc.addEventListener("pointerdown", keepCollectionFocus, true);
      return () => {
        doc.removeEventListener("pointerdown", keepCollectionFocus, true);
        if (typeof cleanup === "function") cleanup();
        else if (typeof forwarded === "function") forwarded(null);
        else if (forwarded) forwarded.current = null;
      };
    },
    [forwarded],
  );
}
