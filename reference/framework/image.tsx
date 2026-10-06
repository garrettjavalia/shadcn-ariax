import type {ComponentProps} from 'react';

type ImageProps = ComponentProps<'img'> & {fill?:boolean};

// Official examples use string sources, intrinsic dimensions, and fill layouts.
export default function Image({fill,style,...props}:ImageProps) {
  return <img {...props} style={fill ? {position:'absolute',inset:0,width:'100%',height:'100%',...style} : style}/>;
}
