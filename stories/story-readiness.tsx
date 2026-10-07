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
    const observer = new MutationObserver(checkState);
    function checkState() {
      if (check()) {
        observer.disconnect();
        resolve();
      }
    }
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
    checkState();
    return () => {
      observer.disconnect();
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
