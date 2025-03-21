//import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
import { getLS } from '../utils/localStarage';
//import { addOption } from '../core/addOption';
import { ITodoItem } from '../types/types';
import { option } from '../ui/option';

export function recoverOptions(parent: HTMLElement): void {
  const todos: ITodoItem[] = getLS('optionsList') || [];
  if (todos.length > 0) {
    const lastTodo = todos[todos.length - 1];
    const lastTodoId = Number.parseInt(lastTodo.id.replace('#', ''));
    console.log(todos, lastTodoId);
    appState.setState('todos', todos);
    appState.setState('id', lastTodoId);
    todos.forEach((todo) => {
      option({ parent: parent, id: todo.id, title: todo.title, weight: todo.weight });
    });
  }
}
