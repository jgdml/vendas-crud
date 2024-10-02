"use server";

import VendaRepo from "@/persistence/repo/venda_repo";

const repo = new VendaRepo();

export async function getAll() {
  const vv = await repo.findAll()
  return JSON.parse(JSON.stringify(vv));;
}

export async function deleteById(id?: any) {
  await repo.delete(id);
}
