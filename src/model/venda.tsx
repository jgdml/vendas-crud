export default class Venda {
  constructor(data_venda: string, pessoa: number, id?: number) {
    this.id = id;
    this.data_venda = data_venda;
    this.pessoa = pessoa;
  }

  id?: number;
  data_venda: string;

  pessoa: number;
}
