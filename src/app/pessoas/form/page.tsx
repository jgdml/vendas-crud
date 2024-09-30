"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm, getPessoa, getAllBairros, getAllCidades } from "./actions";
import IconTextButton from "@/app/components/IconTextButton";

const PessoaForm = () => {
  const params = useSearchParams();
  const editId = params.get("id") ?? undefined;

  const [name, setnome] = useState();
  const [cep, setcep] = useState();
  const [endereco, setendereco] = useState();
  const [numero, setnumero] = useState();
  const [complemento, setcomplemento] = useState();
  const [telefone, settelefone] = useState();
  const [email, setemail] = useState();
  const [cidade, setcidade] = useState();
  const [bairro, setbairro] = useState();

  const [cidades, setCidades] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    getAllCidades().then((cids) => {
      setCidades(cids);
    });

    getAllBairros().then((bairros) => {
      setBairros(bairros);
    });

    if (editId) {
      getPessoa(parseInt(editId)).then((pessoa) => {
        setnome(pessoa.nome);
        setcep(pessoa.cep);
        setendereco(pessoa.endereco);
        setnumero(pessoa.numero);
        setcomplemento(pessoa.complemento);
        settelefone(pessoa.telefone);
        setemail(pessoa.email);
        setcidade(pessoa.cidade);
        setbairro(pessoa.bairro);
      });
    }
  }, []);

  const [state, formAction] = useFormState(
    (prevState: any, data: FormData) => submitForm(prevState, data, editId),
    {
      error: null,
    }
  );

  return (
    <Card title={(editId ? "Editar" : "Criar ") + " Pessoa"}>
      <form action={formAction} className="form">
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome">Nome</label>
            <input
              name="nome"
              type="text"
              maxLength={80}
              required
              defaultValue={name}
              placeholder="Digite o nome da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="cep">CEP</label>
            <input
              name="cep"
              type="text"
              maxLength={11}
              required
              defaultValue={cep}
              placeholder="Digite o CEP da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="endereco">Endereço</label>
            <input
              name="endereco"
              type="text"
              maxLength={200}
              required
              defaultValue={endereco}
              placeholder="Digite o endereço da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="numero">Numero</label>
            <input
              name="numero"
              type="number"
              max={999999}
              required
              defaultValue={numero}
              placeholder="Digite o numero do endereço da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="complemento">Complemento</label>
            <input
              name="complemento"
              type="text"
              maxLength={60}
              required
              defaultValue={complemento}
              placeholder="Digite o complemento do endereço da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="nome">Telefone</label>
            <input
              name="telefone"
              type="text"
              maxLength={100}
              required
              defaultValue={telefone}
              placeholder="Digite o telefone da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="email">E-mail</label>
            <input
              name="email"
              type="email"
              maxLength={100}
              required
              defaultValue={email}
              placeholder="Digite o email da pessoa"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="cidade">Cidade</label>
            <select name="cidade">
              {cidades.map((cid) => (
                <option value={cid["id"]} selected={cid["id"] == cidade}>
                  {cid["nome"]}
                </option>
              ))}
            </select>
          </div>
          <div className="inputLabel">
            <label htmlFor="bairro">Bairro</label>
            <select name="bairro">
              {bairros.map((ba) => (
                <option value={ba["id"]} selected={ba["id"] == bairro}>
                  {ba["nome"]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <IconTextButton isSubmit={true} text="Salvar" icon="save" />
      </form>
      <span>{state.error}</span>
    </Card>
  );
};

export default PessoaForm;
