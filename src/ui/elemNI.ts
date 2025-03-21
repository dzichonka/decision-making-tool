import { createElement } from '../utils/createElem.ts';

interface IElemNIParams {
  text: string;
  tag: keyof HTMLElementTagNameMap;
  classes?: string[];
  parent?: HTMLElement;
}

export function elemNI(params: IElemNIParams): HTMLElement {
  const { text, tag, parent, classes = [] } = params;
  const elem: HTMLElement = createElement({
    text: text,
    tag: tag,
    parent: parent,
    classes: classes,
  });
  return elem;
}
