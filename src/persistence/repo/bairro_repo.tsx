import GetConnection from "../db";
import { RowDataPacket } from "mysql2/promise";
import Bairro from "../../model/bairro";

export default class BairroRepo {
  async findAll() {
    var connection = await GetConnection();
    var [res] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `bairro`"
    );
    connection.end();

    return res.map(
      (item) => new Bairro(item.id, item.nome)
    );
  }
  async findById(id: number) {
    var connection = await GetConnection();
    var [res] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `bairro` WHERE id =?",
      [id]
    );
    connection.end();

    return new Bairro(res[0].id, res[0].nome);
  }

  async saveOrUpdate(bairro: Bairro) {
    var connection = await GetConnection();

    var result;
    if (bairro.id == null) {
      result = await connection.execute(
        "INSERT INTO bairro (nome) VALUES (?)",
        [bairro.nome]
      );
    } else {
      console.log("update");
      result = await connection.execute(
        "UPDATE bairro SET nome=? WHERE id=?",
        [bairro.nome, bairro.id]
      );
    }
    connection.end();
    return result[0];
  }

  async delete(id: number) {
    var connection = await GetConnection();
    await connection.execute("DELETE FROM bairro WHERE id=?", [id]);
    connection.end();
  }
}
