import { Request, Response } from "express";
import knex from "../database/connection";

interface FrontendProduct {
  codigo_barras: number;
  preco_compra: number;
  preco_venda: number;
  nome: string;
}

interface ProductProps extends FrontendProduct {
  id: number;
}

interface ProductStoragedDB extends ProductProps {
  id_estoque: number;
  quantidade: number;
  data_modificacao: Date;
}

interface StorageProps {
  id_produto: number;
  quantidade: number;
  data_modificacao: Date;
}

interface FrontendStorage {
  quantidade: number;
  data_modificacao: Date;
}

interface NewProduct {
  product: FrontendProduct;
  storage: FrontendStorage;
}

class ProductsController {
  async index(request: Request, response: Response) {
    try {
      const sales: Array<ProductProps> = await knex("produto").select("*");

      const serializedProducts = sales.map((item: ProductProps) => item);

      return response.json(serializedProducts);
    } catch (err) {
      console.log(err);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const product: ProductStoragedDB = await knex("produto")
        .join("estoque", "produto.id", "=", "estoque.id_produto")
        .where("produto.id", id)
        .select(
          "produto.*",
          "estoque.id",
          "estoque.quantidade",
          "estoque.data_modificacao"
        );

      if (!product) {
        return response.status(400).json({ message: "Product nor found." });
      }

      return response.json({ product });
    } catch (err) {
      console.log(err);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { product, storage }: NewProduct = request.body;

      const trx = await knex.transaction();

      try {
        const insertedProductsIds: Array<number> = await trx("produto").insert(
          product
        );

        const product_id: number = insertedProductsIds[0];

        const produtoEstoqueParsed: StorageProps = {
          ...storage,
          id_produto: product_id,
        };

        await trx("estoque").insert(produtoEstoqueParsed);

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

export default ProductsController;
