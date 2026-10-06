import * as stylex from '@stylexjs/stylex';
import {animationStyles} from '../registry/ariax/ui/animations.stylex';
const styles=stylex.create({
 centered:{marginInline:'auto',maxWidth:'28rem'},bottom:{marginTop:'auto'},min:{minWidth:0},full:{width:'100%'},status:{opacity:{default:null,':is([data-status="unanswered"])':.5}},wide:{marginInline:'auto',maxWidth:'32rem'},wideFull:{marginInline:'auto',width:'100%',maxWidth:'32rem'},center:{alignItems:'center',justifyContent:'center'},sr:{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clipPath:'inset(50%)',whiteSpace:'nowrap',borderWidth:0},
 animated:{animationDuration:{default:null,':is([data-active])':'300ms'},animationTimingFunction:{default:null,':is([data-active])':'ease'},transitionDuration:{default:null,':is([data-active])':'300ms'},'--ariax-enter-opacity':{default:null,':is([data-active])':0},'--ariax-enter-y':{default:null,':is([data-active])':'.5rem'}},
});
export const questionnaireCentered={xstyle:styles.centered},questionnaireBottom={xstyle:styles.bottom},questionnaireMin={xstyle:styles.min},questionnaireFull={xstyle:styles.full},questionnaireStatus={xstyle:styles.status},questionnaireWide={xstyle:styles.wide},questionnaireWideFull={xstyle:styles.wideFull},questionnaireCenter={xstyle:styles.center},questionnaireSr={xstyle:styles.sr},questionnaireAnimated={xstyle:[animationStyles.activeEnter,styles.animated]};
const customStyles=stylex.create({root:(width:number)=>({width,gap:20}),title:{fontSize:24,lineHeight:1.5,color:'var(--primary)'},description:{color:'var(--foreground)'}});
export const questionnaireCustom=(width:number)=>({xstyle:customStyles.root(width)}),questionnaireCustomTitle={xstyle:customStyles.title},questionnaireCustomDescription={xstyle:customStyles.description};
