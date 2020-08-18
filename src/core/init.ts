import create from './creator';
import { GameCell } from '../types';

export const getRandomCoords = () : number => Math.floor(Math.random() * 3.9);

export const createStartCells = () : GameCell[] => {
  const firstCell: GameCell = create({ x: getRandomCoords(), y: getRandomCoords(), value: 4 });
  const secondCell: GameCell = create({ x: getRandomCoords(), y: getRandomCoords(), value: 4 });

  if (firstCell.x === secondCell.x && firstCell.y === secondCell.y) {
    firstCell.x = firstCell.x === 0 ? 1 : firstCell.x - 1;
  }

  return [firstCell, secondCell];
};
