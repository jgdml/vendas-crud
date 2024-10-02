export default class VendaItemView {
  constructor(
    valor: number,
    subtotal: number,
    quantidade: number,
    produto_nome: string,
    produto_id: number
  ) {
    this.valor = valor;
    this.subtotal = subtotal;
    this.quantidade = quantidade;
    this.produto_nome = produto_nome;
    this.produto_id = produto_id;
  }
  valor: number;
  subtotal: number;
  quantidade: number;

  produto_nome: string;
  produto_id: number;
}
