"use client";
import React, { useState } from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm, getProd } from "./actions";
import { useRouter } from "next/navigation";
import IconTextButton from "@/app/components/IconTextButton";

const ProdutoForm = () => {
  const { push } = useRouter();
  const params = useSearchParams();
  const editId = params.get("id") ?? undefined;
  var [name, setName] = useState();
  var [price, setPrice] = useState();

  if (editId) {
    getProd(parseInt(editId)).then((prod) => {
      setName(prod.nome);
      setPrice(prod.valor_venda);
    });
  }

  const [state, formAction] = useFormState(
    (prevState: any, data: FormData) => submitForm(prevState, data, editId),
    {
      error: null,
    }
  );

  return (
    <Card title={(editId ? "Editar" : "Criar ") + " Produto"}>
      <form action={formAction}>
        <label htmlFor="nome">Nome do Produto</label>
        <input name="nome" type="text" required defaultValue={name} />
        <label htmlFor="preco">Valor de Venda</label>
        <input
          name="preco"
          type="number"
          min={0.01}
          step=".01"
          required
          defaultValue={price}
        />
        <IconTextButton isSubmit={true} text="Salvar" icon="save" />
      </form>
      <span>{state.error}</span>
    </Card>
  );
};

export default ProdutoForm;
