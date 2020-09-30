import { cloneDeep } from 'lodash';
import {
  Direction, GameCell,
} from '../types';
import { MATRIX_SIZE } from './constants';

export const generateCheckSumByCoords = (x: number, y: number): number => x * MATRIX_SIZE + y;

export const traverseMatrix = <T>(
  matrixToTraverse: T[][],
  cb: (
    matrix: T[][], x: number, y: number, breakLoopFn?: () => void
  ) => T[][],
): T[][] => {
  let matrix = cloneDeep<T[][]>(matrixToTraverse);
  let breakLoop = false;

  for (let y = 0; y < MATRIX_SIZE; y++) {
    for (let x = 0; x < MATRIX_SIZE; x++) {
      matrix = cb(matrix, x, y, () => {
        breakLoop = true;
      }) as T[][];
      if (breakLoop) break;
    }
    if (breakLoop) break;
  }

  return matrix;
};


export const reverseRows = <T>(matrix: T[][]): T[][] => traverseMatrix<T>(
  matrix,
  (traversedMatrix, x, y) => {
    if (x <= 0) {
      traversedMatrix[y] = traversedMatrix[y].reverse();
    }
    return traversedMatrix;
  },
);

export const transpose = <T>(matrix: T[][]): T[][] => traverseMatrix<T>(
  matrix,
  (traversedMatrix, x, y) => {
    traversedMatrix[y][x] = matrix[x][y];
    return traversedMatrix;
  },
);

export const rotateMatrix = <T>(matrix: T[][]): T[][] => {
  const transposedMatrix: T[][] = transpose(matrix);
  return reverseRows(transposedMatrix);
};

export const rotateMatrixFromDirection = <T>(matrix: T[][], direction: Direction): T[][] => {
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

export const rotateMatrixToDirection = <T>(matrix: T[][], direction: Direction): T[][] => {
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
