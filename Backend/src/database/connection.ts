import path from "path";
import knex from "knex";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "./speedCell.sqlite"),
  },
});

export default connection;
