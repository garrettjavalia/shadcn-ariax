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
let started=0;
let ended=0;
let resolveReady:()=>void=()=>{};
if(typeof window!=='undefined'&&!controlled)window.parityReady=new Promise<void>(resolve=>{resolveReady=resolve;});
const factory=()=>{
 if(controlled)return createAnimateManager(controlled.controller);
 const manager=createDefaultAnimationManager();
 const controller=manager.getTimeoutController();
 const original=controller.setTimeout.bind(controller);
 controller.setTimeout=(callback,delay)=>{
  let active=true;pending++;
  const cancel=original(time=>{if(active){active=false;pending--;callback(time)}},delay);
  return()=>{if(active){active=false;pending--;}cancel();};
 };
 return manager;
};
export function ChartAnimationControl({children}:{children:ReactNode}){
 useEffect(()=>{
  if(controlled)return;
  let cancelled=false;
  void(async()=>{
   await document.fonts.ready;
   const frame=()=>new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
   await frame();await frame();
   while(!cancelled&&(pending>0||(document.querySelector('.recharts-bar')&&(!started||ended<started))))await frame();
   if(!cancelled)resolveReady();
  })();
  return()=>{cancelled=true};
 },[]);
 return <AnimationManagerContext.Provider value={factory}>{children}</AnimationManagerContext.Provider>;}
export const chartAnimationEvents={onAnimationStart:()=>{started++;},onAnimationEnd:()=>{ended++;if(window.__chartClock)window.__chartClock.completed++;}};
