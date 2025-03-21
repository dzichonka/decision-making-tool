import { ITodoItem } from '../types/types';
import { appState } from '../utils/state';
//import { generateColors } from '../lib/generateColors';

export function drawWheel(canvas: HTMLCanvasElement, options: ITodoItem[]): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 20;
  const totalWeight = options.reduce((acc, option) => acc + (Number(option.weight) || 1), 0);

  let startAngle = 0;
  //const segments: { start: number; end: number; title: string }[] = [];

  options.forEach((option, i) => {
    const weight = Number(option.weight) || 1;
    const angle = (weight / totalWeight) * (2 * Math.PI);

    const color = appState.getState('wheelColors')[i];
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#43304b';
    ctx.lineWidth = 2;
    ctx.stroke();

    //text
    const textAngle = startAngle + angle / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(textAngle);

    ctx.fillStyle = '#43304b';
    ctx.font = 'bold 18px Nunito';
    ctx.textAlign = 'start';
    ctx.textBaseline = 'middle';
    ctx.fillText(option.title, 40, 0);

    ctx.restore();

    startAngle += angle;
  });

  // center
  ctx.beginPath();
  ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
  ctx.fillStyle = '#a35d85';
  ctx.fill();
  ctx.stroke();
}
export function drawArrow(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  ctx.fillStyle = '#f8b5cb';
  ctx.strokeStyle = '#43304b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 20, centerY - radius - 5);
  ctx.lineTo(centerX + 20, centerY - radius - 5);
  ctx.lineTo(centerX, centerY - radius + 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}
