"use server";

import Pessoa from "@/model/pessoa";
import PessoaRepo from "@/persistence/repo/pessoa_repo";
import { redirect } from "next/navigation";
import { getAll as getCidades } from "@/app/cidades/actions";
import { getAll as getBairros } from "@/app/bairros/actions";

export async function submitForm(
  previousState: any,
  data: FormData,
  editId?: string
) {
  const pessoa = new Pessoa();

  try {
    if (editId) {
      pessoa.id = parseInt(editId);
    }
    pessoa.nome = data.get("nome") as string;
    pessoa.cep = data.get("cep") as string;
    pessoa.endereco = data.get("endereco") as string;
    pessoa.numero = data.get("numero") as unknown as number;
    pessoa.complemento = data.get("complemento") as string;
    pessoa.telefone = data.get("telefone") as string;
    pessoa.email = data.get("email") as string;
    pessoa.cidade = data.get("cidade") as unknown as number;
    pessoa.bairro = data.get("bairro") as unknown as number;
    const repo = new PessoaRepo();
    await repo.saveOrUpdate(pessoa);
  } catch (e) {
    return { error: "Ocorreu um erro. \n" + e };
  }
  redirect("/pessoas");

  return { error: null };
}

export async function getPessoa(id: number) {
  const repo = new PessoaRepo();
  return JSON.parse(JSON.stringify(await repo.findById(id)));
}

export async function getAllCidades() {
  return await getCidades();
}

export async function getAllBairros() {
  return await getBairros();
}
