import {Command,CommandInput,CommandList,CommandItem} from '@command';
<Command filter={(value,input)=>value.startsWith(input)}><CommandInput style={({isFocused})=>({opacity:isFocused?1:.5})}/><CommandList items={[{id:'one',name:'One'}]}>{item=><CommandItem id={item.id}>{item.name}</CommandItem>}</CommandList></Command>;
// @ts-expect-error external className is unsupported
<Command className="w-full"/>;
