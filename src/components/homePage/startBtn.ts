import { btn } from '../../ui/btn';
import { eventEmitter } from '../../utils/eventEmitter';
import { getLS } from '../../utils/localStarage';

import { cleanUpOptions } from '../../core/cleanUpOptions';
import { modalNonEmpty } from '../modaNonEmpty ';

import { ITodoItem } from '../../types/types';

//import { generateColors } from '../../lib/generateColors';
import '@/styles/style.scss';

export function strtBtn(parent: HTMLElement): HTMLElement {
  cleanUpOptions();
  //generateColors();
  const elem = btn({
    text: 'Start',
    parent: parent,
    classes: ['btn', 'start-btn', 'btn_clickable'],
    onClick: () => {
      eventEmitter.emit('cleanUpOptions');
      const todos: ITodoItem[] = getLS('optionsList') || [];
      console.log(todos);
      if (todos === null || todos.length < 2) {
        return modalNonEmpty(parent);
      } else {
        eventEmitter.emit('changePage', '/decision-picker');
      }
    },
  });
  return elem;
}
