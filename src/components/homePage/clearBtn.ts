import { btn } from '../../ui/btn';
import { eventEmitter } from '../../utils/eventEmitter';
import '@/styles/style.scss';

export function clearBtn(parent: HTMLElement): HTMLElement {
  const elem = btn({
    text: 'Clear List',
    parent: parent,
    classes: ['btn', 'clear-btn', 'btn_clickable'],
    onClick: () => eventEmitter.emit('clearList'),
  });
  return elem;
}
