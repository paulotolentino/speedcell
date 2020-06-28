import Knex from "knex";
export async function up(knex: Knex) {
  return knex.schema.createTable("produto", (table) => {
    table.increments("id").primary().unique();
    table.string("codigo_barras").notNullable().unique();
    table.string("nome").notNullable();
    table.decimal("preco_compra").notNullable();
    table.decimal("preco_venda").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("produto");
}
