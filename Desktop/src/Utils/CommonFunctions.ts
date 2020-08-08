export const justNumbers = (value: string) => {
  return value.toString().replace(/[^0-9]+/g, "");
};

export const numbersAndPeriod = (value: string) => {
  return value
    .toString()
    .replace(/[,]+/g, ".")
    .replace(/[^0-9.]+/g, "");
};

export const toMoney = (value: number | string) => {
  return typeof value === "number"
    ? `R$ ${value.toFixed(2).toString().replace(".", ",")}`
    : value;
};

export const getCurrentISODate = (date: Date = new Date()) => {
  let current_date = String(date.getDate()),
    current_month = String(date.getMonth() + 1),
    current_year = String(date.getFullYear()),
    current_hrs = String(date.getHours()),
    current_mins = String(date.getMinutes()),
    current_secs = String(date.getSeconds()),
    current_datetime;

  // Add 0 before date, month, hrs, mins or secs if they are less than 0
  current_date =
    Number(current_date) < 10 ? "0" + current_date : String(current_date);
  current_month =
    Number(current_month) < 10 ? "0" + current_month : String(current_month);
  current_hrs =
    Number(current_hrs) < 10 ? "0" + current_hrs : String(current_hrs);
  current_mins =
    Number(current_mins) < 10 ? "0" + current_mins : String(current_mins);
  current_secs =
    Number(current_secs) < 10 ? "0" + current_secs : String(current_secs);

  // Current datetime
  // String such as 2016-07-16T19:20:30
  current_datetime =
    current_year +
    "-" +
    current_month +
    "-" +
    current_date +
    "T" +
    current_hrs +
    ":" +
    current_mins +
    ":" +
    current_secs;
  return current_datetime;
};
