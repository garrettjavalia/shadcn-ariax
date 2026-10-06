import {fieldCustomized,fieldLabelCustomized} from "@customizations";

import type {Meta,StoryObj} from '@storybook/react-vite';
import {Field,FieldSet,FieldLegend,FieldGroup,FieldContent,FieldLabel,FieldTitle,FieldDescription,FieldSeparator,FieldError} from '@field';
const meta={title:'Components/Field',tags:['parity'],decorators:[Story=><main id="parity-root"><Story/></main>]} satisfies Meta;
export default meta;
type Story=StoryObj<typeof meta>;
// Native controls below isolate Field layout and selectors, and do not claim official compound-example coverage.
export const Anatomy:Story={render:()=> <FieldSet><FieldLegend>Profile</FieldLegend><FieldDescription>This appears on invoices and emails.</FieldDescription><FieldGroup><Field><FieldLabel htmlFor="name">Full name</FieldLabel><input id="name" placeholder="Evil Rabbit"/><FieldDescription>We never share <a href="#privacy">your data</a>.</FieldDescription></Field><Field data-invalid="true"><FieldLabel htmlFor="username">Username</FieldLabel><input id="username" aria-invalid="true"/><FieldError>Choose another username.</FieldError></Field><FieldSeparator>Or continue with</FieldSeparator><Field><FieldTitle>Delivery</FieldTitle><FieldContent><FieldDescription>Grouped descriptions</FieldDescription><FieldDescription>Second description</FieldDescription><span>Final content</span></FieldContent></Field><FieldSeparator/><FieldSet><FieldLegend variant="label">Preferences</FieldLegend><FieldGroup><FieldGroup><FieldLabel>Nested group</FieldLabel></FieldGroup></FieldGroup></FieldSet></FieldGroup></FieldSet>};
export const Orientations:Story={tags:['viewport-390'],render:()=> <FieldGroup>{(['vertical','horizontal','responsive',null] as const).map(orientation=><Field key={String(orientation)} orientation={orientation}><FieldLabel htmlFor={String(orientation)}>{String(orientation)}</FieldLabel><input id={String(orientation)}/><FieldDescription>Description</FieldDescription></Field>)}{(['horizontal','responsive'] as const).map(orientation=><Field orientation={orientation} key={orientation}><button role="checkbox" aria-checked="false">check</button><FieldContent><FieldTitle>Notifications</FieldTitle><FieldDescription>Help text with a descendant radio <span role="radio" aria-checked="false">radio</span></FieldDescription></FieldContent></Field>)}</FieldGroup>};
export const States:Story={render:()=> <FieldGroup>{['true','false'].map(state=><Field key={state} data-disabled={state} data-invalid={state}><FieldLabel>Disabled {state}</FieldLabel><FieldTitle>Title {state}</FieldTitle><FieldDescription>Description</FieldDescription></Field>)}<FieldSet><FieldLegend>Checkbox group</FieldLegend><div data-slot="checkbox-group">Checkbox group fixture</div></FieldSet><FieldSet><div data-slot="radio-group">Radio group fixture</div></FieldSet><FieldGroup data-slot="checkbox-group"><span>First</span><span>Second</span></FieldGroup><Field data-horizontal=""><FieldContent><span data-horizontal=""/><FieldDescription>Legacy data-horizontal does not balance this description.</FieldDescription></FieldContent></Field><Field><FieldContent><span data-orientation="horizontal"/><FieldDescription>Balance long description text for a horizontal descendant.</FieldDescription></FieldContent></Field></FieldGroup>};
export const ChoiceSelectors:Story={render:()=> <FieldGroup>{['plain','checked','selected','disabled','selected-true','selected-false','checked-false','state-checked'].map(state=><FieldLabel key={state}><Field orientation="horizontal"><input type="checkbox" data-state={state==='state-checked'?'checked':undefined} data-checked={state==='checked'?'':state==='checked-false'?'false':undefined} data-selected={state==='selected'?'':state==='selected-true'?'true':state==='selected-false'?'false':undefined} disabled={state==='disabled'}/><FieldContent><FieldTitle>{state} choice</FieldTitle><FieldDescription>Description of the option.</FieldDescription></FieldContent></Field></FieldLabel>)}</FieldGroup>};
export const Errors:Story={render:()=> <FieldGroup><FieldError/><FieldError errors={[]}/><FieldError errors={[undefined]}/><FieldError errors={[{message:'Single'}]}/><FieldError errors={[{message:'First'},{message:'First'},{message:'Second'},undefined,{}]}/><FieldError errors={[{message:'Ignored'}]}>Explicit children win</FieldError><FieldError errors={[{},undefined]}/></FieldGroup>};
export const Rtl:Story={render:()=> <div dir="rtl"><FieldGroup><Field orientation="horizontal"><FieldLabel htmlFor="rtl-name">الاسم</FieldLabel><input id="rtl-name"/><FieldContent><FieldTitle>العنوان</FieldTitle><FieldDescription>وصف الحقل <a href="#rtl">رابط</a></FieldDescription><FieldError errors={[{message:'الأول'},{message:'الثاني'}]}/></FieldContent></Field><FieldSeparator>أو</FieldSeparator></FieldGroup></div>};
export const Inline:Story={render:()=> <FieldSet style={{gap:'2rem'}}><FieldLegend style={{fontSize:'1.25rem'}}>Inline styles</FieldLegend><FieldGroup style={{gap:'1.5rem'}}><Field style={{gap:'1rem',width:'80%'}}><FieldLabel style={{opacity:0.8,lineHeight:2}}>Label</FieldLabel><FieldContent style={{gap:'0.75rem'}}><FieldTitle style={{fontWeight:600}}>Title</FieldTitle><FieldDescription style={{color:'red'}}>Description</FieldDescription><FieldError style={{fontSize:'1rem'}}>Error</FieldError></FieldContent></Field><FieldSeparator style={{height:'2rem'}}>Separator</FieldSeparator></FieldGroup></FieldSet>};

