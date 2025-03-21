import { elemNI } from '../ui/elemNI.ts';

export function h1(parent: HTMLElement): HTMLElement {
  const elem: HTMLElement = elemNI({
    text: 'Decision Making Tool',
    tag: 'h1',
    parent: parent,
    classes: ['h1'],
  });
  return elem;
}
