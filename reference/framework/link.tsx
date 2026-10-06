import type {ComponentProps} from 'react';

type LinkProps = ComponentProps<'a'> & {
  prefetch?:boolean|null;
  replace?:boolean;
  scroll?:boolean;
  shallow?:boolean;
  locale?:string|false;
  legacyBehavior?:boolean;
  passHref?:boolean;
};

// Routing is ordinary document navigation in the standalone example environment.
export default function Link({prefetch:_,replace:_replace,scroll:_scroll,shallow:_shallow,locale:_locale,legacyBehavior:_legacy,passHref:_pass,...props}:LinkProps) {
  return <a {...props}/>;
}
