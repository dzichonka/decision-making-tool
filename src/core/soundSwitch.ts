//import { btnAwesome } from '../components/decisionPicker/btnAwesome.js';
import { eventEmitter } from '../utils/eventEmitter.js';
import { getLS, setLS } from '../utils/localStarage.js';

export function soundSwitch(): void {
  eventEmitter.clear('soundSwitch');
  eventEmitter.on('soundSwitch', (e: MouseEvent): void => {
    let soundStatus: string | null = getLS<string>('sound');
    if (soundStatus === null) {
      soundStatus = 'on';
    }
    const target = e.target as HTMLElement | null;
    if (!target || target === null) return;
    const musicIcon = target.closest('.fa-music') || target.closest('.fa-volume-xmark');

    if (musicIcon) {
      if (musicIcon.classList.contains('fa-music')) {
        musicIcon.classList.replace('fa-music', 'fa-volume-xmark');
        soundStatus = 'off';
      } else if (musicIcon.classList.contains('fa-volume-xmark')) {
        musicIcon.classList.replace('fa-volume-xmark', 'fa-music');
        soundStatus = 'on';
      }
    }
    setLS('sound', soundStatus);
  });
}
