import { createElement } from '../../utils/createElem.ts';
import { eventEmitter } from '../../utils/eventEmitter';

//import { soundSwitch } from '../../core/soundSwitch';

import { ICreateElem } from '../../types/types';

import '@/styles/style.scss';

interface IBtnAwesomeParams extends Pick<ICreateElem, 'parent'> {}

export function btnAwesome(params: IBtnAwesomeParams): HTMLElement {
  // <i class="fa-regular fa-music fa-2xl"></i>
  const fontAwesomeClasses: string[] = ['fa-solid', 'fa-music', 'fa-xl'];

  const { parent } = params;
  const elem: HTMLElement = createElement({
    tag: 'div',
    parent: parent,
    classes: ['btn', 'btn_clickable', 'btn-sound'],
    children: [createElement({ tag: 'i', classes: [...fontAwesomeClasses, 'fontAwesome'] })],
  });
  elem.addEventListener('click', (e: MouseEvent) => eventEmitter.emit('soundSwitch', e));
  return elem;
}
