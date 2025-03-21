import { createElement } from '../utils/createElem.js';
import { eventEmitter } from '../utils/eventEmitter.js';
//import { appState } from '../utils/state.js';

import { soundSwitch } from '../core/soundSwitch.js';

import { h1 } from '../components/h1.js';
import { wheel } from '../components/decisionPicker/wheel.js';

import { generateColors } from '../lib/generateColors.js';
import { ITodoItem } from '../types/types.js';

//import { spinWheel } from '../core/spinWheel.js';

import { btn } from '../ui/btn.js';
import { numInput } from '../ui/numInput.js';
import { getLS } from '../utils/localStarage.js';

import { btnAwesome } from '../components/decisionPicker/btnAwesome.js';

import '@/styles/style.scss';
import '@/styles/components/decisionPickerPage.scss';

export function decisionPicker(parent: HTMLElement): void {
  const todos: ITodoItem[] = getLS('optionsList') || [];

  if (!todos || todos.length < 2) {
    eventEmitter.emit('changePage', '/');
  }
  generateColors();
  soundSwitch();
  eventEmitter.emit('generateColors');
  const header = createElement({
    tag: 'header',
    classes: ['header'],
    parent: parent,
  });

  h1(header);

  const main = createElement({
    tag: 'main',
    classes: ['main', 'decision-picker'],
    parent: parent,
  });
  const btnContainer = createElement({
    tag: 'div',
    classes: ['btn-container'],
    parent: main,
  });
  btnAwesome({ parent: btnContainer });
  numInput({ parent: btnContainer });

  btn({
    text: 'RUN!',
    parent: main,
    classes: ['btn', 'btn_clickable'],
    onClick: () => eventEmitter.emit('spinWheel'),
  });

  wheel(main);
  btn({
    text: 'Home Page',
    parent: main,
    classes: ['btn', 'btn_clickable'],
    onClick: () => eventEmitter.emit('changePage', '/'),
  });
}
