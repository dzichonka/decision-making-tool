//import { appState } from '../utils/state.js';
import { getLS, setLS } from '../utils/localStarage.js';
import { appState } from '../utils/state.js';

export function reloadLS(): void {
  const todos = getLS('optionsList');
  const sound = getLS('sound');
  if (!todos) {
    setLS('optionsList', appState.getState('todos'));
  }
  if (!sound) {
    setLS('sound', 'on');
  }
}
