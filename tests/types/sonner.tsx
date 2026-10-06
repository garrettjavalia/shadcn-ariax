import {Toaster} from '../../registry/ariax/ui/sonner';
// @ts-expect-error No external classes.
const root=<Toaster className="external"/>;
// @ts-expect-error No nested external classes.
const nested=<Toaster toastOptions={{classNames:{toast:'external'}}}/>;
void[root,nested];
