import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
import { setLS, getLS } from '../utils/localStarage';
//import { addOption } from '../core/addOption';
import { ITodoItem } from '../types/types';
//import { option } from '../ui/option';

export function cleanUpOptions(): void {
  eventEmitter.on('cleanUpOptions', () => {
    const todos: ITodoItem[] = getLS('optionsList') || [];
    if (todos.length > 1) {
      let todos: ITodoItem[] = getLS('optionsList') || [];

      todos = todos.filter((todo) => !(todo.title.trim() === '' && todo.weight.trim() === ''));

      setLS('optionsList', todos);

      appState.setState('todos', todos);
    }
  });
}
