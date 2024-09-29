"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteById, getAll } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";

const Cidades = () => {
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    getAll().then(setCidades);
  }, []);

  return (
    <Card title="Cidades">
      <div className="flex justify-start mb-5">
        <IconTextButton text="Adicionar" icon="add" href="cidades/form" />
      </div>
      <ActionTable
        headers={["Nome", "UF"]}
        displayValues={["nome", "uf"]}
        items={cidades}
        editLink="cidades/form"
        deleteAction={deleteById}
      />
    </Card>
  );
};

export default Cidades;
