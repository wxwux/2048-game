import {
  cellIsEmpty, cellIsInIdleState, cellIsInMovingState,
  cellsValuesAreSame, checkAvailableMoves, checkCellsValuesAreSame,
  getNeighbourCells, isEmptyCellsExist, matrixAreSame,
  moveCellsToDirection, moveCellsUpInMatrix, substituteEmptyCell,
  substituteFilledCell, updateCellsCoords,
} from '../engine';
import { create } from '../creator';
import { CellType, Direction, GameCell } from '../../types';

const generateCellsArray = (matrix: any[][]): any[] => {
  const cellsArray = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      const curCell = matrix[y][x];
      if (curCell !== 0) {
        cellsArray.push(create({
          x, y, value: curCell, state: CellType.IDLE,
        }));
      }
    }
  }

  return cellsArray;
};

const constructRealMatrix = (matrix: any[][]): any[][] => {
  const finalMatrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      const curCell = matrix[y][x];
      if (curCell !== 0) {
        finalMatrix[y][x] = create({
          x, y, value: curCell, state: CellType.IDLE,
        });
      }
    }
  }

  return finalMatrix;
};

it('checks if cell is empty', () => {
  const cell = create({
    x: 0,
    y: 0,
    value: 2,
    state: CellType.IDLE,
  });

  expect(cellIsEmpty(0)).toBe(true);
  expect(cellIsEmpty(cell)).toBe(false);
});

it('checks if cells values are same', () => {
  const sameCell1 = create({
    x: 0, y: 0, value: 2, state: CellType.IDLE,
  });
  const sameCell2 = create({
    x: 0, y: 0, value: 2, state: CellType.IDLE,
  });
  const diffCell1 = create({
    x: 0, y: 0, value: 2, state: CellType.IDLE,
  });
  const diffCell2 = create({
    x: 0, y: 0, value: 4, state: CellType.IDLE,
  });

  expect(cellsValuesAreSame(sameCell1, sameCell2)).toBe(true);
  expect(cellsValuesAreSame(diffCell1, diffCell2)).toBe(false);
});

it('checks if matrix are same', () => {
  expect(matrixAreSame(generateCellsArray([
    [0, 0, 0, 0],
    [0, 4, 0, 0],
    [0, 0, 4, 0],
    [4, 0, 0, 0],
  ]), generateCellsArray([
    [0, 0, 0, 0],
    [0, 4, 0, 0],
    [0, 0, 4, 0],
    [4, 0, 0, 0],
  ]))).toBe(true);

  expect(matrixAreSame(generateCellsArray([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 4, 4],
    [4, 0, 0, 0],
  ]), generateCellsArray([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 4, 4],
    [4, 2, 0, 0],
  ]))).toBe(false);

  expect(matrixAreSame(generateCellsArray([
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 2, 4],
    [0, 0, 0, 0],
  ]), generateCellsArray([
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 4, 4],
    [0, 0, 0, 0],
  ]))).toBe(true);
});

it('checks if cell is in IDLE state or new born', () => {
  const idleCell = create({
    x: 0, y: 0, value: 2, state: CellType.IDLE,
  });
  const newBornCell = create({
    x: 0, y: 0, value: 2, state: CellType.BORN,
  });
  const otherStateCell = create({
    x: 0, y: 0, value: 2, state: CellType.DYING,
  });

  expect(cellIsInIdleState(idleCell)).toBe(true);
  expect(cellIsInIdleState(newBornCell)).toBe(true);
  expect(cellIsInIdleState(otherStateCell)).toBe(false);
});

it('check if cell is in Moving state', () => {
  const movingCell = create({
    x: 0, y: 0, value: 2, state: CellType.MOVING,
  });
  const idleCell = create({
    x: 0, y: 0, value: 2, state: CellType.IDLE,
  });

  expect(cellIsInMovingState(movingCell)).toBe(true);
  expect(cellIsInMovingState(idleCell)).toBe(false);
});

