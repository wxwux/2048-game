import { cloneDeep } from 'lodash';
import {
  CellCoords, CellType, Direction, GameCell, MatrixCell, MoveCellsFunction,
} from '../types';
import { rotateMatrixFromDirection, rotateMatrixToDirection, traverseMatrix } from './matrix';
import { createEmptyMatrix } from './creator';
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

export const substituteCellUpInMatrix = <T extends MatrixCell>(
  originalMatrix: T[][],
  currentRow: CellCoords,
  prevRow: CellCoords,
): T[][] => {
  const matrix = cloneDeep(originalMatrix);

  (matrix[currentRow.y][currentRow.x] as GameCell).state = CellType.MOVING;
  matrix[prevRow.y][prevRow.x] = matrix[currentRow.y][currentRow.x];
  (matrix[currentRow.y][currentRow.x] as 0) = 0;

  return matrix;
};

export const suppressCellUpInMatrix = <T extends MatrixCell>(
  originalMatrix: T[][],
  currentRow: CellCoords,
  prevRow: CellCoords,
): T[][] => {
  const matrix = cloneDeep(originalMatrix);

  (matrix[currentRow.y][currentRow.x] as GameCell).state = CellType.DYING;

  if ('by' in (matrix[currentRow.y][currentRow.x] as GameCell)) {
    (matrix[prevRow.y][prevRow.x] as GameCell).by = matrix[currentRow.y][currentRow.x] as GameCell;
  }

  (matrix[prevRow.y][prevRow.x] as GameCell).state = CellType.INCREASE;
  // matrix[prevRow.y][prevRow.x] = matrix[currentRow.y][currentRow.x];
  // (matrix[currentRow.y][currentRow.x] as number) = 0;

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

      currentRowY = prevRowY;
    } else if (
      cellsValuesAreSame(cellAbove, currentCell)
      && (
        cellIsInIdleState(cellAbove)
        || cellIsInMovingState(cellAbove)
      )
    ) {
      matrix = suppressCellUpInMatrix(
        matrix, { x, y: currentRowY }, { x, y: prevRowY },
      );

      // TODO: поправить баг со сложением 3ёх клеток

      currentRowY = prevRowY;
    } else {
      break;
    }

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

export const getNewCellsPosition = (
  cellsToMove: GameCell[], direction: Direction,
): GameCell[] => {
  const cells: GameCell[] = cloneDeep<GameCell[]>(cellsToMove);
  const emptyMatrix = createEmptyMatrix(MATRIX_SIZE);

  cells.forEach((cell: GameCell) => {
    emptyMatrix[cell.y][cell.x] = cell;
  });

  const rotatedMatrix = rotateMatrixFromDirection<MatrixCell>(emptyMatrix, direction);
  const transformedMatrix = traverseMatrix<MatrixCell>(rotatedMatrix, moveCells);
  const rotatedBackMatrix = rotateMatrixToDirection<MatrixCell>(transformedMatrix, direction);
  const finalMatrix = traverseMatrix(rotatedBackMatrix, updateCellsCoords);

  console.log(finalMatrix);

  return finalMatrix.flat(2).filter((cell: MatrixCell) => cell !== 0);
};
