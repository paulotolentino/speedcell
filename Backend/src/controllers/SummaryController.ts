import { Request, Response } from "express";
import knex from "../database/connection";

interface SummarySalesFromDB {
  forma_pagamento: string;
  valor_cheio: number;
  valor_desconto: number;
}

interface SummarySosFromDB {
  forma_pagamento: string;
  valor_cheio: number;
  valor_desconto: number;
}

class SummaryController {
  async index(request: Request, response: Response) {
    try {
      const { initialDate, finalDate } = request.query;

      const sales: Array<SummarySalesFromDB> = await knex("venda")
        .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
        .select(
          "venda.forma_pagamento",
          knex.raw("SUM(produto_venda.preco_dia) as valor_cheio"),
          knex.raw("SUM(venda.valor_desconto) as valor_desconto")
        )
        .where("venda.data", ">=", `${initialDate}T00:00:00`)
        .andWhere("venda.data", "<=", `${finalDate}T23:59:99`)
        .orderBy("venda.forma_pagamento")
        .groupBy("venda.forma_pagamento");

      const sos: Array<SummarySosFromDB> = await knex("os")
        .select(
          "status",
          "forma_pagamento",
          knex.raw("SUM(valor) as valor_cheio")
        )
        .where("data_entrada", ">=", `${initialDate}T00:00:00`)
        .andWhere("data_entrada", "<=", `${finalDate}T23:59:99`)
        .whereNot("status", "=", "Em andamento")
        .orderBy("forma_pagamento")
        .groupBy("forma_pagamento");
      if (sales.length === 0 && sos.length === 0) {
        return response.status(404).json({ message: "Nothing to show." });
      }

      return response.json({ sales, sos });
    } catch (err) {
      console.log(err);
    }
  }

  async sumOperations(request: Request, response: Response) {
    try {
      const { initialDate, finalDate } = request.query;

      const sales: Array<SummarySalesFromDB> = await knex("venda")
        .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
        .select(
          knex.raw("SUM(produto_venda.preco_dia) as valor_cheio"),
          knex.raw("SUM(venda.valor_desconto) as valor_desconto")
        )
        .where("venda.data", ">=", `${initialDate}T00:00:00`)
        .andWhere("venda.data", "<=", `${finalDate}T23:59:99`)
        .first();

      const sos: Array<SummarySosFromDB> = await knex("os")
        .select(knex.raw("SUM(valor) as valor_cheio"))
        .where("data_entrada", ">=", `${initialDate}T00:00:00`)
        .andWhere("data_entrada", "<=", `${finalDate}T23:59:99`)
        .whereNot("status", "=", "Em andamento")
        .first();

      if (sales.length === 0 && sos.length === 0) {
        return response.status(404).json({ message: "Nothing to show." });
      }

      return response.json({ sales, sos });
    } catch (err) {
      console.log(err);
    }
  }
}

export default SummaryController;
