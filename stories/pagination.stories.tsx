import {useState} from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import { Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationPrevious,PaginationNext,PaginationEllipsis } from '@pagination';
import { Button } from '@button';
import {paginationGap,paginationColor,paginationSize} from '@pagination-customizations';
import PaginationDemo from './pagination-examples/demo';
import {PaginationSimple} from './pagination-examples/simple';
import {PaginationIconsOnly} from './pagination-examples/icons-only';
import {PaginationRtl} from './pagination-examples/rtl';
const meta={title:'Components/Pagination',component:Pagination,tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta<typeof Pagination>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Demo:Story={tags:['viewport-390'],render:()=> <PaginationDemo/>};
export const Simple:Story={render:()=> <PaginationSimple/>};
export const IconsOnly:Story={tags:['viewport-390'],render:()=> <PaginationIconsOnly/>};
export const Rtl:Story={tags:['viewport-390'],render:()=> <PaginationRtl/>};
export const Sizes:Story={render:()=> <>{(['xs','sm','default','lg','icon-xs','icon-sm','icon','icon-lg',null] as const).map(size=><Pagination key={String(size)}><PaginationContent><PaginationItem><PaginationPrevious href="#" size={size}/></PaginationItem><PaginationItem><PaginationLink href="#" size={size} isActive>2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#" size={size}/></PaginationItem></PaginationContent></Pagination>)}</>};
function ControlledExample(){const [page,setPage]=useState(2);return <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" isDisabled={page===1} onPress={()=>setPage(Math.max(1,page-1))}/></PaginationItem>{[1,2,3].map(value=><PaginationItem key={value}><PaginationLink href="#" isActive={page===value} onPress={()=>setPage(value)}>{value}</PaginationLink></PaginationItem>)}<PaginationItem><PaginationNext href="#" isDisabled={page===3} onPress={()=>setPage(Math.min(3,page+1))}/></PaginationItem><PaginationItem><PaginationEllipsis/></PaginationItem></PaginationContent></Pagination>;}
export const Controlled:Story={render:()=> <ControlledExample/>};
function Customized(){const[size,setSize]=useState(48);return <><Button onPress={()=>setSize(64)}>Resize</Button><Pagination><PaginationContent {...paginationGap}><PaginationItem {...paginationColor}><PaginationLink href="#" {...paginationSize(size)} style={({isHovered})=>({width:size+4,opacity:isHovered?.5:1})}>Custom</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#" text="Continue"/></PaginationItem></PaginationContent></Pagination></>;}
export const Customization:Story={render:()=> <Customized/>};
