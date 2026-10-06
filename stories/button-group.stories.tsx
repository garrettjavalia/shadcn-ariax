import * as registryExamples from './button-group-examples/registry';
import {ButtonGroupRtl as RtlExample} from './button-group-examples/rtl';
import PopoverExample from './button-group-examples/popover';
import SelectExample from './button-group-examples/select';
import DropdownExample from './button-group-examples/dropdown';
import InInputGroupExample from './button-group-examples/input-group';
import InInputExample from './button-group-examples/input';
import SplitExample from './button-group-examples/split';
import SeparatorExample from './button-group-examples/separator';
import {ButtonGroupNested as NestedExample} from './button-group-examples/nested';
import SizeExample from './button-group-examples/size';
import OrientationExample from './button-group-examples/orientation';
import DemoExample from './button-group-examples/demo';
import {useState,type CSSProperties} from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {ButtonGroup,ButtonGroupText,ButtonGroupSeparator,buttonGroupProps} from '@button-group';
import {Button,buttonProps} from '@button';
import {Input} from '@input';
import {InputGroup,InputGroupAddon,InputGroupButton,InputGroupInput} from '@input-group';
import {Tooltip,TooltipTrigger} from '@tooltip';
import {Focusable,ButtonContext,SeparatorContext} from 'react-aria-components';
import {PlusIcon,MinusIcon,FlipHorizontalIcon,FlipVerticalIcon,RotateCwIcon,SearchIcon,AudioLinesIcon,HeartIcon,ArrowLeftIcon,ArrowRightIcon,CopyIcon,ShareIcon,TrashIcon} from 'lucide-react';
import {IconPlus} from '@tabler/icons-react';
import {voice,dynamic} from '@button-group-customizations';
const meta={title:'Components/ButtonGroup',component:ButtonGroup,tags:['parity'],decorators:[Story=><main id="parity-root" style={{display:'grid',gap:16,width:'100%',maxWidth:620}}><Story/></main>]} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Usage:Story={render:()=> <ButtonGroup aria-label="Button group"><Button>Button 1</Button><Button>Button 2</Button></ButtonGroup>};
export const Orientation:Story={render:()=> <OrientationExample/>};
export const Size:Story={render:()=> <SizeExample/>};
export const Nested:Story={render:()=> <NestedExample/>};
export const Separator:Story={render:()=> <SeparatorExample/>};
export const Split:Story={render:()=> <SplitExample/>};
export const InInput:Story={render:()=> <InInputExample/>};
function VoiceGroup(){const[enabled,setEnabled]=useState(false);return <ButtonGroup style={{'--radius':'9999rem'} as CSSProperties}><ButtonGroup><Button variant="outline" size="icon"><PlusIcon/></Button></ButtonGroup><ButtonGroup><InputGroup><InputGroupInput placeholder={enabled?'Record and send audio...':'Send a message...'} disabled={enabled}/><InputGroupAddon align="inline-end"><TooltipTrigger><InputGroupButton onClick={()=>setEnabled(!enabled)} size="icon-xs" data-active={enabled} {...voice} aria-label="Voice Mode" aria-pressed={enabled}><AudioLinesIcon/></InputGroupButton><Tooltip data-parity-portal>Voice Mode</Tooltip></TooltipTrigger></InputGroupAddon></InputGroup></ButtonGroup></ButtonGroup>}
export const InInputGroup:Story={render:()=> <InInputGroupExample/>};
export const Text:Story={render:()=> <registryExamples.ButtonGroupWithText/>};
export const Variants:Story={render:()=> <>{(['default','outline','secondary','ghost','destructive','link'] as const).map(variant=><ButtonGroup key={variant} aria-label={variant}><Button variant={variant}>First</Button><ButtonGroupSeparator/><Button variant={variant}>Second</Button><Button variant={variant} isDisabled>Disabled</Button></ButtonGroup>)}</>};
export const Edges:Story={render:()=> <><ButtonGroup orientation={null}><Button variant="outline">No orientation</Button><Button variant="outline">Second</Button></ButtonGroup><ButtonGroup data-slot="custom-group" data-orientation="vertical"><Button variant="outline">DOM override</Button><Button variant="outline">Horizontal styles</Button></ButtonGroup><ButtonGroup orientation="vertical"><Button variant="secondary">First</Button><ButtonGroupSeparator orientation="horizontal"/><Button variant="secondary">Last</Button></ButtonGroup><ButtonGroup><ButtonGroupText data-slot="custom-text"><SearchIcon className="size-explicit" style={{width:22,height:22}}/></ButtonGroupText><span>No slot</span><Button variant="outline">Last slot</Button><span>Trailing span</span></ButtonGroup></>};
export const NestedVertical:Story={render:()=> <registryExamples.ButtonGroupVerticalNested/>};
export const Like:Story={render:()=> <registryExamples.ButtonGroupWithLike/>};
export const Pagination:Story={render:()=> <registryExamples.ButtonGroupPagination/>};
export const PaginationSplit:Story={render:()=> <registryExamples.ButtonGroupPaginationSplit/>};
export const Navigation:Story={render:()=> <registryExamples.ButtonGroupNavigation/>};
export const ShowcaseNested:Story={render:()=> <registryExamples.ButtonGroupNested/>};
function CustomizedGroup(){const[width,setWidth]=useState(260);return <><ButtonGroup {...dynamic(width)} style={{minWidth:280}} ref={node=>{if(node)node.dataset.ref='attached'}} onClick={()=>setWidth(320)} aria-label="Custom group"><Button variant="outline">Resize</Button><ButtonGroupText {...dynamic(70)} style={{width:80}}>Text</ButtonGroupText><ButtonGroupSeparator {...dynamic(10)} style={{width:12}}/></ButtonGroup><div role="group" data-slot="button-group" {...buttonGroupProps({orientation:'vertical',...dynamic(180),style:{minWidth:200}})}><Button variant="outline">Helper</Button><Button variant="outline">Second</Button></div></>}
export const Customized:Story={render:()=> <CustomizedGroup/>};
export const Basic:Story={render:()=> <registryExamples.ButtonGroupBasic/>};
export const WithInput:Story={render:()=> <registryExamples.ButtonGroupWithInput/>};
export const Icons:Story={render:()=> <registryExamples.ButtonGroupWithIcons/>};
export const ShowcaseInputGroup:Story={render:()=> <registryExamples.ButtonGroupWithInputGroup/>};

