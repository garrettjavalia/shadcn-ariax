// Contract: expose the styles finally applied by upstream Button/LinkButton.
// Raw cva class-string behavior (before cn resolves conflicts) is not an API target.
import { cn } from 'cn';
import { buttonVariants } from '../generated/reference/aria-nova/ui/button';
export { Button, LinkButton } from '../generated/reference/aria-nova/ui/button';
export function buttonProps(options: Parameters<typeof buttonVariants>[0]) {
  return { className: cn(buttonVariants(options)) };
}
