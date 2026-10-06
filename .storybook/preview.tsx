import type { Preview } from '@storybook/react-vite';
import '@implementation-css';
import '../registry/ariax/styles/theme.css';
import './preview.css';
import {installParityAnimationObserver} from './animation-observer';

installParityAnimationObserver();

const preview: Preview = {
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
  globalTypes: {
    theme: { description: 'Theme', toolbar: { icon: 'paintbrush', items: ['light', 'dark'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light' },
  decorators: [(Story, context) => {
    document.documentElement.classList.toggle('dark', context.globals.theme === 'dark');
    return <Story />;
  }],
};
export default preview;
