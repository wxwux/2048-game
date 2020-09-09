import { cloneDeep } from 'lodash';
import { Direction, MatrixCell, MoveCellsFunction } from '../types';
import { MATRIX_SIZE } from './constants';

export const traverseMatrix = <T extends MatrixCell>(
  matrixToTraverse: T[][], cb: MoveCellsFunction,
): T[][] => {
  let matrix = cloneDeep(matrixToTraverse);

  for (let y = 0; y < MATRIX_SIZE; y++) {
    for (let x = 0; x < MATRIX_SIZE; x++) {
      matrix = cb(matrix, x, y);
    }
  }

  return matrix;
};

export const reverseRows = <T>(matrix: T[][]): T[][] => {
  const clonedMatrix: T[][] = cloneDeep<T[][]>(matrix);
  const n: number = clonedMatrix[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j % 2 === 0) {
        const temp: T = clonedMatrix[i][n - j - 1];
        clonedMatrix[i][n - j - 1] = clonedMatrix[i][j];
        clonedMatrix[i][j] = temp;
      }
    }
  }

  return clonedMatrix;
};

export const transpose = <T>(matrix: T[][]): T[][] => {
  const clonedMatrix: T[][] = cloneDeep<T[][]>(matrix);
  const n: number = clonedMatrix[0].length;

  for (let i = 0, j = 0; i < n; i++) {
    j = i;
    while (j < n) {
      if (i !== j) {
        const temp: T = clonedMatrix[i][j];
        clonedMatrix[i][j] = clonedMatrix[j][i];
        clonedMatrix[j][i] = temp;
      }
      j++;
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
