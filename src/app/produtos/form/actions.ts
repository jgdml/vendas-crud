"use server";

import ProdutoDTO from "@/persistence/dto/produto_dto";
import ProdutoRepo from "@/persistence/repo/produto_repo";

export async function submitForm(
  previousState: any,
  data: FormData,
  editId?: string
) {
  const produto = new ProdutoDTO();

  try {
    if (editId) {
      produto.id = parseInt(editId);
    }
    produto.nome = data.get("nome") as string;
    produto.valor_venda = data.get("preco") as unknown as number;
    const repo = new ProdutoRepo();
    await repo.saveOrUpdate(produto);
  } catch {
    return { error: "Ocorreu um erro." };
  }

  return { error: null };
}

export async function getProd(id: number){
  const repo = new ProdutoRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}
