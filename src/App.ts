import { createRouter } from './router/router.ts';
import { createElement } from './utils/createElem.ts';

export const App = (parent: HTMLElement) => {
  const container = createElement({
    tag: 'div',
    classes: ['container'],
    parent: parent,
  });

  createRouter(container);
};
