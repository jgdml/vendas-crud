import GetConnection from "../db";
import { RowDataPacket } from "mysql2/promise";
import Cidade from "../../model/cidade";

export default class CidadeRepo {
  async findAll() {
    var connection = await GetConnection();
    var [res] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `cidade`"
    );
    connection.end();

    return res.map(
      (item) => new Cidade(item.id, item.nome, item.uf)
    );
  }
  async findById(id: number) {
    var connection = await GetConnection();
    var [res] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `cidade` WHERE id =?",
      [id]
    );
    connection.end();

    return new Cidade(res[0].id, res[0].nome, res[0].uf);
  }

  async saveOrUpdate(cidade: Cidade) {
    var connection = await GetConnection();

    var result;
    if (cidade.id == null) {
      result = await connection.execute(
        "INSERT INTO cidade (nome, uf) VALUES (?, ?)",
        [cidade.nome, cidade.uf]
      );
    } else {
      console.log("update");
      result = await connection.execute(
        "UPDATE cidade SET nome=?, uf=? WHERE id=?",
        [cidade.nome, cidade.uf, cidade.id]
      );
    }
    connection.end();
    return result[0];
  }

  async delete(id: number) {
    var connection = await GetConnection();
    await connection.execute("DELETE FROM cidade WHERE id=?", [id]);
    connection.end();
  }
}
