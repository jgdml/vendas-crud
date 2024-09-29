"use server";

import ProdutoRepo from "@/persistence/repo/produto_repo";
const repo = new ProdutoRepo();

export async function getAll() {
  const res = await repo.findAll();
  return JSON.parse(JSON.stringify(res));
}

export async function deleteById(id?: any) {
  await repo.delete(id);
}
