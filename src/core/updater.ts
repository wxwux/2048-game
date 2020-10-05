import { CellType, GameCell } from '../types';

export const isGoingToDie = (cell: GameCell) => cell.state === CellType.DYING;
export const needsToIncrease = (cell: GameCell) => cell.state === CellType.INCREASE;

// export const scoresGatherer = (scores: number): () => number => {
// };

export const removeAndIncreaseCells = (
  cells: GameCell[],
): [ GameCell[], number ] => {
  const gainedScores: number[] = [];

  const updatedCells = cells
    .filter((cell) => !isGoingToDie(cell))
    .map((cell) => {
      if (needsToIncrease(cell)) {
        cell.value *= 2;
        gainedScores.push(cell.value);
      }

      cell.state = CellType.IDLE;

      return cell;
    });

  const gainedScoreSum = gainedScores.reduce((acc, score) => acc + score, 0);

  return [updatedCells, gainedScoreSum];
};
