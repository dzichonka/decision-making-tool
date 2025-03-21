import { App } from './App.js';
import '@/styles/style.scss';
import { createElement } from './utils/createElem.ts';

const root: HTMLElement = createElement({
  tag: 'div',
  id: 'app',
});
document.body.prepend(root);

App(root);
