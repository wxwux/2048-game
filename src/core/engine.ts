import { cloneDeep } from 'lodash';
import { CellType, GameCell } from '../types';
import rotateMatrix from './matrix';

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export const rotateMatrixToDirection = <T>(matrix: T[][], direction: Direction): T[][] => {
  switch (direction) {
    case Direction.LEFT:
      return rotateMatrix(rotateMatrix(rotateMatrix(matrix)));
    case Direction.DOWN:
      return rotateMatrix(rotateMatrix(matrix));
    case Direction.RIGHT:
      return rotateMatrix(matrix);
    default:
      return matrix;
  }
};

export const rotateMatrixFromDirection = <T>(matrix: T[][], direction: Direction): T[][] => {
  switch (direction) {
    case Direction.LEFT:
      return rotateMatrix(matrix);
    case Direction.DOWN:
      return rotateMatrix(rotateMatrix(matrix));
    case Direction.RIGHT:
      return rotateMatrix(rotateMatrix(rotateMatrix(matrix)));
    default:
      return matrix;
  }
};

export const moveCell = <T extends (GameCell | number)>(matrixToTransform: T[][], x: number, y: number): T[][] => {
  let currentRow: number = y;
  let prevRow: number = y - 1;
  const matrix = cloneDeep(matrixToTransform) as T[][];

  while (prevRow >= 0) {
    if (matrix[prevRow][x] === 0) {
      // (matrix[currentRow][x] as GameCell).state = CellType.MOVING;
      matrix[prevRow][x] = matrix[currentRow][x];
      (matrix[currentRow][x] as number) = 0;
      currentRow = prevRow;
    } else if (
      (matrix[prevRow][x] as GameCell).value === (matrix[currentRow][x] as GameCell).value
      && ((matrix[prevRow][x] as GameCell).state === CellType.IDLE
      || (matrix[prevRow][x] as GameCell).state === CellType.MOVING)
    ) {
      (matrix[prevRow][x] as GameCell).state = CellType.DYING;

      if ('by' in (matrix[prevRow][x] as GameCell)) {
        (matrix[prevRow][x] as GameCell).by = matrix[currentRow][x] as GameCell;
      }

      (matrix[currentRow][x] as GameCell).state = CellType.INCREASE;
      matrix[prevRow][x] = matrix[currentRow][x];
      (matrix[currentRow][x] as number) = 0;
      currentRow = prevRow;
    } else {
      break;
    }

    prevRow--;
  }

  return matrix;
};

type MoveCellFunction = <T extends (GameCell | number)>(matrix: T[][], x: number, y: number) => T[][];

export const traverseMatrix = <T extends (GameCell | number)>(matrixToTraverse: T[][], cb: MoveCellFunction): T[][] => {
  let matrix = cloneDeep(matrixToTraverse);

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (matrix[y][x] !== 0) {
        matrix = cb(matrix, x, y);
      }
    }
  }

  return matrix;
};

export const swapCells = <T extends (GameCell | number)>(cellsToSwap: T[][], x: number, y: number): T[][] => {
  const matrix = cloneDeep(cellsToSwap) as T[][];
  (matrix[y][x] as GameCell).y = y;
  (matrix[y][x] as GameCell).x = x;

  return matrix;
};

export const moveCells = (cellsToMove: GameCell[], direction: Direction): [GameCell[], (number| GameCell)[][]] => {
  const cells: GameCell[] = cloneDeep<GameCell[]>(cellsToMove);
  const matrixSize = 4;

  const matrix: (GameCell | number)[][] = Array.from(
    new Array(matrixSize), () => Array.from(new Array(matrixSize), () => 0),
  );

  cells.forEach((cell: GameCell) => {
    matrix[cell.y][cell.x] = cell;
  });

  const rotatedMatrix = rotateMatrixFromDirection<GameCell | number>(matrix, direction);
  const transformedMatrix = traverseMatrix(rotatedMatrix, moveCell);
  const rotatedBackMatrix = rotateMatrixToDirection<GameCell | number>(transformedMatrix, direction);
  const finalMatrix = traverseMatrix(rotatedBackMatrix, swapCells);

  const movedCells = cells
    .filter((cell) => cell.by !== null)
    .map((cellToChange) => {
      const cell: GameCell = cellToChange;
      cell.x = cell.by!.x;
      cell.y = cell.by!.y;
      delete cell.by;
      return cell;
    });

  return [movedCells, finalMatrix];
};
