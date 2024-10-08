"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteById, getAll, getAllPessoas, getAllProdutos } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";
import { useSearchParams } from "next/navigation";

const Vendas = () => {
  const [vendas, setVendas] = useState([]);
  const params = useSearchParams();

  const inicio = params.get("inicio") ?? "";
  const fim = params.get("fim") ?? "";
  const pessoa = params.get("pessoa") ?? "";
  const produto = params.get("produto") ?? "";

  const [pessoas, setPessoas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    getAll(inicio, fim, pessoa, produto).then(setVendas);

    getAllPessoas().then((pess) => {
      setPessoas(pess);
    });

    getAllProdutos().then((prods) => {
      setProdutos(prods);
    });
  }, []);

  return (
    <Card title="Vendas">
      <form action="/vendas" className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="inicio">Inicio</label>
            <input name="inicio" type="date" defaultValue={inicio} />
            Até
            <input name="fim" type="date" defaultValue={fim} />
          </div>

          <div className="inputLabel">
            <label htmlFor="pessoa">Pessoa</label>
            <select name="pessoa">
              <option selected={pessoa == ""} value={""}>
                Qualquer...
              </option>
              {pessoas.map((pes) => (
                <option value={pes["id"]} selected={pes["id"] == pessoa}>
                  {pes["nome"]}
                </option>
              ))}
            </select>
            <label htmlFor="produto">Produto</label>
            <select name="produto">
              <option selected={produto == ""} value={""}>
                Qualquer...
              </option>
              {produtos.map((prod) => (
                <option value={prod["id"]} selected={prod["id"] == produto}>
                  {prod["nome"]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <IconTextButton text="Adicionar" icon="add" href="vendas/form" />
          <IconTextButton isSubmit={true} text="Buscar" icon="search" />
        </div>
      </form>
      <iframe src="" name="iframe-print" hidden></iframe>

      <ActionTable
        headers={["Pessoa", "Total", "Data"]}
        displayValues={["pessoa_nome", "total", "data"]}
        items={vendas}
        editLink="vendas/form"
        deleteAction={deleteById}
        printLink="vendas/print"
      />
    </Card>
  );
};

export default Vendas;
