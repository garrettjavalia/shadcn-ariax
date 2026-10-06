import {Dialog,DialogOverlay,DialogTrigger,DialogClose,DialogTitle} from '@dialog';
import * as stylex from '@stylexjs/stylex';
const styles=stylex.create({width:{width:320}});
<Dialog xstyle={styles.width} style={({isEntering})=>({opacity:isEntering?.5:1})}><DialogTitle>Title</DialogTitle><DialogClose>Close</DialogClose></Dialog>;
<DialogOverlay style={{opacity:.9}}>Text</DialogOverlay>;
<DialogTrigger defaultOpen><button>Open</button><Dialog>Content</Dialog></DialogTrigger>;
// @ts-expect-error external className is unsupported
<Dialog className="custom">Content</Dialog>;
