import{defaultRadarProps}from'recharts/es6/polar/Radar';
import{defaultRadialBarProps}from'recharts/es6/polar/RadialBar';
import{defaultPieProps}from'recharts/es6/polar/Pie';
import{defaultLineProps}from'recharts/es6/cartesian/Line';
import{defaultAreaProps}from'recharts/es6/cartesian/Area';
import{defaultBarProps}from'recharts/es6/cartesian/Bar';
import{useEffect,type ReactNode}from'react';
import{AnimationManagerContext}from'recharts/es6/animation/useAnimationManager';
import{createAnimateManager}from'recharts/es6/animation/AnimationManager';
import{createDefaultAnimationManager}from'recharts/es6/animation/createDefaultAnimationManager';
import type{TimeoutController}from'recharts/types/animation/timeoutController';
const durations={area:defaultAreaProps.animationDuration,bar:defaultBarProps.animationDuration,line:defaultLineProps.animationDuration,pie:defaultPieProps.animationDuration,radial:defaultRadialBarProps.animationDuration,radar:defaultRadarProps.animationDuration};
const begins={area:defaultAreaProps.animationBegin,bar:defaultBarProps.animationBegin,line:defaultLineProps.animationBegin,pie:defaultPieProps.animationBegin,radial:defaultRadialBarProps.animationBegin,radar:defaultRadarProps.animationBegin};
type Clock={begins:typeof begins;durations:typeof durations;duration:number;time:number;pending:()=>number;advance:(time:number)=>void;completed:number};
declare global{interface Window{__enableChartClock?:boolean;__chartClock?:Clock;parityReady?:Promise<void>}}
function createClock(){let time=0;let sequence=0;const queue=new Map<number,{time:number;callback:(time:number)=>void}>();const controller:TimeoutController={setTimeout(callback,delay=0){const id=sequence++;queue.set(id,{time:time+Math.max(1000/60,delay),callback});return()=>{queue.delete(id)};}};const clock:Clock={begins,durations,duration:defaultBarProps.animationDuration,get time(){return time},pending:()=>queue.size,completed:0,advance(target){if(target<time)throw new Error('Chart clock must advance monotonically');for(let guard=0;guard<10000;guard++){const next=[...queue.entries()].sort((a,b)=>a[1].time-b[1].time||a[0]-b[0])[0];if(!next||next[1].time>target){time=target;return;}queue.delete(next[0]);time=next[1].time;next[1].callback(time);}throw new Error('Chart animation queue did not settle');}};return{clock,controller};}
const controlled=typeof window!=='undefined'&&window.__enableChartClock?createClock():undefined;
if(controlled)window.__chartClock=controlled.clock;
let pending=0;
let resolveReady:()=>void=()=>{};
if(typeof window!=='undefined'&&!controlled)window.parityReady=new Promise<void>(resolve=>{resolveReady=resolve;});
const factory=()=>{
 const base=controlled?.controller??createDefaultAnimationManager().getTimeoutController();
 let queued=0;
 let running=false;
 const controller:TimeoutController={setTimeout(callback,delay){
  let active=true;pending++;queued++;
  const cancel=base.setTimeout(time=>{
   if(!active)return;
   active=false;pending--;queued--;
   callback(time);
   if(running&&queued===0){running=false;if(controlled)controlled.clock.completed++;}
  },delay);
  return()=>{if(active){active=false;pending--;queued--;}cancel();};
 }};
 const manager=createAnimateManager(controller);
 const start=manager.start.bind(manager);
 const stop=manager.stop.bind(manager);
 manager.start=style=>{running=true;start(style);};
 manager.stop=()=>{running=false;stop();};
 return manager;
};
export function ChartAnimationControl({children}:{children:ReactNode}){
 useEffect(()=>{
  if(controlled)return;
  let cancelled=false;
  const observed=new Set<Element>();
  let resizeRevision=0;
  const observer=new ResizeObserver(()=>{resizeRevision++;});
  void(async()=>{
   await document.fonts.ready;
   const frame=()=>new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
   let previous='';
   let stable=0;
   while(!cancelled){
    await frame();
    const nodes=Array.from(document.querySelectorAll('#parity-root [data-slot="chart"], #parity-root .recharts-surface')).filter(node=>node.getClientRects().length>0);
    for(const node of nodes)if(!observed.has(node)){observed.add(node);observer.observe(node);}
    const resized=nodes.every(node=>!(node instanceof SVGElement)||Number(node.getAttribute('width'))>0&&Number(node.getAttribute('height'))>0);
    const geometry=JSON.stringify([resizeRevision,nodes.map(node=>{
     const rect=node.getBoundingClientRect();
     return[rect.x,rect.y,rect.width,rect.height,node.getAttribute('width'),node.getAttribute('height')];
    })]);
    stable=pending===0&&resized&&geometry===previous?stable+1:0;
    previous=geometry;
    if(stable>=2){resolveReady();break;}
   }
  })();
  return()=>{cancelled=true;observer.disconnect();};
 },[]);
 return <AnimationManagerContext.Provider value={factory}>{children}</AnimationManagerContext.Provider>;}
// Older shared fixtures spread this binding; readiness now observes the SDK itself.
export const chartAnimationEvents={};
