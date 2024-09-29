"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm, getBairro } from "./actions";
import IconTextButton from "@/app/components/IconTextButton";

const BairroForm = () => {
  const params = useSearchParams();
  const editId = params.get("id") ?? undefined;
  const [name, setName] = useState();

  if (editId) {
    useEffect(() => {
      getBairro(parseInt(editId)).then((bairro) => {
        setName(bairro.nome);
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
    <Card title={(editId ? "Editar" : "Criar ") + " Bairro"}>
      <form action={formAction} className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome">Nome do Bairro</label>
            <input
              name="nome"
              type="text"
              maxLength={60}
              required
              defaultValue={name}
              placeholder="Digite o nome do bairro"
            />
          </div>

        </div>
        <IconTextButton isSubmit={true} text="Salvar" icon="save" />
      </form>
      <span>{state.error}</span>
    </Card>
  );
};

export default BairroForm;
