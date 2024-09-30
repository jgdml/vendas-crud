"use server";

import PessoaFilters from "@/dto/pessoa_filters";
import PessoaRepo from "@/persistence/repo/pessoa_repo";

const repo = new PessoaRepo();

export async function getAll(
  nome: string,
  cidade_nome: string,
  bairro_nome: string
) {
  const res = await repo.findAll(
    new PessoaFilters(nome, cidade_nome, bairro_nome)
  );
  const json = JSON.parse(JSON.stringify(res));
  return json;
}

export async function deleteById(id?: any) {
  await repo.delete(id);
}
