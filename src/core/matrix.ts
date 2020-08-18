export const copyMatrix = <T>(matrix: T[][]) : T[][] => matrix.map((row: T[]) => row.slice());

export const transpose = <T>(matrix: T[][]): T[][] => {
  const clonedMatrix: T[][] = copyMatrix(matrix);
  const n: number = clonedMatrix[0].length;

  for (let i = 0, j = 0; i < n; i++) {
    j = i;
    while (j < n) {
      if (i !== j) {
        const temp: T = clonedMatrix[i][j];
        clonedMatrix[i][j] = clonedMatrix[j][i];
        clonedMatrix[j][i] = temp;
      }
      j++;
    }
  }

  return clonedMatrix;
};

export const reverseRows = <T>(matrix: T[][]): T[][] => {
  const clonedMatrix: T[][] = copyMatrix(matrix);
  const n: number = clonedMatrix[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (j % 2 === 0) {
        const temp: T = clonedMatrix[i][n - j - 1];
        clonedMatrix[i][n - j - 1] = clonedMatrix[i][j];
        clonedMatrix[i][j] = temp;
      }
    }
  }

  return clonedMatrix;
};

const rotateMatrix = <T>(matrix: T[][]): T[][] => {
  const transposedMatrix: T[][] = transpose(matrix);
  return reverseRows(transposedMatrix);
};

export default rotateMatrix;
