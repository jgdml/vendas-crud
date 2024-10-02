"use client";
import React, { useEffect, useState } from "react";
import Card from "@/app/components/Card";
import { useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { submitForm, getAllProdutos, getAllPessoas, getVenda } from "./actions";
import IconTextButton from "@/app/components/IconTextButton";
import ActionTable from "@/app/components/ActionTable";
import VendaItemView from "@/dto/venda_item_view";

const VendaForm = () => {
  const params = useSearchParams();
  const editId = params.get("id") ?? undefined;

  const [data, setData] = useState(new Date().toLocaleDateString("en-ca"));
  const [pessoa, setPessoa] = useState();

  const [pessoas, setPessoas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [produto, setProduto] = useState<Array<any>>([]);
  const [unitario, setUnitario] = useState(0.0);
  const [subtotal, setSubtotal] = useState(0.0);
  const [quantidade, setQuantidade] = useState(1);

  const [items, setItems] = useState<Array<any>>([]);
  const [itemsJson, setItemsJson] = useState("");

  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllPessoas().then((pes) => {
      setPessoas(pes);
    });

    getAllProdutos().then((prods) => {
      setProdutos(prods);
    });

    if (editId) {
      getVenda(parseInt(editId)).then((v) => {
        setData(v.data);
        setPessoa(v.pessoa_id);
        setTotal(v.total);
        setItems(v.items);
        setItemsJson(JSON.stringify(v.items));
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
    <Card title={(editId ? "Editar" : "Realizar ") + " Venda"}>
      <form action={formAction} className="form">
        <div className="totalPrice">
          <span>Total: R${total}</span>
          <IconTextButton isSubmit={true} text="Concluir" icon="check" />
        </div>

        <span className="text-red-500">{state.error}</span>

        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="nome">Data</label>
            <input
              name="data"
              type="date"
              maxLength={80}
              required
              defaultValue={data}
              placeholder="Digite o nome da pessoa"
            />
          </div>

          <div className="inputLabel">
            <label htmlFor="pessoa">Pessoa</label>
            <select name="pessoa">
              {pessoas.map((pes) => (
                <option value={pes["id"]} selected={pes["id"] == pessoa}>
                  {pes["nome"]}
                </option>
              ))}
            </select>
          </div>
          <input type="json" hidden name="items" required value={itemsJson} />
        </div>
      </form>
      <form
        id="item-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="formBody">
          <div className="inputLabel">
            <label htmlFor="produto">Produto</label>
            <select
              name="produto"
              onChange={(e) =>
                setProduto([e.target.value, e.target.selectedOptions[0].text])
              }
            >
              {produto.length == 0 ? (
                <option selected disabled aria-invalid>
                  Escolha um produto
                </option>
              ) : null}
              {produtos.map((prod) => (
                <option
                  onClick={() => {
                    setUnitario(prod["valor_venda"]);
                    setSubtotal(prod["valor_venda"] * quantidade);
                  }}
                  value={prod["id"]}
                  selected={prod["id"] == produto}
                >
                  {prod["nome"]}
                </option>
              ))}
            </select>
          </div>
          <div className="inputLabel">
            <label htmlFor="unitario">Valor Unitário</label>
            <input
              name="unitario"
              type="number"
              min={0.01}
              max={99999.99}
              step=".01"
              required
              value={unitario}
              onChange={(e) => {
                const newVal = parseFloat(e.target.value);
                setUnitario(newVal);
                setSubtotal(newVal * quantidade);
              }}
              placeholder="Digite o valor unitário do produto"
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="quantidade">Quantidade</label>
            <input
              name="quantidade"
              type="number"
              min={1}
              max={999}
              required
              value={quantidade}
              placeholder="Digite a quantidade do produto"
              onChange={(e) => {
                const newVal = parseInt(e.target.value);
                setQuantidade(newVal);
                setSubtotal(newVal * unitario);
              }}
            />
          </div>
          <div className="inputLabel">
            <label htmlFor="subtotal">Subtotal</label>
            <input
              name="subtotal"
              type="number"
              min={0.01}
              max={99999.99}
              step=".01"
              required
              value={subtotal}
              placeholder="Digite o subtotal"
              onChange={(e) => setSubtotal(parseFloat(e.target.value))}
            />
          </div>
          <IconTextButton
            isSubmit={true}
            onclick={(e) => {
              if (
                !(
                  document.getElementById("item-form")! as HTMLFormElement
                ).checkValidity() ||
                produto.length == 0
              )
                return;

              const newItem = new VendaItemView(
                unitario,
                subtotal,
                quantidade,
                produto[1],
                produto[0]
              );
              for (var i of items) {
                if (i["produto_id"] == newItem.produto_id) {
                  alert(
                    "Uma venda não pode conter vários do mesmo produto, use o campo Quantidade."
                  );
                  return;
                }
              }
              const newItems = [...items, JSON.parse(JSON.stringify(newItem))];
              setItems(newItems);
              setItemsJson(JSON.stringify(newItems));

              var total = 0.0;
              newItems.map((i: any) => {
                total += parseFloat(i["subtotal"]);
              });
              setTotal(parseFloat(total.toFixed(2)));
            }}
            text="Adicionar"
            icon="shopping_cart"
          />
        </div>
        <ActionTable
          headers={["Produto", "Quantidade", "Valor Unitario", "Subtotal"]}
          displayValues={["produto_nome", "quantidade", "valor", "subtotal"]}
          items={items}
          returnIndex={true}
          deleteAction={(index) => {
            const newItems = items.filter((i, indx) => indx != index);
            setItems(newItems);
            setItemsJson(JSON.stringify(newItems));

            var total = 0.0;
            newItems.map((i: any) => {
              total += parseFloat(i["subtotal"]);
            });
            setTotal(parseFloat(total.toFixed(2)));
          }}
          keepElement={true}
        />
      </form>
    </Card>
  );
};

export default VendaForm;
