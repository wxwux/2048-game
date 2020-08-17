export const calculateSaturation = (step: number): number => Math.floor(100 / 16 * step);

export const calculateLightness = (step: number): number => 100 - Math.floor(50 / 16 * step);

export const calculateBackgroundColor = (value : number) : string => {
  if (value === 0) {
    return 'transparent';
  }
  // from 0 to 16
  const step = Math.min(16, Math.log2(value));
  return `hsl(0, ${calculateSaturation(step)}%, ${calculateLightness(step)}%);`;
};

export const calcFontSize = (value: number) : number => {
  let result;
  if (value < 100) {
    result = 66;
  } else if (value < 1000) {
    result = 47;
  } else if (value < 10000) {
    result = 40;
  } else {
    result = 30;
  }

  return result;
};
