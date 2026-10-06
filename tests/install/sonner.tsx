import * as stylex from '@stylexjs/stylex';
import {Toaster,type ToasterProps} from '@sonner';
import {toast} from 'sonner';
const s=stylex.create({opacity:{opacity:.9},width:(width:number)=>({width})});
const props:ToasterProps={theme:'dark',dir:'rtl',position:'top-center',richColors:true,closeButton:true,xstyle:s.opacity,style:{opacity:.95},toastOptions:{xstyle:s.width(320),style:{padding:20}}};
export default function InstalledSonner(){return <><button onClick={()=>toast.promise(Promise.resolve({name:'Event'}),{loading:'Loading',success:data=>data.name,error:'Error'})}>Toast</button><Toaster {...props}/></>;}
