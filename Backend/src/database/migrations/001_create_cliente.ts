import Knex from "knex";
export async function up(knex: Knex) {
  return knex.schema.createTable("cliente", (table) => {
    table.increments("id").primary().unique();
    table.string("nome").notNullable();
    table.integer("cpf", 11).notNullable().unique();
    table.integer("cep", 8).notNullable();
    table.string("logradouro").notNullable();
    table.string("numero").notNullable();
    table.string("cidade").notNullable();
    table.string("estado", 2).notNullable();
    table.string("telefone").notNullable();
    table.string("email").notNullable().unique();
    table.date("data_criacao").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("cliente");
}
