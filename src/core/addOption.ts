import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
import { ITodoItem } from '../types/types';
import { option } from '../ui/option';

export function addOption(parent: HTMLElement): void {
  eventEmitter.clear('addOption');
  eventEmitter.on('addOption', () => {
    const curID = appState.getState('id');
    console.log(curID);
    const newID = `#${curID + 1}`;
    option({ parent: parent, id: newID });
    const newTodo: ITodoItem = {
      id: newID,
      title: '',
      weight: '',
    };
    appState.setState('id', curID + 1);
    const todos = appState.getState('todos') || [];
    const updatedTodos = [...todos, newTodo];
    appState.setState('todos', updatedTodos);
  });
}
