import '@implementation-css';

document.documentElement.classList.toggle('dark', new URLSearchParams(location.search).get('theme') === 'dark');
document.documentElement.dataset.baseCssReady = 'true';