export const Context:Story={render:()=> <ButtonContext.Provider value={{isDisabled:true,style:({isDisabled})=>({opacity:isDisabled?0.4:1})}}><ButtonGroup><Button>Inherited disabled</Button><Button isDisabled={false}>Enabled override</Button><SeparatorContext.Provider value={{orientation:'horizontal'}}><ButtonGroupSeparator/><ButtonGroupSeparator orientation="horizontal" data-orientation="horizontal"/></SeparatorContext.Provider></ButtonGroup></ButtonContext.Provider>};
export const Typography:Story={render:()=> <ButtonGroup style={{fontSize:20}}><ButtonGroupText style={{fontSize:20}}>Large text</ButtonGroupText><Button variant="outline" style={{fontSize:20}}>Large button</Button></ButtonGroup>};

export const TextIcons:Story={render:()=> <ButtonGroup><ButtonGroupText><SearchIcon/>Text</ButtonGroupText><ButtonGroupText><SearchIcon className="size-explicit" style={{width:22,height:22}}/>Explicit</ButtonGroupText></ButtonGroup>};

export const Demo:Story={render:()=> <DemoExample/>};

export const Dropdown:Story={render:()=> <DropdownExample/>};

export const Select:Story={render:()=> <SelectExample/>};

export const Popover:Story={render:()=> <PopoverExample/>};

export const Rtl:Story={render:()=> <RtlExample/>};

export const RegistryDropdown:Story={render:()=> <registryExamples.ButtonGroupWithDropdown/>};

export const RegistrySelect:Story={render:()=> <registryExamples.ButtonGroupWithSelect/>};

export const Fields:Story={render:()=> <registryExamples.ButtonGroupWithFields/>};

export const SelectAndInput:Story={render:()=> <registryExamples.ButtonGroupWithSelectAndInput/>};

export const TextAlignment:Story={render:()=> <registryExamples.ButtonGroupTextAlignment/>};

export const RegistryVertical:Story={render:()=> <registryExamples.ButtonGroupVertical/>};