export const Customized:Story={render:()=> <Field {...fieldCustomized}><FieldLabel {...fieldLabelCustomized}>Custom field</FieldLabel><input/><FieldDescription>Custom layout</FieldDescription></Field>};

import {FieldRadio} from './field-radio';import FieldChoiceCard from './field-choice-card';
export const Radio:Story={render:()=> <FieldRadio/>};export const RadioChoiceCard:Story={render:()=> <FieldChoiceCard/>};

import OfficialDemo from './field-examples/demo';
export const DocumentDemo:Story={render:()=> <OfficialDemo/>};

import OfficialInput from './field-examples/input';
export const DocumentInput:Story={render:()=> <OfficialInput/>};

import OfficialTextarea from './field-examples/textarea';
export const DocumentTextarea:Story={render:()=> <OfficialTextarea/>};

import OfficialSelect from './field-examples/select';
export const DocumentSelect:Story={render:()=> <OfficialSelect/>};

import OfficialSlider from './field-examples/slider';
export const DocumentSlider:Story={render:()=> <OfficialSlider/>};

import {FieldFieldset as OfficialFieldset} from './field-examples/fieldset';
export const DocumentFieldset:Story={render:()=> <OfficialFieldset/>};

import OfficialSwitch from './field-examples/switch';
export const DocumentSwitch:Story={render:()=> <OfficialSwitch/>};

import {FieldRtl as OfficialRtl} from './field-examples/rtl';
export const DocumentRtl:Story={render:()=> <OfficialRtl/>};

import {FieldResponsive as OfficialResponsive} from './field-examples/responsive';
export const DocumentResponsive:Story={tags:['viewport-390'],render:()=> <OfficialResponsive/>};

import * as RegistryFields from './field-examples/registry';
export const RegistryInputFields:Story={render:()=> <RegistryFields.InputFields/>};
export const RegistryTextareaFields:Story={render:()=> <RegistryFields.TextareaFields/>};
export const RegistrySelectFields:Story={render:()=> <RegistryFields.SelectFields/>};
export const RegistryNativeSelectFields:Story={render:()=> <RegistryFields.NativeSelectFields/>};
export const RegistryCheckboxFields:Story={render:()=> <RegistryFields.CheckboxFields/>};
export const RegistryRadioFields:Story={render:()=> <RegistryFields.RadioFields/>};
export const RegistrySwitchFields:Story={render:()=> <RegistryFields.SwitchFields/>};
export const RegistrySliderFields:Story={render:()=> <RegistryFields.SliderFields/>};
export const RegistryInputOTPFields:Story={render:()=> <RegistryFields.InputOTPFields/>};
export const RegistryHorizontalFields:Story={render:()=> <RegistryFields.HorizontalFields/>};
