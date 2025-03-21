import { createElement } from '../utils/createElem';
//import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
//import { setLS } from '../utils/localStarage';
import { ICreateElem } from '../types/types';
import { inputText } from '../core/inputText';

import '@/styles/components/numInput.scss';

interface InumInputParams extends Pick<ICreateElem, 'parent'> {
  parent?: HTMLElement | keyof HTMLElementTagNameMap | null;
}

export function numInput(params: InumInputParams): HTMLElement {
  const { parent } = params;
  //<i class="fa-solid fa-stopwatch-20"></i>
  const fontAwesomeClasses: string[] = ['fa-solid', 'fa-stopwatch-20', 'fa-2xl'];
  const id = 'duration';

  const duration: HTMLDivElement = createElement({
    tag: 'div',
    parent: parent,
    classes: ['duration'],
  });

  createElement({
    tag: 'label',
    parent: duration,
    classes: ['duration-lable'],
    attributes: { for: id },
    children: [createElement({ tag: 'i', classes: [...fontAwesomeClasses, 'fontAwesome'] })],
  });
  inputText();

  const inputTime: HTMLInputElement = createElement({
    tag: 'input',
    parent: duration,
    classes: ['input'],
    id: id,
    attributes: {
      type: 'number',
      name: 'time',
      placeholder: 'Time',
      value: '5',
    },
  });
  inputTime.addEventListener('input', () => {
    appState.setState('spinTime', Number.parseInt(inputTime.value) * 1000);
  });
  return duration;
}
