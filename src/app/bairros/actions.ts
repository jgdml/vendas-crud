"use server";

import BairroRepo from "@/persistence/repo/bairro_repo";
const repo = new BairroRepo();

export async function getAll() {
  const res = await repo.findAll();
  return JSON.parse(JSON.stringify(res));
}

export async function deleteById(id?: any) {
  await repo.delete(id);
}
