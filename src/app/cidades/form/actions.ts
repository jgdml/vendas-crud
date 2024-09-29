"use server";

import Cidade from "@/model/cidade";
import CidadeRepo from "@/persistence/repo/cidade_repo";
import { redirect } from "next/navigation";

export async function submitForm(
  previousState: any,
  data: FormData,
  editId?: string
) {
  const cidade = new Cidade();

  try {
    if (editId) {
      cidade.id = parseInt(editId);
    }
    cidade.nome = data.get("nome") as string;
    cidade.uf = data.get("uf") as string;
    const repo = new CidadeRepo();
    await repo.saveOrUpdate(cidade);
  } catch (e) {
    return { error: "Ocorreu um erro. \n" + e };
  }
  redirect("/cidades");

  return { error: null };
}

export async function getCidade(id: number) {
  const repo = new CidadeRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}
