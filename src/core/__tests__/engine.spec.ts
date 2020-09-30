// import { Direction, moveCells } from '../engine';
// import { CellType, GameCell } from '../../types';
// import createCell from '../creator';
//
// const finalPositions: {
//   [key: string ] : GameCell
// } = {
//   [Direction.UP]: {
//     x: 1,
//     y: 0,
//     value: 2,
//     id: 'test',
//     state: CellType.MOVING,
//   },
//   [Direction.DOWN]: {
//     x: 1,
//     y: 3,
//     value: 2,
//     id: 'test',
//     state: CellType.MOVING,
//   },
//   [Direction.LEFT]: {
//     x: 0,
//     y: 1,
//     value: 2,
//     id: 'test',
//     state: CellType.MOVING,
//   },
//   [Direction.RIGHT]: {
//     x: 3,
//     y: 1,
//     value: 2,
//     id: 'test',
//     state: CellType.MOVING,
//   },
// };
//
// Object.keys(Direction).forEach((direction) => {
//   describe(`moving ${direction}`, () => {
//     it('move on 3 steps', () => {
//       const initCells = [createCell({
//         x: 1, y: 1, value: 2, id: 'test',
//       })];
//
//       expect(moveCells(initCells, Direction[direction])).toEqual([
//         finalPositions[direction],
//       ]);
//     });
//   });
// });
