"use server";

import Bairro from "@/model/bairro";
import BairroRepo from "@/persistence/repo/bairro_repo";
import { redirect } from "next/navigation";

export async function submitForm(
  previousState: any,
  data: FormData,
  editId?: string
) {
  const bairro = new Bairro();

  try {
    if (editId) {
      bairro.id = parseInt(editId);
    }
    bairro.nome = data.get("nome") as string;
    const repo = new BairroRepo();
    await repo.saveOrUpdate(bairro);
  } catch (e) {
    return { error: "Ocorreu um erro. \n" + e };
  }
  redirect("/bairros");

  return { error: null };
}

export async function getBairro(id: number) {
  const repo = new BairroRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}
