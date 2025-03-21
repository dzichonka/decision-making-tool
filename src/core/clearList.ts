import { eventEmitter } from '../utils/eventEmitter';
import { appState } from '../utils/state';
//import { ITodoItem } from '../types/types';
import { clearLS, setLS } from '../utils/localStarage';
//import { option } from '../ui/option';
import { recoverOptions } from './recoverOptions';

export function clearList(parent: HTMLElement): void {
  eventEmitter.clear('clearList');
  eventEmitter.on('clearList', () => {
    parent.innerHTML = '';
    appState.setState('id', 0);
    appState.setState('todos', [{ id: '#1', title: '', weight: '' }]);
    clearLS('optionsList');
    setLS('optionsList', [{ id: '#1', title: '', weight: '' }]);
    recoverOptions(parent);
  });
}
