export default class VendaFilters {
  constructor(inicio: string, fim: string, pessoa: string, produto: string) {
    this.inicio = inicio;
    this.fim = fim;
    this.pessoa = pessoa;
    this.produto = produto;
  }
  inicio: string;
  fim: string;
  pessoa: string;
  produto: string;
}
