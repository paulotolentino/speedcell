import Knex from "knex";
export async function up(knex: Knex) {
  return knex.schema.createTable("estoque", (table) => {
    table.increments("id").primary().unique();
    table.integer("id_produto").notNullable().unique().references("produto.id");
    table.integer("quantidade").notNullable();
    table.date("data_modificacao").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("estoque");
}
