import { createElement } from '../utils/createElem.ts';
import { ICreateElem } from '../types/types.ts';

interface IModalParams extends Pick<ICreateElem, 'parent' | 'classes' | 'text'> {}

export function modal(params: IModalParams): HTMLElement {
  const { parent, classes, text } = params;

  const overlay = createElement({
    tag: 'div',
    classes: ['modal-overlay'],
    parent: parent,
  });

  createElement({
    tag: 'div',
    id: 'modal',
    text: text,
    classes: [...(classes || []), 'modal'],
    parent: overlay,
  });
  overlay.addEventListener('click', (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      overlay.remove();
    }
  });

  return overlay;
}
