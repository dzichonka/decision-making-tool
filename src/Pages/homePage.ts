import { createElement } from '../utils/createElem.js';
//import { eventEmitter } from '../utils/eventEmitter.js';
import { h1 } from '../components/h1.js';
import { toDo } from '../components/homePage/toDo.js';
import { clearBtn } from '../components/homePage/clearBtn.js';
import { strtBtn } from '../components/homePage/startBtn.js';
import { addBtn } from '../components/homePage/addBtn.js';
//import { btn } from '../ui/btn.js';
import { reloadLS } from '../core/reloadLS.js';
//import '@/styles/style.scss';

export function homePage(parent: HTMLElement): void {
  reloadLS();
  const header = createElement({
    tag: 'header',
    classes: ['header'],
    parent: parent,
  });

  h1(header);

  const main = createElement({
    tag: 'main',
    classes: ['main', 'home-page'],
    parent: parent,
  });

  toDo(main);
  addBtn(main);
  clearBtn(main);
  strtBtn(main);
}
