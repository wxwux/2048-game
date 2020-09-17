import { cloneDeep } from 'lodash';
import {
  Direction, MoveCellsFunction, Matrix, MatrixCell, GameCell,
} from '../types';
import { MATRIX_SIZE } from './constants';

export const generateCheckSumByCoords = (x: number, y: number) => x * MATRIX_SIZE + y;

export const traverseMatrix = <T extends MatrixCell>(
  matrixToTraverse: T[][],
  cb: (matrix: T[][], x: number, y: number) => T[][],
): T[][] => {
  let matrix = cloneDeep<T[][]>(matrixToTraverse);

  for (let y = 0; y < MATRIX_SIZE; y++) {
    for (let x = 0; x < MATRIX_SIZE; x++) {
      if (matrix[y][x] !== 0) {
        matrix = cb(matrix, x, y) as T[][];
      }
    }
  }

  return matrix;
};

export const matrixAreSame = (
  prevCellsSet: GameCell[],
  currentCellsSet: GameCell[],
) : boolean => {
  const prevCellsSum = prevCellsSet.reduce((
    acc, cell,
  ) => acc + generateCheckSumByCoords(cell.x, cell.y), 0);

  const currentCellsSum = currentCellsSet.reduce((
    acc, cell,
  ) => acc + generateCheckSumByCoords(cell.x, cell.y), 0);

  return prevCellsSum === currentCellsSum;
};

export const reverseRows = <T>(matrix: T[][]): T[][] => {
  const clonedMatrix: T[][] = cloneDeep<T[][]>(matrix);

  for (let y = 0; y < MATRIX_SIZE; y++) {
    for (let x = 0; x < MATRIX_SIZE; x++) {
      if (x % 2 === 0) {
        const temp: T = clonedMatrix[y][MATRIX_SIZE - x - 1];
        clonedMatrix[y][MATRIX_SIZE - x - 1] = clonedMatrix[y][x];
        clonedMatrix[y][x] = temp;
      }
    }
  }

  return clonedMatrix;
};

export const transpose = <T>(matrix: T[][]): T[][] => {
  const clonedMatrix: T[][] = cloneDeep<T[][]>(matrix);

  for (let y = 0, x = 0; y < MATRIX_SIZE; y++) {
    x = y;
    while (x < MATRIX_SIZE) {
      if (y !== x) {
        const temp: T = clonedMatrix[y][x];
        clonedMatrix[y][x] = clonedMatrix[x][y];
        clonedMatrix[x][y] = temp;
      }
      x++;
    }
  }

  return clonedMatrix;
};

export const rotateMatrix = <T>(matrix: T[][]): T[][] => {
  const transposedMatrix: T[][] = transpose(matrix);
  return reverseRows(transposedMatrix);
};

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
