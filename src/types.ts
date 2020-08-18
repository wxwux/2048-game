export enum CellType {
  IDLE,
  MOVING,
  DYING,
  INCREASE
}

export type GameCell = {
  id?: string;
  x: number;
  y: number;
  value: number;
  state? : CellType
}
