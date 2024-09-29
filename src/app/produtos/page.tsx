import React from "react";
import Card from "../components/Card";
import { deleteById, getAll } from "./actions";
import ActionTable from "../components/ActionTable";
import IconTextButton from "../components/IconTextButton";

const Produtos = async () => {
  const produtos = await getAll();

  return (
    <Card title="Produtos">
      <div className="flex justify-start mb-5">
        <IconTextButton text="Adicionar" icon="add" href="produtos/form" />
      </div>
      <ActionTable
        headers={["Nome", "Valor de Venda"]}
        displayValues={["nome", "valor_venda"]}
        items={produtos}
        editLink="produtos/form"
        deleteAction={deleteById}
      />
    </Card>
  );
};

export default Produtos;
