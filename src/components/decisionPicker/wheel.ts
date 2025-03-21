import { createElement } from '../../utils/createElem.ts';
import { getLS } from '../../utils/localStarage.ts';
import { eventEmitter } from '../../utils/eventEmitter.ts';

import { canvasElem } from '../../ui/canvasElem.ts';

import { drawWheel, drawArrow } from '../../core/drawWheel.ts';
import { spinWheel } from '../../core/spinWheel.ts';

import '@/styles/components/wheel.scss';

export function wheel(parent: HTMLElement): HTMLCanvasElement {
  const wheelContaine: HTMLElement = createElement({
    tag: 'div',
    classes: ['wheel'],
    parent: parent,
  });

  const elem: HTMLCanvasElement = canvasElem({ parent: wheelContaine });
  const rawOptions = getLS('optionsList');
  const options = Array.isArray(rawOptions) ? rawOptions : [];

  drawWheel(elem, options);
  drawArrow(elem);

  eventEmitter.on('spinWheel', () => {
    spinWheel(elem, options).then((winner) => {
      console.log('Выбранный вариант:', winner);
    });
  });

  return elem;
}
