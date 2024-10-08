"use server";

import PessoaRepo from "@/persistence/repo/pessoa_repo";
import ProdutoRepo from "@/persistence/repo/produto_repo";
import VendaRepo from "@/persistence/repo/venda_repo";



export async function getVenda(id: number) {
  const repo = new VendaRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}