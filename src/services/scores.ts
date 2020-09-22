export const scoresService = {
  save(number: number): void {
    localStorage.setItem('scores', number.toString());
  },
  get() {
    const scores = localStorage.getItem('scores');
    if (!scores) return 0;

    return Number(scores);
  },
};
