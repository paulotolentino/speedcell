import Knex from "knex";
export async function up(knex: Knex) {
  return knex.schema.createTable("produto_venda", (table) => {
    table.increments("id").primary();
    table.integer("id_produto").notNullable().references("produto.id");
    table.integer("id_venda").notNullable().references("venda.id");
    table.decimal("preco_dia").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("produto_venda");
}
