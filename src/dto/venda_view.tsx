import VendaItem from "@/model/venda_item";
import VendaItemView from "./venda_item_view";

export default class VendaView {
  constructor(
    id: number,
    total: number,
    data: string,
    pessoa_nome?: string,
    pessoa_id?: number,
    items?: Array<VendaItemView>
  ) {
    this.id = id;
    this.total = total;
    this.data = data;
    this.pessoa_nome = pessoa_nome;
    this.pessoa_id = pessoa_id;
    this.items = items;
  }

  id: number;
  total: number;
  data: string;
  pessoa_nome?: string;
  pessoa_id?: number;
  items?: Array<VendaItemView>;
}
