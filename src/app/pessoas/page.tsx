"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteById, getAll } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";
import { useSearchParams } from "next/navigation";

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const params = useSearchParams();

  const nome = params.get("nome") ?? "";
  const cidade = params.get("cidade") ?? "";
  const bairro = params.get("bairro") ?? "";

  useEffect(() => {
    getAll(nome, cidade, bairro).then(setPessoas);
  }, []);

  return (
    <Card title="Pessoas">
      <form action="/pessoas" className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome">Nome</label>
            <input
              name="nome"
              type="text"
              maxLength={120}
              placeholder="Qualquer..."
              defaultValue={nome}
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="cidade">Cidade</label>
            <input
              name="cidade"
              type="text"
              maxLength={120}
              placeholder="Qualquer..."
              defaultValue={cidade}
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="bairro">Bairro</label>
            <input
              name="bairro"
              type="text"
              maxLength={120}
              placeholder="Qualquer..."
              defaultValue={bairro}
            />
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <IconTextButton text="Adicionar" icon="add" href="pessoas/form" />
          <IconTextButton isSubmit={true} text="Buscar" icon="search" />
        </div>
      </form>

      <ActionTable
        headers={["Nome", "Cidade", "Bairro", "Telefone"]}
        displayValues={["nome", "cidade", "bairro", "telefone"]}
        items={pessoas}
        editLink="pessoas/form"
        deleteAction={deleteById}
      />
    </Card>
  );
};

export default Pessoas;
