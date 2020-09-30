import { cloneDeep } from 'lodash';
import {
  CellCoords, CellType, Direction, GameCell, Matrix, MatrixCell, MoveCellsFunction,
} from '../types';

import {
  rotateMatrixFromDirection,
  rotateMatrixToDirection,
  traverseMatrix,
} from './matrix';

import { buildMatrixWithCells } from './creator';
import { MATRIX_SIZE } from './constants';

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
  cellsToUpdate, x, y,
) => {
  if (cellsToUpdate[y][x] === 0) return cellsToUpdate;

  const matrix = cloneDeep(cellsToUpdate);
  (matrix[y][x] as GameCell).y = y;
  (matrix[y][x] as GameCell).x = x;

  return matrix;
};

export const moveCellsToDirection = (
  cellsToMove: GameCell[], direction: Direction,
): GameCell[] => {
  const cells: GameCell[] = cloneDeep<GameCell[]>(cellsToMove);
  const matrixWithCells = buildMatrixWithCells(cells);

  const rotatedMatrix = rotateMatrixFromDirection<MatrixCell>(matrixWithCells, direction);
  const transformedMatrix = traverseMatrix<MatrixCell>(rotatedMatrix, moveCells);
  const rotatedBackMatrix = rotateMatrixToDirection<MatrixCell>(transformedMatrix, direction);
  const finalMatrix = traverseMatrix<MatrixCell>(rotatedBackMatrix, updateCellsCoords);

  return finalMatrix.flat(2).filter((cell: MatrixCell) => cell !== 0);
};

export const isEmptyCellsExist = (occupiedCells: GameCell[]) : boolean => {
  const availableCells = MATRIX_SIZE ** 2;
  return occupiedCells.length < availableCells;
};

export const getNeighbourCells = (
  matrix: Matrix, currentX: number, currentY: number,
): GameCell[] => {
  let aboveCell: MatrixCell = 0;
  let belowCell: MatrixCell = 0;
  let nextCell: MatrixCell = 0;
  let prevCell: MatrixCell = 0;

  const aboveCellY = currentY - 1;
  const belowCellY = currentY + 1;
  const nextCellX = currentX + 1;
  const prevCellX = currentX - 1;

  if (aboveCellY >= 0) {
    aboveCell = matrix[aboveCellY][currentX];
  }

  if (belowCellY < MATRIX_SIZE - 1) {
    belowCell = matrix[belowCellY][currentX];
  }

  if (prevCellX >= 0) {
    prevCell = matrix[currentY][prevCellX];
  }

  if (nextCellX < MATRIX_SIZE) {
    nextCell = matrix[currentY][nextCellX];
  }

  return [aboveCell, belowCell, nextCell, prevCell].filter(
    (cell) => cell !== 0,
  ) as GameCell[];
};

export const checkCellsValuesAreSame = (
  currentCell: GameCell, neighbourCells: GameCell[],
): boolean => {
  const values = new Set<number>();

  neighbourCells.forEach((cell) => {
    const cellValue: number = cell.value;
    values.add(cellValue);
  });

  return values.has(currentCell.value);
};

export const checkAvailableMoves = (cells: GameCell[]): boolean => {
  const matrix: Matrix = buildMatrixWithCells(cells);
  let hasAvailableMove = false;

  traverseMatrix(matrix,
    (traversedMatrix, x, y, breakLoop) => {
      const currentCell = traversedMatrix[y][x] as MatrixCell;
      if (currentCell === 0) return traversedMatrix;
      const neighbourCells = getNeighbourCells(traversedMatrix, x, y);
      const valuesAreSame = checkCellsValuesAreSame(currentCell as GameCell, neighbourCells);

      if (valuesAreSame) {
        hasAvailableMove = true;
        if (typeof breakLoop === 'function') breakLoop();
      }
      return traversedMatrix;
    });

  return hasAvailableMove;
};
