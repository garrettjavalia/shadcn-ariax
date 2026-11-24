/** Entry component for an example that publishes toast notifications. */
export const toastExampleApp = `import Example from "./example";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Example />
      <Toaster />
    </>
  );
}
`;
