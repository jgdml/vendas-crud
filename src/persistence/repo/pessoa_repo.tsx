import { DB }from "../db";
import { RowDataPacket } from "mysql2/promise";
import Pessoa from "../../model/pessoa";
import PessoaFilters from "@/dto/pessoa_filters";

export default class PessoaRepo {
  async findAll(filters?: PessoaFilters) {
    var connection = await DB.GetConnection();
    if (filters) {
      console.log(filters);
      var [res] = await connection.execute<RowDataPacket[]>(
        `SELECT pessoa.id, pessoa.nome, cidade.nome as nome_cidade, bairro.nome as nome_bairro, pessoa.telefone 
      FROM pessoa 
      INNER JOIN cidade ON cidade.id = pessoa.id_cidade 
      INNER JOIN bairro ON bairro.id = pessoa.id_bairro
      WHERE pessoa.nome LIKE :nome
      AND (:cidade = '' OR cidade.nome = :cidade)
      AND (:bairro = '' OR bairro.nome = :bairro)`,
        {
          nome: `%${filters.nome}%`,
          cidade: filters.cidade_nome,
          bairro: filters.bairro_nome,
        }
      );
    } else {
      var [res] = await connection.execute<RowDataPacket[]>(
        `SELECT pessoa.id, pessoa.nome, cidade.nome as nome_cidade, bairro.nome as nome_bairro, pessoa.telefone 
      FROM pessoa 
      INNER JOIN cidade ON cidade.id = pessoa.id_cidade 
      INNER JOIN bairro ON bairro.id = pessoa.id_bairro
      `);
    }

    connection.end();

    return res.map((item) => {
      const p = new Pessoa(item.id, item.nome, item.nome_cidade, item.telefone);
      p.bairro = item.nome_bairro;
      return p;
    });
  }

  async findById(id: number) {
    var connection = await DB.GetConnection();
    var [res] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `pessoa` WHERE pessoa.id = ?",
      [id]
    );
    connection.end();
    const p = res[0];

    return new Pessoa(
      p.id,
      p.nome,
      p.id_cidade,
      p.telefone,
      p.cep,
      p.endereco,
      p.numero,
      p.complemento,
      p.email,
      p.id_bairro
    );
  }

  async saveOrUpdate(pessoa: Pessoa) {
    var connection = await DB.GetConnection();

    var result;
    if (pessoa.id == null) {
      console.log(pessoa.cidade);
      result = await connection.execute(
        "INSERT INTO pessoa (nome, cep, endereco, numero, complemento, telefone, email, id_cidade, id_bairro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          pessoa.nome,
          pessoa.cep,
          pessoa.endereco,
          pessoa.numero,
          pessoa.complemento,
          pessoa.telefone,
          pessoa.email,
          pessoa.cidade,
          pessoa.bairro,
        ]
      );
    } else {
      result = await connection.execute(
        "UPDATE pessoa SET nome=?, cep=?, endereco=?, numero=?, complemento=?, telefone=?, email=?, id_cidade=?, id_bairro=? WHERE id=?",
        [
          pessoa.nome,
          pessoa.cep,
          pessoa.endereco,
          pessoa.numero,
          pessoa.complemento,
          pessoa.telefone,
          pessoa.email,
          pessoa.cidade,
          pessoa.bairro,
          pessoa.id,
        ]
      );
    }
    connection.end();
    return result[0];
  }

  async delete(id: number) {
    var connection = await DB.GetConnection();
    await connection.execute("DELETE FROM pessoa WHERE id=?", [id]);
    connection.end();
  }
}
