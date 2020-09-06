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