it('substitutes an empty cell with the filled one by their coords', () => {
  const createCellToTest = (x, y) => {
    const cellConfig = {
      id: 'same', x, y, value: 4,
    };
    return {
      origin: create({
        ...cellConfig, state: CellType.IDLE,
      }),
      moved: create({
        ...cellConfig, state: CellType.MOVING,
      }),
    };
  };

  const cellToTest = createCellToTest(1, 2);
  expect(substituteEmptyCell(
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, cellToTest.origin, 0, 0],
      [0, 0, 0, 0],
    ], { x: cellToTest.origin.x, y: cellToTest.origin.y },
    { x: cellToTest.origin.x, y: cellToTest.origin.y - 1 },
  )).toEqual([
    [0, 0, 0, 0],
    [0, cellToTest.moved, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});

it('substitutes one cell with another by their coords', () => {
  const cellOne = create({
    x: 1, y: 1, value: 2, state: CellType.IDLE,
  });
  const cellTwo = create({
    x: 1, y: 2, value: 2, state: CellType.IDLE,
  });

  const matrix = [
    [0, 0, 0, 0],
    [0, cellOne, 0, 0],
    [0, cellTwo, 0, 0],
    [0, 0, 0, 0],
  ];

  expect(substituteFilledCell(
    matrix,
    { x: cellTwo.x, y: cellTwo.y },
    { x: cellOne.x, y: cellOne.y },
  )).toEqual([
    [0, 0, 0, 0],
    [0, { ...cellTwo, state: CellType.INCREASE }, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});

it('updates coordinates correctly', () => {
  const cellWithWrongCoordinates = create({
    x: 3, y: 2, value: 2, state: CellType.IDLE,
  });

  const matrix = [
    [0, 0, 0, cellWithWrongCoordinates],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const updatedMatrix = updateCellsCoords(matrix, 3, 0);

  expect((updatedMatrix[0][3] as GameCell).x).toBe(3);
  expect((updatedMatrix[0][3] as GameCell).y).toBe(0);
});

it('moves cells correctly', () => {
  const cell = create({
    x: 2, y: 2, value: 2, state: CellType.IDLE,
  });

  const anotherCell = create({
    x: 2, y: 0, value: 2, state: CellType.IDLE,
  });

  expect(moveCellsUpInMatrix(
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, cell, 0],
      [0, 0, 0, 0],
    ], cell.x, cell.y,
  )).toEqual([
    [0, 0, { ...cell, state: CellType.MOVING }, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);

  expect(moveCellsUpInMatrix(
    [
      [0, 0, anotherCell, 0],
      [0, 0, 0, 0],
      [0, 0, cell, 0],
      [0, 0, 0, 0],
    ], cell.x, cell.y,
  )).toEqual([
    [0, 0, { ...cell, state: CellType.INCREASE }, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});

describe('moving cells to direction', () => {
  test('right with increasing', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 0],
      [0, 0, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.RIGHT);

    expect(movedCellsArray[0].x).toEqual(3);
    expect(movedCellsArray[0].y).toEqual(1);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.INCREASE);
  });

  test('right with empties', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.RIGHT);

    expect(movedCellsArray.length).toEqual(2);

    expect(movedCellsArray[0].x).toEqual(3);
    expect(movedCellsArray[0].y).toEqual(1);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.MOVING);

    expect(movedCellsArray[1].x).toEqual(3);
    expect(movedCellsArray[1].y).toEqual(3);
    expect(movedCellsArray[1].value).toEqual(2);
    expect(movedCellsArray[1].state).toEqual(CellType.MOVING);
  });

  test('down with increasing', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.DOWN);

    expect(movedCellsArray[0].x).toEqual(2);
    expect(movedCellsArray[0].y).toEqual(3);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.INCREASE);
  });

  test('down with empties', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 2],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.DOWN);

    expect(movedCellsArray.length).toEqual(2);

    expect(movedCellsArray[0].x).toEqual(1);
    expect(movedCellsArray[0].y).toEqual(3);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.MOVING);

    expect(movedCellsArray[1].x).toEqual(3);
    expect(movedCellsArray[1].y).toEqual(3);
    expect(movedCellsArray[1].value).toEqual(2);
    expect(movedCellsArray[1].state).toEqual(CellType.MOVING);
  });

  test('left with increasing', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 0],
      [0, 2, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.LEFT);

    expect(movedCellsArray[0].x).toEqual(0);
    expect(movedCellsArray[0].y).toEqual(1);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.INCREASE);
  });

  test('left with empties', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.LEFT);

    expect(movedCellsArray.length).toEqual(2);

    expect(movedCellsArray[0].x).toEqual(0);
    expect(movedCellsArray[0].y).toEqual(1);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.MOVING);

    expect(movedCellsArray[1].x).toEqual(0);
    expect(movedCellsArray[1].y).toEqual(2);
    expect(movedCellsArray[1].value).toEqual(2);
    expect(movedCellsArray[1].state).toEqual(CellType.MOVING);
  });

  test('up with increasing', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.UP);

    expect(movedCellsArray[0].x).toEqual(3);
    expect(movedCellsArray[0].y).toEqual(0);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.INCREASE);
  });

  test('up with empties', () => {
    const cells = generateCellsArray([
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 0],
    ]);

    const movedCellsArray = moveCellsToDirection(cells, Direction.UP);

    expect(movedCellsArray.length).toEqual(2);

    expect(movedCellsArray[0].x).toEqual(1);
    expect(movedCellsArray[0].y).toEqual(0);
    expect(movedCellsArray[0].value).toEqual(2);
    expect(movedCellsArray[0].state).toEqual(CellType.MOVING);

    expect(movedCellsArray[1].x).toEqual(3);
    expect(movedCellsArray[1].y).toEqual(0);
    expect(movedCellsArray[1].value).toEqual(2);
    expect(movedCellsArray[1].state).toEqual(CellType.MOVING);
  });
});

