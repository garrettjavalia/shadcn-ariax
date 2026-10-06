import { useLayoutEffect, useState, type ReactNode } from "react";
import type { Decorator } from "@storybook/react-vite";

function StateReadiness({
  check,
  children,
}: {
  check: () => boolean;
  children: ReactNode;
}) {
  const [ready] = useState(() => {
    let resolve!: () => void;
    const promise = new Promise<void>((done) => {
      resolve = done;
    });
    return { promise, resolve };
  });
  const scope = window as Window & { parityReady?: Promise<void> };
  // Publish before the story mounts so browser readiness cannot miss the work.
  scope.parityReady = ready.promise;
  useLayoutEffect(() => {
    scope.parityReady = ready.promise;
    const observer = new MutationObserver(checkState);
    function checkState() {
      if (check()) {
        observer.disconnect();
        ready.resolve();
      }
    }
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
    });
    checkState();
    return () => {
      observer.disconnect();
      if (scope.parityReady === ready.promise) delete scope.parityReady;
    };
  }, [check, ready]);
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
