export default class VendaItem {
  constructor(
    valor: number,
    subtotal: number,
    quantidade: number,
    produto: number
  ) {
    this.valor = valor;
    this.subtotal = subtotal;
    this.quantidade = quantidade;
    this.produto = produto;
  }
  valor: number;
  subtotal: number;
  quantidade: number;

  produto: number;
}
