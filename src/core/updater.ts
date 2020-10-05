import { CellType, GameCell } from '../types';

export const isGoingToDie = (cell: GameCell) => cell.state === CellType.DYING;
export const needsToIncrease = (cell: GameCell) => cell.state === CellType.INCREASE;

export const scoresGatherer = (): (num: number) => number => {
  let counter = 0;
  return function increaser(num = 0): number {
    counter += num;
    return counter;
  };
};

export const removeAndIncreaseCells = (
  cells: GameCell[],
): [ GameCell[], number ] => {
  const gainScores = scoresGatherer();

  const updatedCells = cells
    .filter((cell) => !isGoingToDie(cell))
    .map((cell) => {
      if (needsToIncrease(cell)) {
        cell.value *= 2;
        gainScores(cell.value);
      }

      cell.state = CellType.IDLE;

      return cell;
    });

  return [updatedCells, gainScores(0)];
};

