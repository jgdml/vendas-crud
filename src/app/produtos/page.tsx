import React from "react";
import ProdutoDTO from "../persistence/dto/produto_dto";
import ProdutoRepo from "../persistence/repo/produto_repo";

const Produtos = async () => {
  const produtoRepo = new ProdutoRepo();
  const produtos = await produtoRepo.findAll();

  // produtoRepo.save()

  // const p = new ProdutoDTO()
  // p.id = 1
  // p.nome = "ab"
  // p.valor_venda = 1.90
  // produtoRepo.saveOrUpdate(p)
  // produtoRepo
  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((p, index) => (
          <li key={index}>{p.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Produtos;
