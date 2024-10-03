"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteById, getAll, getAllBairros, getAllCidades } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";
import { useSearchParams } from "next/navigation";

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const params = useSearchParams();

  const nome = params.get("nome") ?? "";
  const cidade = params.get("cidade") ?? "";
  const bairro = params.get("bairro") ?? "";

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    getAll(nome, cidade, bairro).then(setPessoas);

    getAllCidades().then((cids) => {
      setCidades(cids);
    });

    getAllBairros().then((bairros) => {
      setBairros(bairros);
    });
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
            <select name="cidade">
              <option selected={cidade == ""} value={""}>
                Qualquer...
              </option>
              {cidades.map((cid) => (
                <option value={cid["nome"]} selected={cid["nome"] == cidade}>
                  {cid["nome"]}
                </option>
              ))}
            </select>
          </div>
          <div className="inputLabel">
            <label htmlFor="bairro">Bairro</label>
            <select name="bairro">
              <option selected={bairro == ""} value={""}>
                Qualquer...
              </option>
              {bairros.map((ba) => (
                <option value={ba["nome"]} selected={ba["nome"] == bairro}>
                  {ba["nome"]}
                </option>
              ))}
            </select>
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
