import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from '@breadcrumb';
import { Button } from '@button';
import { breadcrumbList, breadcrumbSeparator, breadcrumbLink, breadcrumbSize } from '@breadcrumb-customizations';
import { BreadcrumbDemo } from './breadcrumb-examples/demo';
import { BreadcrumbBasic } from './breadcrumb-examples/basic';
import { BreadcrumbSeparatorDemo } from './breadcrumb-examples/separator';
import { BreadcrumbDropdown } from './breadcrumb-examples/dropdown';
import { BreadcrumbEllipsisDemo } from './breadcrumb-examples/ellipsis';
import { BreadcrumbLinkDemo } from './breadcrumb-examples/link';
import { BreadcrumbRtl } from './breadcrumb-examples/rtl';
import * as Registry from './breadcrumb-examples/registry';
const meta = { title: 'Components/Breadcrumb', component: Breadcrumb, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = { render: () => <BreadcrumbDemo /> };
export const Basic: Story = { render: () => <BreadcrumbBasic /> };
export const Separator: Story = { render: () => <BreadcrumbSeparatorDemo /> };
export const Dropdown: Story = { render: () => <BreadcrumbDropdown /> };
export const Ellipsis: Story = { render: () => <BreadcrumbEllipsisDemo /> };
export const Link: Story = { render: () => <BreadcrumbLinkDemo /> };
export const Rtl: Story = { render: () => <BreadcrumbRtl /> };
export const RegistryBasic: Story = { render: () => <Registry.BreadcrumbBasic /> };
export const RegistryDropdown: Story = { render: () => <Registry.BreadcrumbWithDropdown /> };
export const RegistryLink: Story = { render: () => <Registry.BreadcrumbWithLink /> };
export const Usage: Story = { render: () => <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb> };
function CollectionExample() {
  const [items, setItems] = useState([{ id:'home', label:'Home' }, { id:'components', label:'Components' }]);
  return <><Button onPress={()=>setItems([...items,{id:'current',label:'Current'}])} isDisabled={items.length===3}>Append</Button><Breadcrumb><BreadcrumbList items={items}>{item=><BreadcrumbItem id={item.id}>{({isCurrent})=><BreadcrumbLink href={'#'+item.id} style={({isFocused})=>({fontWeight:isCurrent?600:400,opacity:isFocused?.75:1})}>{item.label}</BreadcrumbLink>}</BreadcrumbItem>}</BreadcrumbList></Breadcrumb></>;
}
export const Collection: Story = { render: () => <CollectionExample /> };
function Customized() {
  const [size,setSize] = useState(20);
  return <><Button onPress={()=>setSize(24)}>Resize</Button><Breadcrumb><BreadcrumbList {...breadcrumbList}><BreadcrumbItem {...breadcrumbSeparator}><BreadcrumbLink href="#custom" {...breadcrumbLink} style={({isHovered})=>({textDecoration:isHovered?'underline':'none'})}>Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbItem {...breadcrumbSize(size)} style={{fontSize:size+2}}><BreadcrumbPage>Custom</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb></>;
}
export const Customization: Story = { render: () => <Customized /> };
