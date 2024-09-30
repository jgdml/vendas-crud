import Cidade from "./cidade";
import Bairro from "./bairro";

export default class Pessoa {
  constructor(
    id?: number,
    nome?: string,
    cidade?: number,
    telefone?: string,
    cep?: string,
    endereco?: string,
    numero?: number,
    complemento?: string,
    email?: string,
    bairro?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.cep = cep;
    this.endereco = endereco;
    this.numero = numero;
    this.complemento = complemento;
    this.telefone = telefone;
    this.email = email;
    this.cidade = cidade;
    this.bairro = bairro;
  }
  id?: number;
  nome?: string;
  cep?: string;
  endereco?: string;
  numero?: number;
  complemento?: string;
  telefone?: string;
  email?: string;

  cidade?: number;
  bairro?: number;
}
