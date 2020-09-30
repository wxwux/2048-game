import {
  generateCheckSumByCoords, reverseRows,
  rotateMatrix, rotateMatrixFromDirection,
  rotateMatrixToDirection, transpose, traverseMatrix,
} from '../matrix';
import { Direction } from '../../types';

const originalMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

describe('checksum generation', () => {
  it('generates proper checksum for cell', () => {
    const generatedSum = generateCheckSumByCoords(2, 3);

    const checkSum1 = generateCheckSumByCoords(0, 1);
    const checkSum2 = generateCheckSumByCoords(1, 0);

    expect(generatedSum).toEqual(11);
    expect(checkSum1 === checkSum2).toBe(false);
  });
});

describe('matrix traversal', () => {
  it('evaluates function for each matrix cell', () => {
    const mockFn = jest.fn();
    const newMatrix = traverseMatrix(originalMatrix, mockFn);

    expect(mockFn.mock.calls.length).toEqual(originalMatrix.length ** 2);
  });

  it('transforms matrix while traversing', () => {
    let i = 1;
    const mockMatrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const mockFn = jest.fn((traversingMatrix) => {
      traversingMatrix[0][3] = i;
      i++;
      return traversingMatrix;
    });

    const newMatrix = traverseMatrix(mockMatrix, mockFn);

    expect(newMatrix[0][3]).toEqual(16);
  });

  it('calls callback with the correct arguments', () => {
    const mockMatrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const mockFn = jest.fn();

    mockFn.mockReturnValue(mockMatrix);
    const newMatrix = traverseMatrix(mockMatrix, mockFn);
    const x = 3;
    const y = 0;

    expect(mockFn.mock.calls[3][0]).toEqual(mockMatrix);
    expect(mockFn.mock.calls[3][1]).toEqual(x);
    expect(mockFn.mock.calls[3][2]).toEqual(y);
  });

  it('stops loop when breakFunction had been called', () => {
    let i = 0;
    const mockFn = jest.fn((innerMatrix, x, y, breakFunction) => {
      if (i === 6) {
        breakFunction();
      }
      i++;
      return innerMatrix;
    });

    const newMatrix = traverseMatrix(originalMatrix, mockFn);

    expect(mockFn.mock.calls.length).toBe(7);
  });
});

describe('matrix rotation', () => {
  it('rotates matrix', () => {
    const rotatedMatrix = rotateMatrix(originalMatrix);
    const result = [
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ];
    expect(rotatedMatrix).toEqual(result);
  });

  it('reverses rows', () => {
    const reversedRowsMatrix = reverseRows(originalMatrix);
    const result = [
      [4, 3, 2, 1],
      [8, 7, 6, 5],
      [12, 11, 10, 9],
      [16, 15, 14, 13],
    ];

    expect(reversedRowsMatrix).toEqual(result);
  });

  it('transposes matrix', () => {
    const transposedMatrix = transpose(originalMatrix);
    const result = [
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12, 16],

    ];

    expect(transposedMatrix).toEqual(result);
  });

  it('rotates matrix to direction', () => {
    const rotatedDown = rotateMatrixToDirection(originalMatrix, Direction.DOWN);
    const rotatedUp = rotateMatrixToDirection(originalMatrix, Direction.UP);
    const rotatedLeft = rotateMatrixToDirection(originalMatrix, Direction.LEFT);
    const rotatedRight = rotateMatrixToDirection(originalMatrix, Direction.RIGHT);

    const resultRotatedDown = [
      [16, 15, 14, 13],
      [12, 11, 10, 9],
      [8, 7, 6, 5],
      [4, 3, 2, 1],
    ];

    const resultRotatedLeft = [
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ];

    const resultRotatedRight = [
      [4, 8, 12, 16],
      [3, 7, 11, 15],
      [2, 6, 10, 14],
      [1, 5, 9, 13],

    ];

    expect(rotatedDown).toEqual(resultRotatedDown);
    expect(rotatedUp).toEqual(originalMatrix);
    expect(rotatedRight).toEqual(resultRotatedRight);
    expect(rotatedLeft).toEqual(resultRotatedLeft);
  });

  it('rotates back to the original position', () => {
    const rotatedFromLeft = rotateMatrixFromDirection(
      rotateMatrixToDirection(originalMatrix, Direction.LEFT), Direction.LEFT,
    );
    const rotatedFromRight = rotateMatrixFromDirection(
      rotateMatrixToDirection(originalMatrix, Direction.RIGHT), Direction.RIGHT,
    );
    const rotatedFromUp = rotateMatrixFromDirection(
      rotateMatrixToDirection(originalMatrix, Direction.UP), Direction.UP,
    );
    const rotatedFromDown = rotateMatrixFromDirection(
      rotateMatrixToDirection(originalMatrix, Direction.DOWN), Direction.DOWN,
    );

    expect(rotatedFromLeft).toEqual(originalMatrix);
    expect(rotatedFromRight).toEqual(originalMatrix);
    expect(rotatedFromUp).toEqual(originalMatrix);
    expect(rotatedFromDown).toEqual(originalMatrix);
  });
});
