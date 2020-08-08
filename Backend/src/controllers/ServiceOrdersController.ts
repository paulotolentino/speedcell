import { Request, Response } from "express";
import knex from "../database/connection";

interface ServiceOrderFromFrontend {
  numero_os: number;
  id_cliente: number;
  nome_equipamento: string;
  marca: string;
  modelo: string;
  numero_serie: string;
  condicoes: string;
  defeitos: string;
  acessorios: string;
  solucao: string;
  laudo_tecnico: string;
  termo_garantia: string;
  observacoes: string;
  data_entrada: Date;
  data_saida: Date;
  valor: number;
  status: string;
}

interface StatusFromFrontend {
  status: string;
}

interface ServiceOrderFromDB extends ServiceOrderFromFrontend {
  id: number;
}

interface ServiceOrderClientFromDB extends ServiceOrderFromDB {
  nome: string;
  cpf: number;
  cep: number;
}

class ServiceOrdersController {
  async index(request: Request, response: Response) {
    try {
      const { initialDate, finalDate } = request.query;

      const sos: Array<ServiceOrderClientFromDB> = await knex("os")
        .join("cliente", "os.id_cliente", "=", "cliente.id")
        .select("os.*", "cliente.nome", "cliente.cpf", "cliente.cep")
        .where("os.data_entrada", ">=", `${initialDate}T00:00:00`)
        .andWhere("os.data_entrada", "<=", `${finalDate}T23:59:99`)
        .orderBy("os.data_entrada")
        .groupBy("os.data_entrada");

      if (sos.length === 0) {
        return response.status(404).json({ message: "SO's not found." });
      }

      return response.json(sos);
    } catch (err) {
      console.log(err);
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const so: ServiceOrderClientFromDB = await knex("os")
        .join("cliente", "os.id_cliente", "=", "cliente.id")
        .where("os.id", id)
        .select("os.*", "cliente.nome", "cliente.cpf", "cliente.cep")
        .first();

      if (!so) {
        return response.status(400).json({ message: "SO not found." });
      }

      return response.json(so);
    } catch (err) {
      console.log(err);
    }
  }

  async getNumMax(request: Request, response: Response) {
    try {
      const count = await knex("os").count("* as count").first();

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
      const so: ServiceOrderFromFrontend = request.body.os;

      const trx = await knex.transaction();

      try {
        await trx("os").insert(so);

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
      const so: StatusFromFrontend = request.body.os;

      const trx = await knex.transaction();

      try {
        await trx("os").where("id", id).update(so);

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

export default ServiceOrdersController;