it('checks if empty cells exist in matrix', () => {
  expect(isEmptyCellsExist(generateCellsArray([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(false);

  expect(isEmptyCellsExist(generateCellsArray([
    [0, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);

  expect(isEmptyCellsExist(generateCellsArray([
    [0, 2, 3, 0],
    [5, 6, 7, 8],
    [9, 10, 0, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);
});

it('returns neighbour cells', () => {
  const getValuesArray = (array) => array.map((cell) => cell.value);

  expect(getValuesArray(
    getNeighbourCells(constructRealMatrix([
      [0, 0, 0, 0],
      [0, 0, 5, 0],
      [0, 4, 1, 2],
      [0, 0, 3, 0],
    ]), 2, 2),
  )).toEqual([2, 3, 4, 5]);

  expect(getValuesArray(
    getNeighbourCells(constructRealMatrix([
      [0, 0, 0, 0],
      [0, 5, 0, 0],
      [4, 1, 2, 0],
      [0, 3, 0, 0],
    ]), 1, 2),
  )).toEqual([2, 3, 4, 5]);

  expect(getValuesArray(
    getNeighbourCells(constructRealMatrix([
      [1, 2, 0, 0],
      [3, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]), 0, 0),
  )).toEqual([2, 3]);

  expect(getValuesArray(
    getNeighbourCells(constructRealMatrix([
      [0, 5, 0, 0],
      [0, 0, 0, 0],
      [4, 1, 0, 2],
      [0, 0, 3, 0],
    ]), 1, 2),
  )).toEqual([4]);

  expect(getValuesArray(
    getNeighbourCells(constructRealMatrix([
      [0, 0, 5, 0],
      [4, 0, 0, 0],
      [0, 1, 0, 2],
      [0, 0, 3, 0],
    ]), 1, 2),
  )).toEqual([]);
});

it('checks current cells value is in other cells array', () => {
  expect(checkCellsValuesAreSame(create({
    x: 0, y: 0, value: 2, state: CellType.IDLE,
  }), generateCellsArray([
    [0, 0, 0, 0],
    [0, 1, 2, 0],
    [0, 0, 3, 4],
    [0, 0, 0, 0],
  ]))).toBe(true);

  expect(checkCellsValuesAreSame(create({
    x: 0, y: 0, value: 6, state: CellType.IDLE,
  }), generateCellsArray([
    [0, 0, 0, 0],
    [0, 1, 2, 0],
    [0, 0, 3, 4],
    [0, 0, 0, 0],
  ]))).toBe(false);
});

it('checks available moves', () => {
  expect(checkAvailableMoves(generateCellsArray([
    [1, 2, 3, 4],
    [5, 6, 66, 66],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);

  expect(checkAvailableMoves(generateCellsArray([
    [1, 2, 3, 4],
    [5, 6, 66, 8],
    [9, 10, 66, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);

  expect(checkAvailableMoves(generateCellsArray([
    [1, 2, 3, 4],
    [5, 66, 66, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);

  expect(checkAvailableMoves(generateCellsArray([
    [1, 2, 66, 4],
    [5, 6, 66, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);

  expect(checkAvailableMoves(generateCellsArray([
    [66, 66, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(true);

  expect(checkAvailableMoves(generateCellsArray([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(false);

  expect(checkAvailableMoves(generateCellsArray([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 66, 11, 66],
    [13, 14, 15, 16],
  ]))).toBe(false);

  expect(checkAvailableMoves(generateCellsArray([
    [1, 66, 3, 4],
    [5, 6, 7, 8],
    [9, 66, 11, 12],
    [13, 14, 15, 16],
  ]))).toBe(false);
});
