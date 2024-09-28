import React from "react";
import ProdutoRepo from "../persistence/repo/produto_repo";
import Card from "../components/Card";

const Produtos = async () => {
  const produtoRepo = new ProdutoRepo();
  const produtos = await produtoRepo.findAll();
  return (
    <Card title="Produtos">
      <div className="flex justify-end mb-2">
        <a href="produtos/form" className="iconTextButton">
          <i className="material-symbols-outlined">add</i>
          Adicionar
        </a>
      </div>
      <table className="displayTable">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor de Venda</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, index) => (
            <tr key={index}>
              <td>{p.nome}</td>
              <td>{p.valor_venda}</td>
              <td>
                <a href={"produtos/form?id=" + p.id} className="iconButton">
                  <i className="material-symbols-outlined">edit</i>
                </a>
                <a href="" className="iconButton">
                  <i className="material-symbols-outlined">delete</i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Produtos;
