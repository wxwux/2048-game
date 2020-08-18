import rotateMatrix, { reverseRows, transpose } from '../matrix';

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

it('rotates matrix', () => {
  const inner = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];

  const rotatedMatrix = rotateMatrix(inner);
  const result = [
    [13, 9, 5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [16, 12, 8, 4],
  ];
  expect(rotatedMatrix).toEqual(result);
});

it('reverses rows', () => {
  const reversedRowsMatrix = reverseRows(matrix);
  const result = [
    [4, 3, 2, 1],
    [8, 7, 6, 5],
    [12, 11, 10, 9],
    [16, 15, 14, 13],
  ];

  expect(reversedRowsMatrix).toEqual(result);
});

it('transposes matrix', () => {
  const transposedMatrix = transpose(matrix);
  const result = [
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [4, 8, 12, 16],

  ];

  expect(transposedMatrix).toEqual(result);
});
