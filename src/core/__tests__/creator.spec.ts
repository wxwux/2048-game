import {
  buildMatrixWithCells, collectOccupiedCellsCheckSums, create,
  createEmptyMatrix, createInitialCells, getAvailableCoords,
  getRandomCoord, populateFieldWithNewCells,
} from '../creator';
import { CellType } from '../../types';
import { MATRIX_SIZE } from '../constants';
import { generateCheckSumByCoords } from '../matrix';

it('creates cell from config', () => {
  const cellConfig = {
    x: 0,
    y: 1,
    id: 'uniqueId',
    value: 2,
    state: CellType.IDLE,
  };
  expect(create(cellConfig)).toEqual(cellConfig);
});

it('creates uniqueId if it was not passed', () => {
  const cell = create({
    x: 0,
    y: 0,
    value: 2,
    state: CellType.IDLE,
  });

  const anotherCell = create({
    x: 1,
    y: 1,
    value: 2,
    state: CellType.IDLE,
  });

  expect(cell.id).toBeTruthy();
  expect(typeof cell.id).toBe('string');
  expect(cell.id !== anotherCell.id).toBe(true);
});

it('generates random coords in available range', () => {
  const checkCoordIsInRange = (coord: number): boolean => coord >= 0 && coord < MATRIX_SIZE;

  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
  expect(checkCoordIsInRange(getRandomCoord())).toBe(true);
});

describe('initial cells', () => {
  it('generated cells have not got the same coords', () => {
    const coordsAreSame = (cells: any[]) => cells[0].x === cells[1].x && cells[0].y === cells[1].y;

    expect(coordsAreSame(createInitialCells())).toBe(false);
    expect(coordsAreSame(createInitialCells())).toBe(false);
    expect(coordsAreSame(createInitialCells())).toBe(false);
    expect(coordsAreSame(createInitialCells())).toBe(false);
    expect(coordsAreSame(createInitialCells())).toBe(false);
    expect(coordsAreSame(createInitialCells())).toBe(false);
    expect(coordsAreSame(createInitialCells())).toBe(false);
  });
});

it('creates empty matrix', () => {
  const matrix = createEmptyMatrix(4);
  const result = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  expect(matrix).toEqual(result);
});

it('creates matrix with cells', () => {
  const cellOne = create({
    x: 1, y: 1, value: 2, id: 'one', state: CellType.IDLE,
  });
  const cellTwo = create({
    x: 2, y: 2, value: 2, id: 'two', state: CellType.IDLE,
  });

  const builtMatrix = buildMatrixWithCells([cellOne, cellTwo]);

  const resultMatrix = [
    [0, 0, 0, 0],
    [0, cellOne, 0, 0],
    [0, 0, cellTwo, 0],
    [0, 0, 0, 0],
  ];

  expect(builtMatrix).toEqual(resultMatrix);
});

describe('finding available cells', () => {
  const buildOccupiedCellsArray = (processedMatrix: string | any[]) => {
    const cells = [];
    for (let y = 0; y < processedMatrix.length; y++) {
      for (let x = 0; x < processedMatrix.length; x++) {
        const currentCell = processedMatrix[y][x];
        if (currentCell !== 'x') {
          cells.push(create({
            x, y, value: currentCell, state: CellType.IDLE,
          }));
        }
      }
    }

    return cells;
  };

  const getCheckSumsArrForMatrix = (matrixToProcess: string | any[]) => {
    const occupiedCells = buildOccupiedCellsArray(matrixToProcess);
    return collectOccupiedCellsCheckSums(occupiedCells);
  };

  it('collects checksums without en empty cell sum', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 'x', 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    expect(getCheckSumsArrForMatrix(matrix)).not.toContain(generateCheckSumByCoords(2, 1));
  });

  it('finds available coords', () => {
    const cellTwoOne = [
      [1, 2, 3, 4],
      [5, 6, 'x', 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];

    const cellTwoThree = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 'x', 16],
    ];

    const multipleEmptyCells = [
      [1, 2, 3, 'x'],
      [5, 'x', 7, 8],
      [9, 10, 11, 12],
      [13, 14, 'x', 16],
    ];

    expect(getAvailableCoords(getCheckSumsArrForMatrix(cellTwoOne))).toEqual([2, 1]);
    expect(getAvailableCoords(getCheckSumsArrForMatrix(cellTwoThree))).toEqual([2, 3]);
    expect([[3, 0], [1, 1], [2, 3]]).toEqual(
      expect.arrayContaining([
        getAvailableCoords(getCheckSumsArrForMatrix(multipleEmptyCells)),
      ]),
    );
  });

  it('adds new cell to collection', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 'x', 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    const prevFiledState = buildOccupiedCellsArray(matrix);
    const prevCheckSums = collectOccupiedCellsCheckSums(prevFiledState);
    const newCellsCollection = populateFieldWithNewCells(prevFiledState);

    expect(prevFiledState.length).not.toEqual(newCellsCollection.length);
    expect(newCellsCollection.length).toBe(prevFiledState.length + 1);
    expect(collectOccupiedCellsCheckSums(newCellsCollection).size).toBe(prevCheckSums.size + 1);
  });
});
