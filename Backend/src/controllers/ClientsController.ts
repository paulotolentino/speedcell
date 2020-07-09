import { Request, Response, json } from "express";
import knex from "../database/connection";

interface ClientProps {
  id: number;
  nome: string;
  cpf: number;
  cep: number;
  logradouro: string;
  numero: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  data_criacao: Date;
}

interface Pagination {
  total: number;
  perPage: number;
  offset: number;
  nextPage: number;
  lastPage: number;
  currentPage: number;
  from: number;
  clients: ClientProps[];
}

class ClientsController {
  async index(request: Request, response: Response) {
    try {
      let currentPage = Number(request.params.currentPage || "1");
      let perPage = Number(request.params.perPage || "10");
      if (currentPage < 1) currentPage = 1;
      const offset = (currentPage - 1) * perPage;

      const result: Pagination = await Promise.all([
        knex("cliente").count("id as count").first(),
        knex("cliente")
          .select("*")
          .orderBy("nome")
          .offset(offset)
          .limit(perPage),
      ]).then(([total, rows]) => {
        const count = total!.count;
        return {
          total: Number(count),
          perPage: perPage,
          offset: offset,
          nextPage: offset + rows.length,
          lastPage: Math.ceil(Number(count) / perPage),
          currentPage: currentPage,
          from: offset,
          clients: rows,
        };
      });
      if (result.total === 0) {
        return response.status(404).json({ message: "Clients not found." });
      }

      return response.json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const client: ClientProps = await knex("cliente")
        .where("id", id)
        .select("*")
        .first();

      if (!client) {
        return response.status(404).json({ message: "Client not found." });
      }

      return response.json(client);
    } catch (err) {
      console.log(err);
    }
  }

  async create(request: Request, response: Response) {
    try {
      const {
        newClient,
      }: { newClient: Omit<ClientProps, "id"> } = request.body;

      const trx = await knex.transaction();

      try {
        await trx("cliente").insert(newClient);

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

  async change(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const {
        client,
      }: { client: Omit<ClientProps, "id" | "cpf"> } = request.body;

      const trx = await knex.transaction();

      try {
        await trx("cliente").where("id", id).update(client);

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
      await knex("cliente").del();

      return response.json({ message: "done" });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteOne(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await knex("cliente").where("id", id).del();

      return response.json({ message: "done" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default ClientsController;
