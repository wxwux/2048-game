import { CellType, GameCell } from '../types';

export const removeAndIncreaseCells = (
  cells: GameCell[],
): [ GameCell[], number ] => {
  const gainedScores: number[] = [];

  const updatedCells = cells
    .filter((cell) => cell.state !== CellType.DYING)
    .map((cell) => {
      const processedCell = cell;

      if (processedCell.state === CellType.INCREASE) {
        processedCell.value *= 2;
        gainedScores.push(processedCell.value);
      }

      processedCell.state = CellType.IDLE;

      return processedCell;
    });

  const gainedScoreSum = gainedScores.reduce((acc, scores) => acc + scores, 0);

  return [updatedCells, gainedScoreSum];
};
