import { Request, Response } from "express";
import knex from "../database/connection";

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
}

interface ProductsSale {
  nome_produto: Array<string>;
  preco_dia: Array<number>;
  codigo_barras: Array<number>;
}

class SalesController {
  async index(request: Request, response: Response) {
    try {
      const sales: Array<SalesProps> = await knex("venda").select("*");

      const serializedSales = sales.map((item: SalesProps) => item);

      return response.json(serializedSales);
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
        .select("venda.*", "cliente.nome", "cliente.cpf");

      if (!sale) {
        return response.status(400).json({ message: "Sale nor found." });
      }

      const items: ProductsSale = await knex("produto")
        .join("produto_venda", "produto.id", "=", "produto_venda.id_produto")
        .where("produto_venda.point_id", id)
        .select(
          "produto_venda.preco_dia",
          "produto.codigo_barras",
          "produto.nome"
        );

      return response.json({ sale, items });
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
              ...item,
              id_venda: point_id,
            };
          }
        );

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
