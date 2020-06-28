export const toMoney = (value: number) => {
  return `R$ ${value.toFixed(2).toString().replace(".", ",")}`;
};
