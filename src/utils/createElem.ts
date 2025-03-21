import { ICreateElem } from '../types/types';
//export type IOutpurElems = HTMLElement | HTMLInputElement;

export function createElement<T extends keyof HTMLElementTagNameMap>(
  options: ICreateElem & { tag: T },
): HTMLElementTagNameMap[T] {
  const { tag, text = '', children, parent, classes = [], id, attributes, style } = options;

  let element = <HTMLElementTagNameMap[T]>document.createElement(tag);
  element = document.createElement(tag);
  element.textContent = text;

  if (children) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.append(document.createTextNode(child));
      } else {
        element.append(child);
      }
    });
  }

  if (parent) {
    if (typeof parent === 'string') {
      const parentElement = document.querySelector(parent);
      if (parentElement instanceof HTMLElement) {
        parentElement.append(element);
      } else {
        console.error(`Parent selector "${parent}" did not match any element.`);
      }
    } else if (parent instanceof HTMLElement) {
      parent.append(element);
    } else {
      console.error('Parent is not a valid HTML element:', parent);
    }
  }

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (id) {
    element.id = id;
  }

  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key in element) {
        (element as any)[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    }
  }

  if (style) {
    element.style.cssText = style;
  }

  return element;
}
