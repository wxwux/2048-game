export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum CellType {
  IDLE = 'IDLE',
  MOVING = 'MOVING',
  DYING = 'DYING',
  INCREASE = 'INCREASE'
}

export type GameCell = {
  id?: string;
  x: number;
  y: number;
  value: number;
  state? : CellType;
  by?: GameCell | null;
}

export type MatrixCell = GameCell | 0;

export type CellCoords = {
  x: number;
  y: number;
}


export type MoveCellsFunction =
    <T extends MatrixCell >(matrixToTransform: T[][], x: number, y: number) => T[][];


