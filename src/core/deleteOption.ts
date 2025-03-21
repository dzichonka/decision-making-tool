import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
import { setLS } from '../utils/localStarage';
//import { ITodoItem } from '../types/types';
//import { option } from '../ui/option';

export function deleteOption(): void {
  eventEmitter.on('deleteOption', ({ id, parent }: { id: string; parent: HTMLElement }) => {
    const todos = appState.getState('todos');
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    appState.setState('todos', updatedTodos);
    setLS('optionsList', updatedTodos);
    parent.remove();
  });
}
