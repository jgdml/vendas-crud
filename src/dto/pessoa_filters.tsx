export default class PessoaFilters {
  constructor(
    nome: string,
    cidade_nome: string,
    bairro_nome: string
  ) {
    this.nome = nome;
    this.cidade_nome = cidade_nome;
    this.bairro_nome = bairro_nome;
  }
  nome: string;
  cidade_nome: string;
  bairro_nome: string;
}
