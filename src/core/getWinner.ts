import { ITodoItem } from '../types/types';

export function getWinner(rotation: number, options: ITodoItem[]): ITodoItem {
  let normalizedRotation = rotation % (2 * Math.PI);
  if (normalizedRotation < 0) {
    normalizedRotation += 2 * Math.PI;
  }

  const segmentAngle = (2 * Math.PI) / options.length;

  const index = Math.floor(normalizedRotation / segmentAngle);

  console.log('Selected Option:', options[index]);
  return options[index];
}
