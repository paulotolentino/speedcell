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

class ClientsController {
  async index(request: Request, response: Response) {
    try {
      const clients: Array<ClientProps> = await knex("cliente")
        .select("*")
        .orderBy("cliente.nome");

      if (clients.length === 0) {
        return response.status(404).json({ message: "Clients not found." });
      }

      return response.json(clients);
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

  async searchByCPF(request: Request, response: Response) {
    try {
      const { cpf } = request.params;

      const client: ClientProps = await knex("cliente")
        .where("cpf", cpf)
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
