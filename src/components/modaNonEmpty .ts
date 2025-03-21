import { modal } from '../ui/modal';
import '../styles/components/modal.scss';

export function modalNonEmpty(parent: HTMLElement): HTMLElement {
  const elem = modal({
    text: 'You need at least two valid options to proceed. Please add options with non-empty titles and weights > 0',
    parent: parent,
    classes: ['modal-non-empty'],
  });
  return elem;
}
