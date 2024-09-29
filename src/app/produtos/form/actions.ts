"use server";

import Produto from "@/model/produto";
import ProdutoRepo from "@/persistence/repo/produto_repo";
import { redirect } from "next/navigation";

export async function submitForm(
  previousState: any,
  data: FormData,
  editId?: string
) {
  const produto = new Produto();

  try {
    if (editId) {
      produto.id = parseInt(editId);
    }
    produto.nome = data.get("nome") as string;
    produto.valor_venda = data.get("preco") as unknown as number;
    const repo = new ProdutoRepo();
    await repo.saveOrUpdate(produto);
  } catch (e) {
    return { error: "Ocorreu um erro. \n" + e };
  }
  redirect("/produtos");

  return { error: null };
}

export async function getProd(id: number) {
  const repo = new ProdutoRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}
