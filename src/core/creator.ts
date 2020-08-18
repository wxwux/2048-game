import { uniqueId } from 'lodash';
import { GameCell, CellType } from '../types';

const create = (cell: GameCell): GameCell => ({
  x: cell.x,
  y: cell.y,
  id: cell.id ? cell.id : uniqueId(),
  value: cell.value,
  state: CellType.IDLE,
});

export default create;
