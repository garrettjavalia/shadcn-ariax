import {Tabs,TabsList,TabsTrigger,TabsContent,tabsListVariants} from '@tabs';
// @ts-expect-error external className unsupported
<Tabs className="test"/>;
// @ts-expect-error external className unsupported
<TabsList className="test"/>;
// @ts-expect-error external className unsupported
<TabsTrigger className="test"/>;
// @ts-expect-error external className unsupported
<TabsContent className="test"/>;
// @ts-expect-error variant unsupported
<TabsList variant="invalid"/>;
<TabsList xstyle={tabsListVariants({variant:'line'})}/>;
