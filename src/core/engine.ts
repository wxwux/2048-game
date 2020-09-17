import { cloneDeep } from 'lodash';

import {
  CellCoords, CellType, Direction, GameCell, Matrix, MatrixCell, MoveCellsFunction,
} from '../types';

import {
  rotateMatrixFromDirection,
  rotateMatrixToDirection,
  traverseMatrix,
} from './matrix';

import { buildMatrixBasedOnCells } from './creator';

export const cellIsEmpty = (cell: MatrixCell): boolean => cell === 0;

export const cellsValuesAreSame = (
  prevCell: MatrixCell,
  currentCell: MatrixCell,
): boolean => (
  (prevCell as GameCell).value === (currentCell as GameCell).value
);

export const cellIsInIdleState = (
  cell: MatrixCell,
): boolean => (cell as GameCell).state === CellType.IDLE
  || (cell as GameCell).state === CellType.BORN;

export const cellIsInMovingState = (
  cell: MatrixCell,
): boolean => (cell as GameCell).state === CellType.MOVING;

export const substituteCellUpInMatrix = (
  originalMatrix: Matrix,
  currentCell: CellCoords,
  substitutedCell: CellCoords,
): Matrix => {
  const matrix = cloneDeep(originalMatrix);

  matrix[substitutedCell.y][substitutedCell.x] = matrix[currentCell.y][currentCell.x];
  (matrix[currentCell.y][currentCell.x] as GameCell).state = CellType.MOVING;
  (matrix[currentCell.y][currentCell.x] as 0) = 0;

  return matrix;
};

export const suppressCellUpInMatrix = (
  originalMatrix: Matrix,
  currentCell: CellCoords,
  suppressedCell: CellCoords,
): Matrix => {
  const matrix = cloneDeep(originalMatrix);

  (matrix[suppressedCell.y][suppressedCell.x] as GameCell).state = CellType.DYING;
  (matrix[currentCell.y][currentCell.x] as GameCell).state = CellType.INCREASE;

  matrix[suppressedCell.y][suppressedCell.x] = matrix[currentCell.y][currentCell.x];
  (matrix[currentCell.y][currentCell.x] as number) = 0;

  return matrix;
};

export const moveCells: MoveCellsFunction = (
  matrixToTransform, x, y,
) => {
  if (matrixToTransform[y][x] === 0) return matrixToTransform;

  let matrix = cloneDeep(matrixToTransform);
  let currentRowY = y;
  let prevRowY = y - 1;

  while (prevRowY >= 0) {
    const currentCell = matrix[currentRowY][x];
    const cellAbove = matrix[prevRowY][x];

    if (cellIsEmpty(cellAbove)) {
      matrix = substituteCellUpInMatrix(
        matrix, { x, y: currentRowY }, { x, y: prevRowY },
      );
    }

    if (
      cellsValuesAreSame(cellAbove, currentCell)
      && (cellIsInIdleState(cellAbove) || cellIsInMovingState(cellAbove))
    ) {
      matrix = suppressCellUpInMatrix(
        matrix, { x, y: currentRowY }, { x, y: prevRowY },
      );
    }

    currentRowY = prevRowY;
    prevRowY--;
  }

  return matrix;
};

export const updateCellsCoords: MoveCellsFunction = (
  cellsToSwap, x, y,
) => {
  if (cellsToSwap[y][x] === 0) return cellsToSwap;

  const matrix = cloneDeep(cellsToSwap);
  (matrix[y][x] as GameCell).y = y;
  (matrix[y][x] as GameCell).x = x;

  return matrix;
};

export const moveCellsToDirection = (
  cellsToMove: GameCell[], direction: Direction,
): GameCell[] => {
  const cells: GameCell[] = cloneDeep<GameCell[]>(cellsToMove);
  const matrixWithCells = buildMatrixBasedOnCells(cells);

  const rotatedMatrix = rotateMatrixFromDirection<MatrixCell>(matrixWithCells, direction);
  const transformedMatrix = traverseMatrix<MatrixCell>(rotatedMatrix, moveCells);
  const rotatedBackMatrix = rotateMatrixToDirection<MatrixCell>(transformedMatrix, direction);
  const finalMatrix = traverseMatrix<MatrixCell>(rotatedBackMatrix, updateCellsCoords);

  return finalMatrix.flat(2).filter((cell: MatrixCell) => cell !== 0);
};

export const checkAvailableMoves = (cells: GameCell[]): boolean => {
  const matrix = buildMatrixBasedOnCells(cells);


  console.log(matrix);
  return true;
};
