import { Request, Response } from "express";
import knex from "../database/connection";

interface ProductProps {
  id: number;
  codigo_barras: number;
  preco_compra: number;
  preco_venda: number;
  nome: string;
}

interface ProductStoragedDB extends ProductProps {
  id_estoque: number;
  quantidade: number;
  data_modificacao: Date;
}

interface StorageProps {
  id: number;
  id_produto: number;
  quantidade: number;
  data_modificacao: Date;
}

interface NewProduct {
  product: Omit<ProductProps, "id">;
  storage: Omit<StorageProps, "id" | "id_produto">;
}

class ProductsController {
  async index(request: Request, response: Response) {
    try {
      const products: Array<ProductProps> = await knex("produto").select("*");

      // const serializedProducts = products.map((item: ProductProps) => item);

      return response.json(products);
    } catch (err) {
      console.log(err);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const product: Array<ProductStoragedDB> = await knex("produto")
        .join("estoque", "produto.id", "=", "estoque.id_produto")
        .where("produto.id", id)
        .select(
          "produto.*",
          "estoque.id as id_estoque",
          "estoque.quantidade",
          "estoque.data_modificacao"
        );

      if (product.length === 0) {
        return response.status(400).json({ message: "Product nor found." });
      }

      return response.json(product);
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

        const produtoEstoqueParsed: Omit<StorageProps, "id"> = {
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

  async change(request: Request, response: Response) {
    try {
      const { id_produto, id_estoque } = request.params;
      const {
        product,
        storage,
      }: {
        product: Omit<ProductProps, "id" | "codigo_barras">;
        storage: Omit<StorageProps, "id" | "id_produto">;
      } = request.body;

      const trx = await knex.transaction();

      try {
        await trx("produto").where("id", id_produto).update({
          nome: product.nome,
          preco_compra: product.preco_compra,
          preco_venda: product.preco_venda,
        });

        await trx("estoque").where("id", id_estoque).update({
          quantidade: storage.quantidade,
          data_modificacao: storage.data_modificacao,
        });

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
