export const scoreService = {
  save(number: number): void {
    localStorage.setItem('score', number.toString());
  },
  get(): number {
    const score = localStorage.getItem('score');
    if (!score) return 0;

    return Number(score);
  },
};
