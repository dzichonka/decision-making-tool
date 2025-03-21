import { createElement } from '../utils/createElem.ts';
import { ICreateElem } from '../types/types.ts';

import '@/styles/components/wheel.scss';
interface ICanvasParams extends Pick<ICreateElem, 'parent' | 'classes' | 'attributes' | 'id'> {
}

export function canvasElem(params: ICanvasParams): HTMLCanvasElement {
  const { parent, classes = [] } = params;

  const elem: HTMLCanvasElement = createElement({
    tag: 'canvas',
    parent: parent,
    classes: ['wheel-canvas', ...classes],
    attributes: { width: '600', height: '600' },
    id: 'canvas',
  });
  return elem;
}
