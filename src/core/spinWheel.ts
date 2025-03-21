import { ITodoItem } from '../types/types';

import { appState } from '../utils/state';
import { getLS } from '../utils/localStarage';

import { easeOut } from '../lib/easeOut';

import { drawWheel, drawArrow } from './drawWheel';
import { getWinner } from './getWinner';
export async function spinWheel(canvas: HTMLCanvasElement, options: ITodoItem[]): Promise<ITodoItem | null> {
  const ctx = canvas?.getContext('2d');
  if (!ctx) return null;

  let rotation = 0;
  const spinTime = appState.getState('spinTime');
  const start = performance.now();

  const totalRotation = Math.random() * 3 + 3;

  return new Promise<ITodoItem | null>((resolve) => {
    function animateWheel(time: number) {
      if (!ctx) return;

      try {
        const elapsed = time - start;
        const progress = Math.min(elapsed / spinTime, 1);

        rotation = easeOut(progress) * totalRotation * Math.PI;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        drawWheel(canvas, options);

        ctx.restore();

        drawArrow(canvas);

        if (progress < 1) {
          requestAnimationFrame(animateWheel);
        } else {
          if (getLS('sound') === 'on') {
            const winSound = new Audio('./sounds/game-bonus.mp3');
            winSound.currentTime = 0;
            winSound.play();
          }
          const selectedOption = getWinner(rotation, options);

          console.log('Winner:', selectedOption);
          resolve(selectedOption);
        }
      } catch (error) {
        console.error('Error during animation:', error);
        resolve(null);
      }
    }
    requestAnimationFrame(animateWheel);
  });
}
