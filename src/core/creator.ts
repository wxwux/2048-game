import { cloneDeep, uniqueId } from 'lodash';
import { CellType, GameCell, MatrixCell } from '../types';
import { generateCheckSumByCoords } from './matrix';

export const create = (cell: GameCell): GameCell => ({
  x: cell.x,
  y: cell.y,
  id: cell.id ? cell.id : uniqueId(),
  value: cell.value,
  state: cell.state,
});

export const getRandomCoords = () : number => Math.floor(Math.random() * 3.9);

export const createInitialCells = () : GameCell[] => {
  const firstCell: GameCell = create({
    x: getRandomCoords(), y: getRandomCoords(), value: 2, state: CellType.IDLE,
  });
  const secondCell: GameCell = create(
    {
      x: getRandomCoords(), y: getRandomCoords(), value: 2, state: CellType.IDLE,
    },
  );

  if (firstCell.x === secondCell.x && firstCell.y === secondCell.y) {
    firstCell.x = firstCell.x === 0 ? 1 : firstCell.x - 1;
  }

  return [firstCell, secondCell];
};

export const createEmptyMatrix = (matrixSize: number): MatrixCell[][] => Array.from(
  new Array(matrixSize), () => Array.from(new Array(matrixSize), () => 0),
);

export const getAvailableCoords = (occupiedCoords: Set<number>): [number, number] => {
  const takenCoords = cloneDeep<Set<number>>(occupiedCoords);
  const prevSetSize = takenCoords.size;
  let x = 0;
  let y = 0;

  do {
    x = getRandomCoords();
    y = getRandomCoords();

    takenCoords.add(generateCheckSumByCoords(x, y));
  } while (prevSetSize === takenCoords.size);

  return [x, y];
};

export const populateFieldWithNewCells = (cells: GameCell[]): GameCell[] => {
  const occupiedCoords = new Set<number>();

  cells.forEach((cell) => {
    occupiedCoords.add(generateCheckSumByCoords(cell.x, cell.y));
  });

  const allCellsAreFilled = occupiedCoords.size === 16;

  if (allCellsAreFilled) return cells;

  const [x, y] = getAvailableCoords(occupiedCoords);
  occupiedCoords.add(generateCheckSumByCoords(x, y));

  return [...cells, create({
    x, y, value: 2, state: CellType.BORN,
  })];
};
