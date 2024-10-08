"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getVenda } from "./actions";

const VendaPrint = () => {
  const params = useSearchParams();
  const id = params.get("id") ?? undefined;

  const [data, setData] = useState();
  const [pessoa, setPessoa] = useState();
  const [items, setItems] = useState<Array<any>>([]);
  const [total, setTotal] = useState(0);
  const [venda, setVenda] = useState(-1);

  useEffect(() => {
    getVenda(parseInt(id!!)).then((v) => {
      setData(v.data.split("-").reverse().join("/"));
      setPessoa(v.pessoa_nome);
      setTotal(v.total);
      setItems(v.items);
      setVenda(v.id);
      setTimeout(window.print, 500);
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full justify-around text-left">
      <div className="flex flex-col h-48 justify-between">
        <p>Identificador: {venda}</p>
        <p>Cliente: {pessoa}</p>
        <p>Data: {data}</p>
        <p>Total: R${total}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Identificador</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i, index) => (
            <tr key={index}>
              <td>{i.produto_id}</td>
              <td>{i.produto_nome}</td>
              <td>{i.quantidade}</td>
              <td>{i.valor}</td>
              <td>{i.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Assinatura: ________________</p>
    </div>
  );
};

export default VendaPrint;
