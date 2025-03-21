import { createElement } from '../utils/createElem';
import { eventEmitter } from '../utils/eventEmitter';
//import { appState } from '../utils/state';
//import { setLS } from '../utils/localStarage';
import { inputText } from '../core/inputText';
import { deleteOption } from '../core/deleteOption';
import '@/styles/components/toDo.scss';

interface IOptionParams {
  parent: HTMLElement | null;
  id: string;
  title?: string;
  weight?: string;
}

export function option({ parent, id, title = '', weight = '' }: IOptionParams): HTMLLIElement {
  const itemToDo: HTMLLIElement = createElement({
    tag: 'li',
    parent: parent,
    classes: ['todo__item', 'todo-item'],
  });

  createElement({
    tag: 'label',
    parent: itemToDo,
    classes: ['todo-item__label', 'btn'],
    attributes: { for: id, innerText: id },
    text: id,
  });
  inputText();

  const optionTitle: HTMLInputElement = createElement({
    tag: 'input',
    parent: itemToDo,
    classes: ['todo-item__input-title'],
    id: id,
    attributes: {
      type: 'text',
      name: 'title',
      placeholder: 'Title',
      value: title,
    },
  });

  optionTitle.addEventListener('input', () =>
    eventEmitter.emit('inputText', {
      inputElem: optionTitle,
      id: id,
      item: 'title',
    }),
  );

  const optionWeight: HTMLInputElement = createElement({
    tag: 'input',
    parent: itemToDo,
    classes: ['todo-item__input-weight'],
    attributes: {
      type: 'number',
      name: 'weight',
      placeholder: 'Weight',
      value: weight,
    },
  });
  optionWeight.addEventListener('input', () =>
    eventEmitter.emit('inputText', {
      inputElem: optionWeight,
      id: id,
      item: 'weight',
    }),
  );

  const delBtn: HTMLElement = createElement({
    text: 'Delete',
    tag: 'div',
    parent: itemToDo,
    classes: ['btn-del', 'btn', 'btn_clickable'],
  });
  deleteOption();

  delBtn.addEventListener('click', () => {
    eventEmitter.emit('deleteOption', { id: id, parent: itemToDo });
  });

  return itemToDo;
}
