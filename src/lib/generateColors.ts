import { getLS } from '../utils/localStarage';
import { appState } from '../utils/state';
import { eventEmitter } from '../utils/eventEmitter';

/**
 * Generates an array of random colors and assigns it to the state.
 * The array length is equal to the number of options in the localStorage.
 * @returns {void}
 */
export function generateColors(): void {
  eventEmitter.on('generateColors', () => {
    const optionsList = getLS('optionsList') as string[];
    const wheelColors: string[] = Array.from(
      { length: optionsList.length },
      () => `hsl(${Math.random() * 360}, 65%, 85%)`,
    );
    appState.setState('wheelColors', wheelColors);
  });
}
