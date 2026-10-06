import {useState, type CSSProperties} from 'react';
import {CardTitle,CardDescription} from '@card';
import {Questionnaire,QuestionnaireItem,QuestionnaireTitle,QuestionnaireDescription,QuestionnaireInput,QuestionnaireActions,QuestionnaireSubmit} from '@questionnaire';
import {questionnaireCustom,questionnaireCustomTitle,questionnaireCustomDescription} from '@questionnaire-customizations';
export function QuestionnaireCustomization(){
 const [width,setWidth]=useState(320);const [submitted,setSubmitted]=useState(0);
 return <><button onClick={()=>setWidth(380)}>Change width</button><Questionnaire id="custom-questionnaire" items={[{name:'note'}]} {...questionnaireCustom(width)} style={{'--questionnaire-width':`${width}px`,gap:12} as CSSProperties} onSubmit={e=>{e.preventDefault();setSubmitted(n=>n+1);}} ref={node=>{if(node)node.dataset.ref='attached';}}>
 <QuestionnaireItem name="note"><QuestionnaireTitle {...questionnaireCustomTitle} style={{fontSize:22}} render={<CardTitle/>}>Custom title<CardTitle data-testid="nested-title">Nested title</CardTitle></QuestionnaireTitle><QuestionnaireDescription {...questionnaireCustomDescription} render={<CardDescription/>}>Custom description</QuestionnaireDescription><QuestionnaireInput aria-label="Custom note" render={(props,state)=><input {...props} data-custom-disabled={state.disabled}/>}/></QuestionnaireItem><QuestionnaireActions><QuestionnaireSubmit variant="secondary" size="sm">Submit {submitted}</QuestionnaireSubmit></QuestionnaireActions></Questionnaire></>;
}
