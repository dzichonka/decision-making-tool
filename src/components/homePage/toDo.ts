import { createElement } from '../../utils/createElem.ts';
import { recoverOptions } from '../../core/recoverOptions.ts';
import { addOption } from '../../core/addOption.ts';
import { clearList } from '../../core/clearList.ts';
//import { getLS } from '../../utils/localStarage.ts';
import '@/styles/style.scss';

export function toDo(parent: HTMLElement): HTMLUListElement {
  const list: HTMLUListElement = createElement({
    tag: 'ul',
    classes: ['todo'],
    parent: parent,
  });
  recoverOptions(list);
  addOption(list);
  clearList(list);
  return list;
}
