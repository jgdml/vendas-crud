export default class Produto {
  constructor(id?: number, nome?: string, valor_venda?: number) {
    this.id = id;
    this.nome = nome;
    this.valor_venda = valor_venda;
  }

  id?: number;
  nome?: string;
  valor_venda?: number;
}
