"use server";

import VendaFilters from "@/dto/venda_filters";
import PessoaRepo from "@/persistence/repo/pessoa_repo";
import ProdutoRepo from "@/persistence/repo/produto_repo";
import VendaRepo from "@/persistence/repo/venda_repo";

const repo = new VendaRepo();

export async function getAll(
  inicio: string,
  fim: string,
  pessoa: string,
  produto: string
) {
  const res = await repo.findAll(
    new VendaFilters(inicio, fim, pessoa, produto)
  );
  const json = JSON.parse(JSON.stringify(res));
  return json;
}

export async function getAllPessoas() {
  return JSON.parse(JSON.stringify(await new PessoaRepo().findAll()));
}
export async function getAllProdutos() {
  return JSON.parse(JSON.stringify(await new ProdutoRepo().findAll()));
}

export async function deleteById(id?: any) {
  await repo.delete(id);
}
