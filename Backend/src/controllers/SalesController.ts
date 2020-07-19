import { Request, Response } from "express";
import knex from "../database/connection";

import { ProductStoragedDB } from "../controllers/ProductsController";

interface FrontendSale {
  numero_venda: number;
  id_cliente: number;
  valor_desconto: number;
  data: Date;
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
        .join("cliente", "venda.id_cliente", "=", "cliente.id")
        .join("produto_venda", "venda.id", "=", "produto_venda.id_venda")
        .select(
          "venda.*",
          "cliente.nome",
          "cliente.cpf",
          "cliente.cep",
          knex.raw("SUM(produto_venda.preco_dia) as valor")
        )
        .where("venda.data", ">=", `${initialDate}T00:00:00`)
        .andWhere("venda.data", "<=", `${finalDate}T23:59:99`)
        .orderBy("venda.data")
        .groupBy("venda.id");

      return response.json(sales);
    } catch (err) {
      console.log(err);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const sale: SaleFromDB = await knex("venda")
        .join("cliente", "venda.id_cliente", "=", "cliente.id")
        .where("venda.id", id)
        .select("venda.*", "cliente.nome", "cliente.cpf", "cliente.cep")
        .first();

      if (!sale) {
        return response.status(400).json({ message: "Sale nor found." });
      }

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

      return response.json({ sale, items });
    } catch (err) {
      console.log(err);
    }
  }

  async getNumMax(request: Request, response: Response) {
    try {
      const count = await knex("venda").count("* as count").first();

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
}

export default SalesController;
