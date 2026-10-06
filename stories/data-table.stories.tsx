import {I18nProvider} from 'react-aria-components';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {DataTableDemo} from './data-table-examples/demo';
import {DataTableRtl} from './data-table-examples/rtl';
const meta={title:'Components/DataTable',id:'components-data-table',tags:['parity','viewport-390'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta;
export default meta;
type Story=StoryObj<typeof meta>;
export const Demo:Story={render:()=> <DataTableDemo/>};
export const Rtl:Story={render:()=> <I18nProvider locale="ar"><div dir="rtl"><DataTableRtl/></div></I18nProvider>};

export const SmallPages:Story={render:()=> <DataTableDemo pageSize={2}/>};
