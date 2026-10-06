import{defaultBarProps}from'recharts/es6/cartesian/Bar';
import type{ReactNode}from'react';
import{AnimationManagerContext}from'recharts/es6/animation/useAnimationManager';
import{createAnimateManager}from'recharts/es6/animation/AnimationManager';
import{createDefaultAnimationManager}from'recharts/es6/animation/createDefaultAnimationManager';
import type{TimeoutController}from'recharts/types/animation/timeoutController';
type Clock={duration:number;time:number;pending:()=>number;advance:(time:number)=>void;completed:number};
declare global{interface Window{__enableChartClock?:boolean;__chartClock?:Clock}}
function createClock(){let time=0;let sequence=0;const queue=new Map<number,{time:number;callback:(time:number)=>void}>();const controller:TimeoutController={setTimeout(callback,delay=0){const id=sequence++;queue.set(id,{time:time+Math.max(1000/60,delay),callback});return()=>{queue.delete(id)};}};const clock:Clock={duration:defaultBarProps.animationDuration,get time(){return time},pending:()=>queue.size,completed:0,advance(target){if(target<time)throw new Error('Chart clock must advance monotonically');for(let guard=0;guard<10000;guard++){const next=[...queue.entries()].sort((a,b)=>a[1].time-b[1].time||a[0]-b[0])[0];if(!next||next[1].time>target){time=target;return;}queue.delete(next[0]);time=next[1].time;next[1].callback(time);}throw new Error('Chart animation queue did not settle');}};return{clock,controller};}
const controlled=typeof window!=='undefined'&&window.__enableChartClock?createClock():undefined;
if(controlled)window.__chartClock=controlled.clock;
const factory=()=>controlled?createAnimateManager(controlled.controller):createDefaultAnimationManager();
export function ChartAnimationControl({children}:{children:ReactNode}){return <AnimationManagerContext.Provider value={factory}>{children}</AnimationManagerContext.Provider>;}
export const chartAnimationEvents={onAnimationEnd:()=>{if(window.__chartClock)window.__chartClock.completed++;}};
