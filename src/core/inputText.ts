import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
//import { ITodoItem } from '../types/types';
import { setLS } from '../utils/localStarage';
//import { option } from '../ui/option';

export function inputText(): void {
  eventEmitter.on(
    'inputText',
    ({ inputElem, id, item }: { inputElem: HTMLInputElement; id: string; item: 'title' | 'weight' }) => {
      const todos = appState.getState('todos');
      const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, [item]: inputElem.value } : todo));
      appState.setState('todos', updatedTodos);
      const optionsList = appState.getState('todos');
      setLS('optionsList', optionsList);
    },
  );
}
