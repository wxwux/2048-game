import { create } from '../creator';
import { CellType } from '../../types';
import { removeAndIncreaseCells, scoresGatherer } from '../updater';

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
          id: 'test', x, y, value: curCell.value, state: curCell.state,
        });
      }
    }
  }

  return finalMatrix;
};

const generateCellsArray = (matrix: any[][]): any[] => {
  const cellsArray = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix.length; x++) {
      const curCell = matrix[y][x];
      if (curCell !== 0) {
        cellsArray.push(create({
          id: 'test', x, y, value: curCell.value, state: curCell.state,
        }));
      }
    }
  }

  return cellsArray;
};

it('update cells and returns scoress', () => {
  let cellsArray = generateCellsArray(constructRealMatrix([
    [{ value: 2, state: CellType.DYING }, 0, 0, 0],
    [0, { value: 2, state: CellType.DYING }, 0, 0],
    [0, 0, { value: 2, state: CellType.INCREASE }, 0],
    [0, 0, 0, 0],
  ]));

  let [resultCells, scores] = removeAndIncreaseCells(cellsArray);

  expect(resultCells.length).toBe(1);
  expect(resultCells[0].value).toBe(4);
  expect(scores).toBe(4);

  cellsArray = generateCellsArray(constructRealMatrix([
    [0, 0, 0, 0],
    [0, { value: 4, state: CellType.INCREASE }, 0, 0],
    [0, 0, { value: 2, state: CellType.INCREASE }, 0],
    [0, 0, 0, 0],
  ]));

  [resultCells, scores] = removeAndIncreaseCells(cellsArray);

  expect(resultCells.length).toBe(2);
  expect(resultCells[0].value).toBe(8);
  expect(resultCells[1].value).toBe(4);
  expect(scores).toBe(12);
});

it('calculates scores correctly', () => {
  const calculator = scoresGatherer();

  expect(calculator(2)).toBe(2);
  expect(calculator(4)).toBe(6);
});
