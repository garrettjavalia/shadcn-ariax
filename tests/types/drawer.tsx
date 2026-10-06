import{DrawerTrigger,DrawerContent,DrawerHeader}from'@drawer';
// @ts-expect-error External classes are not part of the deployment API.
const trigger=<DrawerTrigger className="external"/>;
// @ts-expect-error External classes are not part of the deployment API.
const content=<DrawerContent className="external"/>;
// @ts-expect-error External classes are not part of the deployment API.
const header=<DrawerHeader className="external"/>;
void[trigger,content,header];
