import { uniqueId } from 'lodash';
import { CellType, GameCell } from '../types';

const create = (cell: GameCell): GameCell => ({
  x: cell.x,
  y: cell.y,
  id: cell.id ? cell.id : uniqueId(),
  value: cell.value,
  state: CellType.IDLE,
  by: null,
});

export default create;
