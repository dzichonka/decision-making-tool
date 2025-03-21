import { homePage } from '../Pages/homePage.ts';
import { decisionPicker } from '../Pages/decisionPicker.ts';
import { eventEmitter } from '../utils/eventEmitter.ts';
import { BASE_PATH } from '../utils/config.ts';

export function createRouter(container: HTMLElement) {
  function renderPage(path: string) {
    container.innerHTML = '';

    const cleanPath = path.startsWith(BASE_PATH) ? path.replace(BASE_PATH, '') : path;

    //console.log('Processed path:', cleanPath);
    // if (cleanPath === '/decision-picker') {
    //   window.location.replace(`${BASE_PATH}/`);
    //   return;
    // }

    if (cleanPath === '/' || cleanPath === '' || cleanPath === '/home') {
      homePage(container);
    } else if (cleanPath === '/decision-picker') {
      decisionPicker(container);
    } else {
      throw new Error(`Router doesn't work: received path "${path}"`);
    }
  }

  function navigateTo(path: string) {
    const fullPath = path.startsWith(BASE_PATH) ? path : `${BASE_PATH}${path}`;
    window.location.hash = fullPath.replace(BASE_PATH, '');

    renderPage(fullPath);
  }

  eventEmitter.on('changePage', navigateTo);
  window.addEventListener('hashchange', () => renderPage(window.location.hash.slice(1)));
  renderPage(window.location.hash.slice(1) || '/');

  return { navigateTo };
}
