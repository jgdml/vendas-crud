"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteById, getAll } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";
import { useSearchParams } from "next/navigation";

const Vendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    getAll().then(setVendas);
  }, []);

  return (
    <Card title="Vendas">
      {/* <form action="/vendas" className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome"></label>
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
          <IconTextButton text="Adicionar" icon="add" href="vendas/form" />
          <IconTextButton isSubmit={true} text="Buscar" icon="search" />
        </div>
      </form> */}
      <div className="flex justify-between mb-5">
        <IconTextButton text="Adicionar" icon="add" href="vendas/form" />
      </div>

      <ActionTable
        headers={["Pessoa", "Total", "Data"]}
        displayValues={["pessoa_nome", "total", "data"]}
        items={vendas}
        editLink="vendas/form"
        deleteAction={deleteById}
      />
    </Card>
  );
};

export default Vendas;
