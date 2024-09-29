"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm, getCidade } from "./actions";
import IconTextButton from "@/app/components/IconTextButton";

const CidadeForm = () => {
  const params = useSearchParams();
  const editId = params.get("id") ?? undefined;
  const [name, setName] = useState();
  const [uf, setUf] = useState();

  if (editId) {
    useEffect(() => {
      getCidade(parseInt(editId)).then((cid) => {
        setName(cid.nome);
        setUf(cid.uf);
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
    <Card title={(editId ? "Editar" : "Criar ") + " Cidade"}>
      <form action={formAction} className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome">Nome da Cidade</label>
            <input
              name="nome"
              type="text"
              required
              maxLength={40}
              defaultValue={name}
              placeholder="Digite o nome da cidade"
            />
          </div>

          <div className="inputLabel">
            <label htmlFor="uf">UF</label>
            <input
              name="uf"
              type="text"
              required
              defaultValue={uf}
              placeholder="Digite a Unidade Federativa da cidade"
              maxLength={2}
            />
          </div>
        </div>
        <IconTextButton isSubmit={true} text="Salvar" icon="save" />
      </form>
      <span>{state.error}</span>
    </Card>
  );
};

export default CidadeForm;
