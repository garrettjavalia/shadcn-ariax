import {strict as assert} from 'node:assert';
import {readFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {parse} from '@babel/parser';

type AstNode = Record<string,unknown>;
const node=(value:unknown):AstNode|undefined=>value!==null&&typeof value==='object'&&!Array.isArray(value)?value as AstNode:undefined;
function walk(value:unknown,visit:(value:AstNode)=>void):void {
 if(Array.isArray(value)){for(const child of value)walk(child,visit);return;}
 const current=node(value);if(!current)return;
 visit(current);for(const child of Object.values(current))walk(child,visit);
}
function inspect(source:string,uiModules:readonly string[]=[]){
 const ast=parse(source,{sourceType:'module',plugins:['typescript','jsx']});
 const bindings=new Map<string,{name:string;module:string}>();
 const namespaces=new Map<string,string>();
 const localFiles=new Set<string>();
 const proxyFiles=new Map<string,Set<string>>();
 const counts=new Map<string,number>();
 walk(ast,current=>{
  if(current.type!=='ImportDeclaration')return;
  const module=String(node(current.source)?.value??'');
  for(const entry of current.specifiers as unknown[]){const specifier=node(entry)!;const local=String(node(specifier.local)?.name??'');
   if(specifier.type==='ImportNamespaceSpecifier')namespaces.set(local,module);
   else bindings.set(local,{name:String(node(specifier.imported)?.name??local),module});
  }
 });
 const isUi=(module:string)=>uiModules.includes(module)||/\/ui(?:-rtl)?\//.test(module)||/^@[a-z][a-z0-9-]*$/.test(module)&&!module.endsWith('-customizations')&&!module.endsWith('-recipes');
 walk(ast,current=>{
  if(current.type!=='JSXOpeningElement')return;
  const name=node(current.name);if(!name)return;
  const binding=name.type==='JSXIdentifier'?bindings.get(String(name.name)):name.type==='JSXMemberExpression'?{name:String(node(name.property)?.name),module:namespaces.get(String(node(name.object)?.name))??''}:undefined;
  if(!binding)return;
  if(isUi(binding.module)){
   counts.set(binding.name,(counts.get(binding.name)??0)+1);
   if(uiModules.includes(binding.module)){const names=proxyFiles.get(binding.module)??new Set<string>();names.add(binding.name);proxyFiles.set(binding.module,names);}
  }
  else if(binding.module.startsWith('.'))localFiles.add(binding.module);
 });
 return {counts,localFiles,proxyFiles};
}

/** Compare actual UI JSX uses; original intrinsic HTML is deliberately excluded. */
export async function assertSourceComponents(sourcePath:string,fixturePath:string,aliases:Record<string,string>={},options:{fixtureUiModules?:readonly string[]}={}):Promise<void>{
 const original=inspect(await readFile(sourcePath,'utf8')).counts;
 const actual=new Map<string,number>();const visited=new Set<string>();
 const resolveLocal=async(path:string,dependency:string):Promise<string>=>{
  const target=resolve(dirname(path),dependency);
  for(const suffix of ['','.tsx','.ts','/index.tsx']){
   try{await readFile(target+suffix,'utf8');return target+suffix;}catch{continue;}
  }
  throw new Error(`Cannot resolve fixture JSX import ${dependency} in ${path}`);
 };
 const collect=async(path:string):Promise<void>=>{
  const absolute=resolve(path);if(visited.has(absolute))return;visited.add(absolute);
  const {counts,localFiles,proxyFiles}=inspect(await readFile(absolute,'utf8'),options.fixtureUiModules);
  for(const [name,count]of counts)actual.set(name,(actual.get(name)??0)+count);
  for(const dependency of localFiles)await collect(await resolveLocal(absolute,dependency));
  for(const [dependency,names]of proxyFiles){
   const proxy=await resolveLocal(absolute,dependency);
   const delegated=inspect(await readFile(proxy,'utf8')).counts;
   for(const name of names)assert.ok((delegated.get(name)??0)>0,`${proxy}: JSX proxy ${name} does not delegate to the actual UI component`);
  }
 };
 await collect(fixturePath);
 for(const [name,count]of original){const fixtureName=aliases[name]??name;assert.ok((actual.get(fixtureName)??0)>=count,`${fixturePath}: original ${name} has ${count} JSX uses, fixture ${fixtureName} has ${actual.get(fixtureName)??0}`);}
}
