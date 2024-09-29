"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm, getProd } from "./actions";
import IconTextButton from "@/app/components/IconTextButton";

const ProdutoForm = () => {
  const params = useSearchParams();
  const editId = params.get("id") ?? undefined;
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  if (editId) {
    useEffect(() => {
      getProd(parseInt(editId)).then((prod) => {
        setName(prod.nome);
        setPrice(prod.valor_venda);
      });
    }),
      [];
  }

  const [state, formAction] = useFormState(
    (prevState: any, data: FormData) => submitForm(prevState, data, editId),
    {
      error: null,
    }
  );

  return (
    <Card title={(editId ? "Editar" : "Criar ") + " Produto"}>
      <form action={formAction} className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome">Nome do Produto</label>
            <input
              name="nome"
              type="text"
              required
              defaultValue={name}
              placeholder="Digite o nome do produto"
            />
          </div>

          <div className="inputLabel">
            <label htmlFor="preco">Valor de Venda</label>
            <input
              name="preco"
              type="number"
              min={0.01}
              max={99999.99}
              step=".01"
              required
              defaultValue={price}
              placeholder="Digite o preço do produto"
            />
          </div>
        </div>
        <IconTextButton isSubmit={true} text="Salvar" icon="save" />
      </form>
      <span>{state.error}</span>
    </Card>
  );
};

export default ProdutoForm;
