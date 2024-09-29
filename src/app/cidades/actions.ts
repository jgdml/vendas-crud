"use server";

import CidadeRepo from "@/persistence/repo/cidade_repo";
const repo = new CidadeRepo();

export async function getAll() {
  const res = await repo.findAll();
  return JSON.parse(JSON.stringify(res));
}

export async function deleteById(id?: any) {
  await repo.delete(id);
}
