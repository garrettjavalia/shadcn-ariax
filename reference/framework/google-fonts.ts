import type {CSSProperties} from 'react';

type VazirmatnOptions = {subsets:['arabic'];variable?:`--${string}`};
type ExampleWindow = Window & {parityReady?:Promise<void>};
const family = '"Vazirmatn", sans-serif';
let ready:Promise<void>|undefined;

function loadVazirmatn() {
  if (ready || typeof document === 'undefined') return;
  ready = new Promise<void>((resolve,reject) => {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap';
    const timeout = window.setTimeout(() => reject(new Error('Vazirmatn font loading timed out')),20_000);
    stylesheet.onerror = () => reject(new Error('Vazirmatn Google Fonts stylesheet failed to load'));
    stylesheet.onload = async () => {
      try {
        const faces = await document.fonts.load('16px "Vazirmatn"','مرحبا Calendar ۱۲۳۴');
        await document.fonts.ready;
        if (!faces.length || faces.some(face => face.status !== 'loaded')) throw new Error('Vazirmatn font files did not load');
        document.documentElement.dataset.exampleFontReady = 'Vazirmatn';
        resolve();
      } catch(error) {reject(error);}
    };
    document.head.append(stylesheet);
    // Clear the timer for both success and failure without swallowing the failure.
    stylesheet.addEventListener('load',() => {
      // The font file request continues after the stylesheet's load event.
      ready?.then(() => window.clearTimeout(timeout),() => window.clearTimeout(timeout));
    },{once:true});
    stylesheet.addEventListener('error',() => window.clearTimeout(timeout),{once:true});
  });
  const environment = window as ExampleWindow;
  environment.parityReady = Promise.all([environment.parityReady,ready]).then(() => undefined);
  // Surface a failure in ordinary previews as well as through the test readiness contract.
  void environment.parityReady.catch(error => {
    document.documentElement.dataset.exampleFontError = String(error);
    const showError = () => {
      const message = document.createElement('div');
      message.setAttribute('role','alert');
      message.dataset.frameworkFontError = '';
      message.textContent = `Example font failed to load: ${String(error)}`;
      document.body.append(message);
    };
    if (document.body) showError();
    else document.addEventListener('DOMContentLoaded',showError,{once:true});
  });
}

export function Vazirmatn({subsets,variable}:VazirmatnOptions) {
  if (subsets.length !== 1 || subsets[0] !== 'arabic') throw new Error('The official Vazirmatn example requires the arabic subset');
  const className = 'example-vazirmatn';
  const variableClass = variable ? `example-vazirmatn-variable-${variable.slice(2)}` : '';
  if (typeof document !== 'undefined') {
    if (!document.getElementById(className)) {
      const style = document.createElement('style');
      style.id = className;
      style.textContent = `.${className}{font-family:${family}}`;
      document.head.append(style);
    }
    if (variable && !document.getElementById(variableClass)) {
      const style = document.createElement('style');
      style.id = variableClass;
      style.textContent = `.${variableClass}{${variable}:${family}}`;
      document.head.append(style);
    }
    loadVazirmatn();
  }
  return {className,style:{fontFamily:family} satisfies CSSProperties,variable:variableClass};
}
