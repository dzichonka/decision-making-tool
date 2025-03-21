import { createElement } from '../../utils/createElem.ts';
import { eventEmitter } from '../../utils/eventEmitter';

//import { soundSwitch } from '../../core/soundSwitch';

import { ICreateElem } from '../../types/types';
//import { elemNI } from '../../ui/elemNI.ts';

import '@/styles/style.scss';

interface IBtnAwesomeParams extends Pick<ICreateElem, 'parent'> {}

export function btnASound(params: IBtnAwesomeParams): HTMLElement {
  // <i class="fa-regular fa-music fa-2xl"></i>
  //const fontAwesomeClasses: string[] = ['fa-solid', 'fa-volume-xmark', 'fa-xl'];
  // <i class="fa-solid fa-volume-xmark"></i>
  // conClasses = ['fa-solid', 'fa-music', 'fa-xl'];
  const { parent } = params;
  const elem: HTMLElement = createElement({
    tag: 'div',
    parent: parent,
    classes: ['btn', 'btn_clickable', 'btn-sound'],
  });
  elem.addEventListener('click', () => eventEmitter.emit('soundSwitch'));
  return elem;
}
