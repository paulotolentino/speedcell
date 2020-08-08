import Knex from "knex";
export async function up(knex: Knex) {
  return knex.schema.createTable("venda", (table) => {
    table.increments("id").primary().unique();
    table.integer("numero_venda").notNullable().unique();
    table.integer("id_cliente").notNullable().references("cliente.id");
    table.decimal("valor_desconto");
    table.date("data").notNullable();
    table.string("forma_pagamento").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("venda");
}
