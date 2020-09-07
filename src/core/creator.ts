import { uniqueId } from 'lodash';
import { CellType, GameCell } from '../types';

export const create = (cell: GameCell): GameCell => ({
  x: cell.x,
  y: cell.y,
  id: cell.id ? cell.id : uniqueId(),
  value: cell.value,
  state: CellType.IDLE,
  by: null,
});

export const getRandomCoords = () : number => Math.floor(Math.random() * 3.9);

export const createInitialCells = () : GameCell[] => {
  const firstCell: GameCell = create({ x: getRandomCoords(), y: getRandomCoords(), value: 2 });
  const secondCell: GameCell = create({ x: getRandomCoords(), y: getRandomCoords(), value: 2 });

  if (firstCell.x === secondCell.x && firstCell.y === secondCell.y) {
    firstCell.x = firstCell.x === 0 ? 1 : firstCell.x - 1;
  }

  return [firstCell, secondCell];
};

export const populateFieldWithNewCells = (cells: GameCell[]): GameCell[] => {
  const occupiedCoords = new Set();

  cells.forEach((cell) => {
    occupiedCoords.add(cell.x * 4 + cell.y);
  });

  // const allCellsAreFilled = occupiedCoords.size === 16;

  let x = 0;
  let y = 0;

  const startSize = occupiedCoords.size;

  do {
    x = getRandomCoords();
    y = getRandomCoords();

    const sum = x * 4 + y;
    occupiedCoords.add(sum);
  } while (startSize === occupiedCoords.size);

  return [...cells, create({ x, y, value: 2 })];

  // if (!allCellsAreFilled) {
  // }
};
