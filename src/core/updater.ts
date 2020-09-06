import { CellType, GameCell } from '../types';

export const removeAndIncreaseCells = (cells: GameCell[]): GameCell[] => cells
  .filter((cell) => cell.state !== CellType.DYING)
  .map((cell) => {
    const processedCell = cell;
    if (processedCell.state === CellType.INCREASE) {
      processedCell.value *= 2;
    }

    processedCell.state = CellType.IDLE;

    return processedCell;
  });
