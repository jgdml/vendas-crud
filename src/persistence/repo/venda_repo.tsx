import { DB }from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Venda from "../../model/venda";
import VendaFilters from "@/dto/venda_filters";
import VendaItem from "@/model/venda_item";
import VendaView from "@/dto/venda_view";
import VendaItemView from "@/dto/venda_item_view";

export default class VendaRepo {
  async findAll(filters?: VendaFilters) {
    var connection = await DB.GetConnection();

    if (filters) {
      var [res] = await connection.execute<RowDataPacket[]>(
        `SELECT venda.id, pessoa.nome AS pessoa_nome, DATE_FORMAT(data_venda, '%d/%m/%Y') AS data, 
        (SELECT SUM(venda_item.subtotal) from venda_item WHERE venda_item.id_venda = venda.id ) AS total 
        FROM venda 
        INNER JOIN pessoa ON pessoa.id = venda.id_pessoa
        INNER JOIN venda_item ON venda_item.id_venda = venda.id
        WHERE (:inicio='' OR :fim='' OR (venda.data_venda BETWEEN :inicio AND :fim))
        AND (:id_pessoa = '' OR :id_pessoa = venda.id_pessoa)
        AND (:id_produto = '' OR :id_produto = venda_item.id_produto)
        GROUP BY venda.id`,
        {
          inicio: filters.inicio,
          fim: filters.fim,
          id_pessoa: filters.pessoa,
          id_produto: filters.produto,
        }
      );
    } else {
      var [res] = await connection.execute<RowDataPacket[]>(
        `SELECT venda.id, pessoa.nome AS pessoa_nome, DATE_FORMAT(data_venda, '%d/%m/%Y') AS data, 
	    (SELECT SUM(venda_item.subtotal) from venda_item WHERE venda_item.id_venda = venda.id ) AS total 
	    FROM venda 
      INNER JOIN pessoa ON pessoa.id = venda.id_pessoa;`
      );
    }
    connection.end();

    return res.map(
      (item) => new VendaView(item.id, item.total, item.data, item.pessoa_nome)
    );
  }

  async findById(id: number) {
    var connection = await DB.GetConnection();
    const [vendRes] = await connection.execute<RowDataPacket[]>(
      `SELECT venda.id, DATE_FORMAT(data_venda, '%Y-%m-%d') AS data, pessoa.id AS pessoa, pessoa.nome AS pessoa_nome,
      (SELECT SUM(venda_item.subtotal) from venda_item WHERE venda_item.id_venda = venda.id ) AS total 
      FROM venda 
      INNER JOIN pessoa ON pessoa.id = venda.id_pessoa
      WHERE venda.id = ?
      `,
      [id]
    );
    const [itemsRes] = await connection.execute<RowDataPacket[]>(
      `SELECT venda_item.*, produto.nome FROM venda_item 
      INNER JOIN produto ON produto.id = venda_item.id_produto
      WHERE id_venda = ?`,
      [id]
    );
    connection.end();
    const venda = vendRes[0];
    const items = itemsRes;
    return new VendaView(
      venda.id,
      venda.total,
      venda.data,
      venda.pessoa_nome,
      venda.pessoa,
      items.map(
        (i) =>
          new VendaItemView(
            i.valor,
            i.subtotal,
            i.quantidade,
            i.nome,
            i.id_produto
          )
      )
    );
  }

  async saveOrUpdate(venda: Venda, items: Array<VendaItem>) {
    var connection = await (await DB.GetConnection()).getConnection();

    var result;
    connection.beginTransaction();
    if (venda.id == null) {
      console.log("insert");
      result = await connection.execute(
        "INSERT INTO venda (id_pessoa, data_venda) VALUES (?, ?)",
        [venda.pessoa, venda.data_venda]
      );
      const vendaId = (result[0] as ResultSetHeader).insertId;

      for (var item of items) {
        await connection.execute(
          "INSERT INTO venda_item (id_venda, id_produto, quantidade, valor, subtotal) VALUES (?, ?, ?, ?, ?)",
          [vendaId, item.produto, item.quantidade, item.valor, item.subtotal]
        );
      }
    } else {
      console.log("update");
      result = await connection.execute(
        "UPDATE venda SET id_pessoa=?, data_venda=? WHERE id=?",
        [venda.pessoa, venda.data_venda, venda.id]
      );
      console.log("updated venda");
      await connection.execute("DELETE FROM venda_item WHERE id_venda=?", [
        venda.id,
      ]);
      console.log("deleted old items");

      for (var item of items) {
        await connection.execute(
          "INSERT INTO venda_item (id_venda, id_produto, quantidade, valor, subtotal) VALUES (?, ?, ?, ?, ?)",
          [venda.id, item.produto, item.quantidade, item.valor, item.subtotal]
        );
      }
      console.log("inserted new items");
    }
    await connection.commit();

    connection.release();
    return result[0];
  }

  async delete(id: number) {
    var connection = await DB.GetConnection();
    await connection.execute("DELETE FROM venda WHERE id=?", [id]);
    connection.end();
  }
}
