import { cloneDeep } from 'lodash';
import {
  CellType, GameCell, MoveCellsFunction, MatrixCell,
} from '../types';
import rotateMatrix from './matrix';
import { MATRIX_SIZE } from './creator';

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
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

export const moveCell: MoveCellsFunction = (matrixToTransform, x, y) => {
  let currentRow = y;
  let prevRow = y - 1;
  const matrix = cloneDeep(matrixToTransform);

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

export const traverseMatrix = <T extends MatrixCell>(
  matrixToTraverse: T[][], cb: MoveCellsFunction,
): T[][] => {
  let matrix = cloneDeep(matrixToTraverse);

  for (let y = 0; y < MATRIX_SIZE; y++) {
    for (let x = 0; x < MATRIX_SIZE; x++) {
      if (matrix[y][x] !== 0) {
        matrix = cb(matrix, x, y);
      }
    }
  }

  return matrix;
};

export const swapCells: MoveCellsFunction = (cellsToSwap, x, y) => {
  const matrix = cloneDeep(cellsToSwap);
  (matrix[y][x] as GameCell).y = y;
  (matrix[y][x] as GameCell).x = x;

  return matrix;
};

export const createEmptyMatrix = (matrixSize: number): MatrixCell[][] => Array.from(
  new Array(matrixSize), () => Array.from(new Array(matrixSize), () => 0),
);

export const moveCells = (cellsToMove: GameCell[], direction: Direction): GameCell[] => {
  const cells: GameCell[] = cloneDeep<GameCell[]>(cellsToMove);
  const emptyMatrix = createEmptyMatrix(MATRIX_SIZE);

  cells.forEach((cell: GameCell) => {
    emptyMatrix[cell.y][cell.x] = cell;
  });

  const rotatedMatrix = rotateMatrixFromDirection<MatrixCell>(emptyMatrix, direction);
  const transformedMatrix = traverseMatrix(rotatedMatrix, moveCell);
  const rotatedBackMatrix = rotateMatrixToDirection<MatrixCell>(transformedMatrix, direction);
  const finalMatrix = traverseMatrix(rotatedBackMatrix, swapCells);

  return finalMatrix.flat(2).filter((cell: MatrixCell) => cell !== 0);
};
