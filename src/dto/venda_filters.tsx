export default class VendaFilters {
  constructor(
    periodoStart: string,
    periodoEnd: string,
    pessoa: number,
    produto: number
  ) {
    this.periodoStart = periodoStart;
    this.periodoEnd = periodoEnd;
    this.pessoa = pessoa;
    this.produto = produto;
  }
  periodoStart: string;
  periodoEnd: string;
  pessoa: number;
  produto: number;
}
