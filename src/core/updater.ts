import { CellType, GameCell } from '../types';

export const removeAndIncreaseCells = (
  cells: GameCell[],
): [ GameCell[], number ] => {
  const gainedScores: number[] = [];

  const updatedCells = cells
    .filter((cell) => cell.state !== CellType.DYING)
    .map((cell) => {
      if (cell.state === CellType.INCREASE) {
        cell.value *= 2;
        gainedScores.push(cell.value);
      }

      cell.state = CellType.IDLE;

      return cell;
    });

  const gainedScoreSum = gainedScores.reduce((acc, score) => acc + score, 0);

  return [updatedCells, gainedScoreSum];
};
