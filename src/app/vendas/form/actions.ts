"use server";

import PessoaRepo from "@/persistence/repo/pessoa_repo";
import { redirect } from "next/navigation";
import ProdutoRepo from "@/persistence/repo/produto_repo";
import Venda from "@/model/venda";
import VendaRepo from "@/persistence/repo/venda_repo";
import VendaItem from "@/model/venda_item";

export async function submitForm(
  previousState: any,
  data: FormData,
  editId?: string
) {
  const venda = new Venda(
    data.get("data") as string,
    data.get("pessoa") as any as number
  );
  const itemsJson = JSON.parse(data.get("items") as string);

  try {
    if (editId) {
      venda.id = parseInt(editId);
    }
    const items = itemsJson.map((item: any) => {
      return new VendaItem(
        item["valor"],
        item["subtotal"],
        item["quantidade"],
        item["produto_id"]
      );
    });

    const repo = new VendaRepo();
    await repo.saveOrUpdate(venda, items);
  } catch (e) {
    return { error: "Ocorreu um erro. \n" + e };
  }
  redirect("/vendas");

  return { error: null };
}

export async function getVenda(id: number) {
  const repo = new VendaRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}

export async function getAllProdutos() {
  return JSON.parse(JSON.stringify(await new ProdutoRepo().findAll()));
}

export async function getAllPessoas() {
  return JSON.parse(JSON.stringify(await new PessoaRepo().findAll()));
}
