export const toMoney = (value: number | string) => {
  return typeof value === "number"
    ? `R$ ${value.toFixed(2).toString().replace(".", ",")}`
    : value;
};
