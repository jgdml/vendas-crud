export default class Cidade {
  constructor(id?: number, nome?: string, uf?: string) {
    this.id = id;
    this.nome = nome;
    this.uf = uf;
  }

  id?: number;
  nome?: string;
  uf?: string;
}
