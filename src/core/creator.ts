import { uniqueId, cloneDeep } from 'lodash';
import { CellType, GameCell } from '../types';

export const create = (cell: GameCell): GameCell => ({
  x: cell.x,
  y: cell.y,
  id: cell.id ? cell.id : uniqueId(),
  value: cell.value,
  state: CellType.IDLE,
  by: null,
});

export const MATRIX_SIZE = 4;

export const getRandomCoords = () : number => Math.floor(Math.random() * 3.9);
export const generateCheckSum = (x: number, y: number) => x * MATRIX_SIZE + y;

export const createInitialCells = () : GameCell[] => {
  const firstCell: GameCell = create({ x: getRandomCoords(), y: getRandomCoords(), value: 2 });
  const secondCell: GameCell = create({ x: getRandomCoords(), y: getRandomCoords(), value: 2 });

  if (firstCell.x === secondCell.x && firstCell.y === secondCell.y) {
    firstCell.x = firstCell.x === 0 ? 1 : firstCell.x - 1;
  }

  return [firstCell, secondCell];
};

export const getAvailableCoords = (occupiedCoords: Set<number>): [number, number] => {
  const takenCoords = cloneDeep<Set<number>>(occupiedCoords);
  const prevSetSize = takenCoords.size;
  let x = 0;
  let y = 0;

  do {
    x = getRandomCoords();
    y = getRandomCoords();

    takenCoords.add(generateCheckSum(x, y));
  } while (prevSetSize === takenCoords.size);

  return [x, y];
};

export const populateFieldWithNewCells = (cells: GameCell[]): GameCell[] => {
  const occupiedCoords = new Set<number>();

  cells.forEach((cell) => {
    occupiedCoords.add(generateCheckSum(cell.x, cell.y));
  });

  // const allCellsAreFilled = occupiedCoords.size === 16;

  // if (!allCellsAreFilled) {
  // }

  const [x, y] = getAvailableCoords(occupiedCoords);
  occupiedCoords.add(generateCheckSum(x, y));

  return [...cells, create({ x, y, value: 2 })];
};
