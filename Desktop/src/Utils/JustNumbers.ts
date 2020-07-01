export const justNumbers = (value: string) => {
  return value.toString().replace(/[^0-9]+/g, "");
};

export const numbersAndPeriod = (value: string) => {
  return value
    .toString()
    .replace(/[,]+/g, ".")
    .replace(/[^0-9.]+/g, "");
};
