import { useLayoutEffect, type ReactNode } from "react";
import type { Decorator } from "@storybook/react-vite";

function StateReadiness({
  check,
  children,
}: {
  check: () => boolean;
  children: ReactNode;
}) {
  useLayoutEffect(() => {
    const scope = window as Window & { parityReady?: Promise<void> };
    let resolve!: () => void;
    const promise = new Promise<void>((done) => {
      resolve = done;
    });
    // Publish only committed work; discarded renders must not leave a signal.
    scope.parityReady = promise;
    // Scroll offsets, ResizeObserver layout and font metrics can change without
    // a DOM mutation. Observe the actual completion predicate on animation
    // frames so those states cannot leave the readiness promise pending.
    let frame = 0;
    function checkState() {
      if (check()) resolve();
      else frame = requestAnimationFrame(checkState);
    }
    checkState();
    return () => {
      cancelAnimationFrame(frame);
      resolve();
      if (scope.parityReady === promise) delete scope.parityReady;
    };
  }, [check]);
  return <>{children}</>;
}

// Declare a public completion state once; the generated original inherits it.
export function awaitStoryState(check: () => boolean): Decorator {
  return (Story) => (
    <StateReadiness check={check}>
      <Story />
    </StateReadiness>
  );
}
