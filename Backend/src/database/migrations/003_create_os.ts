import Knex from "knex";
export async function up(knex: Knex) {
  return knex.schema.createTable("os", (table) => {
    table.increments("id").primary().unique();
    table.integer("numero_os").notNullable().unique();
    table.integer("id_cliente").notNullable().references("cliente.id");
    table.string("nome_equipamento");
    table.string("marca");
    table.string("modelo");
    table.string("numero_serie");
    table.text("condicoes");
    table.text("defeitos");
    table.text("acessorios");
    table.text("solucao");
    table.text("laudo_tecnico");
    table.text("termo_garantia");
    table.text("observacoes");
    table.date("data_entrada").notNullable();
    table.date("data_saida");
    table.decimal("valor");
    table.string("status").notNullable();
    table.string("forma_pagamento").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("os");
}
