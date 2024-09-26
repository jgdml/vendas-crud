import { connection } from "../db";
import { RowDataPacket } from "mysql2/promise";
import ProdutoDTO from "../dto/produto_dto";

export default class ProdutoRepo {
  async findAll() {
    var [res] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM `produto`"
    );

    return res.map(
      (item) => new ProdutoDTO(item.id, item.nome, item.valor_venda)
    );
  }

  async saveOrUpdate(produto: ProdutoDTO) {
    var result;
    if (produto.id == null) {
      result = await connection.execute(
        "INSERT INTO produto (nome, valor_venda) VALUES (?, ?)",
        [produto.nome, produto.valor_venda]
      );
    } else {
      console.log("update");
      result = await connection.execute(
        "UPDATE produto SET nome=?, valor_venda=? WHERE id=?",
        [produto.nome, produto.valor_venda, produto.id]
      );
    }
    return result[0];
  }

  async delete(id: number) {
    await connection.execute("DELETE FROM produto WHERE id=?", [id]);

  }
}
