import { btn } from '../../ui/btn';
import { eventEmitter } from '../../utils/eventEmitter';
import '@/styles/style.scss';

export function addBtn(parent: HTMLElement): HTMLElement {
  const elem = btn({
    text: 'Add Option',
    parent: parent,
    classes: ['btn', 'add-btn', 'btn_clickable'],
    onClick: () => eventEmitter.emit('addOption'),
  });
  return elem;
}
