"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { deleteById, getAll } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";

const Bairros = () => {
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    getAll().then(setBairros);
  }, []);

  return (
    <Card title="Bairros">
      <div className="flex justify-start mb-5">
        <IconTextButton text="Adicionar" icon="add" href="bairros/form" />
      </div>
      <ActionTable
        headers={["Nome"]}
        displayValues={["nome"]}
        items={bairros}
        editLink="bairros/form"
        deleteAction={deleteById}
      />
    </Card>
  );
};

export default Bairros;
