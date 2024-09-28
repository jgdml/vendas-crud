"use client";
import React from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";

const ProdutoForm = () => {
  const editId = useSearchParams().get("id");
  // const p = new ProdutoDTO()
  // p.id = 1
  // p.nome = "asdaasda"
  // p.valor_venda = 4.90
  // produtoRepo.saveOrUpdate(p)
  return (
    <Card title={(editId ? "Editar" : "Criar ") + " Produto"}>
      <div>form</div>
    </Card>
  );
};

export default ProdutoForm;
