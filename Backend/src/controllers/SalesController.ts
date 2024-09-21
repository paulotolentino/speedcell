import { Request, Response } from "express";
import knex from "../database/connection";

import { ProductStoragedDB } from "../controllers/ProductsController";

interface FrontendSale {
  numero_venda: number;
  id_cliente: number;
  valor_desconto: number;
  data: Date;
  forma_pagamento: string;
}

interface SalesProps extends FrontendSale {
  id: number;
}

interface FrontendCart {
  id_produto: number;
  preco_dia: number;
}

interface ProductSaleProps extends FrontendCart {
  id: number;
  id_venda: number;
}

interface NewSalesProps {
  sale: FrontendSale;
  cart: Array<FrontendCart>;
}

interface SaleFromDB extends SalesProps {
  nome_cliente: string;
  cpf_cliente: number;
  valor: number;
}

class SalesController {
  async index(request: Request, response: Response) {
    try {
      const { initialDate, finalDate } = request.query;

      const sales: Array<SaleFromDB> = await knex("venda")
        .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
        .leftJoin("cliente", "venda.id_cliente", "=", "cliente.id")
        .select(
          "venda.id",
          "venda.numero_venda",
          "venda.data",
          "venda.valor_desconto",
          "venda.forma_pagamento",
          "cliente.nome",
          "cliente.cpf",
          "cliente.cep",
          knex.raw("SUM(produto_venda.preco_dia) as valor")
        )
        .where("venda.data", ">=", `${initialDate}T00:00:00`)
        .andWhere("venda.data", "<=", `${finalDate}T23:59:99`)
        .orderBy("venda.data")
        .groupBy("venda.data");

      if (sales.length === 0) {
        return response.status(404).json({ message: "Sales not found." });
      }

      const newSales = sales.map((sale) => {
        let val = sale.valor;
        // delete sale.valor;
        return { ...sale, valor_descontado: val - sale.valor_desconto };
      });

      return response.json(newSales);
    } catch (err) {
      console.log(err);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const sale: SaleFromDB = await knex("venda")
        .join("cliente", "venda.id_cliente", "=", "cliente.id")
        .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
        .where("venda.id", id)
        .select(
          "venda.*",
          "cliente.nome",
          "cliente.cpf",
          "cliente.cep",
          knex.raw("SUM(produto_venda.preco_dia) as valor")
        )
        .first();

      if (!sale) {
        return response.status(400).json({ message: "Sale nor found." });
      }

      const newSales = {
        ...sale,
        valor_descontado: sale.valor - sale.valor_desconto,
      };

      const items: Array<ProductStoragedDB> = await knex("produto")
        .join("produto_venda", "produto.id", "=", "produto_venda.id_produto")
        .join("estoque", "estoque.id_produto", "=", "produto_venda.id_produto")
        .where("produto_venda.id_venda", id)
        .select(
          "produto_venda.preco_dia as preco_venda",
          "produto.codigo_barras",
          "produto.nome",
          "produto.id",
          "estoque.id as id_estoque",
          "estoque.quantidade",
          "estoque.data_modificacao"
        )
        .orderBy("produto.nome");

      return response.json({ sale: newSales, items });
    } catch (err) {
      console.log(err);
    }
  }

  async getNumMax(request: Request, response: Response) {
    try {
      const count = await knex("venda").max("numero_venda as count").first();

      if (!count) {
        return response.status(400).json({ message: "Error." });
      }
      return response.json(count);
    } catch (err) {
      console.log(err);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { sale, cart }: NewSalesProps = request.body;

      const trx = await knex.transaction();

      try {
        const insertedSalesIds: Array<number> = await trx("venda").insert(sale);

        const point_id: number = insertedSalesIds[0];

        const produtoVendaParsed: Array<ProductSaleProps> = cart.map(
          (item: FrontendCart) => {
            return <ProductSaleProps>{
              id_produto: item.id_produto,
              preco_dia: item.preco_dia,
              id_venda: point_id,
            };
          }
        );

        produtoVendaParsed.forEach(async (produto) => {
          await trx("estoque")
            .decrement("quantidade", 1)
            .where("id_produto", produto.id_produto);
        });

        await trx("produto_venda").insert(produtoVendaParsed);

        await trx.commit();

        return response.json({ message: "success" });
      } catch (err1) {
        console.log(err1);
        await trx.rollback();
      }
    } catch (err2) {
      console.log(err2);
    }
  }

  async change(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { sale }: NewSalesProps = request.body;

      const trx = await knex.transaction();

      try {
        await trx("venda").where("id", id).update(sale);

        await trx.commit();

        return response.json({ message: "success" });
      } catch (error) {
        console.log(error);
        await trx.rollback();

        return response.status(400).json({ message: "failes", error });
      }
    } catch (err2) {
      console.log(err2);
    }
  }

  async delete(request: Request, response: Response) {
    try {
      await knex("venda").del();

      return response.json({ message: "done" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default SalesController;
