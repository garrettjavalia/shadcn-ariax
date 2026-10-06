import { Spinner } from '@spinner';
<Spinner style={{ width: 24 }} aria-label="Saving" strokeWidth={3} />;
// @ts-expect-error external Tailwind classes are not supported
<Spinner className="size-8" />;
