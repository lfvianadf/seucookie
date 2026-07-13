export const SITE_URL = "https://seucookiebr.com.br";

export const CONTATO = {
  whatsapp: "5584994082236",
  instagram: "sigaseucookie",
  cidade: "Natal",
};

export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export type Receita = {
  numero: string;
  nome: string;
  peso?: string;
  ingredientes: string;
  preco: number;
  status?: "saiu do forno" | "esse acabou hoje";
  favorito?: boolean;
  ehCaixa?: boolean;
  /** uuid do produto no Supabase — ausente quando o dado vem do fallback local */
  produtoId?: string;
  /** URL da foto no Supabase Storage — ausente usa o placeholder padrão */
  foto?: string;
};

export const QUANTIDADE_CAIXA = 4;

/** Usados só se a busca no Supabase falhar ou vier vazia — ver src/lib/produtos.ts */
export const SABORES_FALLBACK: Receita[] = [
  {
    numero: "01",
    nome: "tradicional",
    peso: "100g",
    ingredientes: "recheio de nutella",
    preco: 12.9,
  },
  {
    numero: "02",
    nome: "red velvet",
    peso: "100g",
    ingredientes: "recheio de chocolate branco",
    preco: 12.9,
  },
  {
    numero: "03",
    nome: "churros",
    peso: "100g",
    ingredientes: "recheio de doce de leite e canela",
    preco: 11.9,
  },
];

export const CAIXA_FALLBACK: Receita = {
  numero: "04",
  nome: "box com 4 cookies",
  peso: "60g cada",
  ingredientes: "monte a sua caixa — escolha os 4 sabores",
  preco: 32.9,
  ehCaixa: true,
};

export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export type ComposicaoCaixa = {
  numero: string;
  nome: string;
  quantidade: number;
};

export type ItemCarrinho = {
  id: string;
  numero: string;
  nome: string;
  peso?: string;
  preco: number;
  quantidade: number;
  composicao?: ComposicaoCaixa[];
};

export function montarMensagemPedido(itens: ItemCarrinho[], total: number) {
  const linhas = itens.map((item) => {
    const composicao = item.composicao
      ?.map((c) => `${c.quantidade}x ${c.nome}`)
      .join(", ");
    const dentroParenteses = composicao || item.peso;
    const detalhe = dentroParenteses ? ` (${dentroParenteses})` : "";
    const subtotal = formatarPreco(item.preco * item.quantidade);
    return `• ${item.quantidade}x nº${item.numero} ${item.nome}${detalhe} — ${subtotal}`;
  });

  return [
    "Oi! Vim pelo site e queria fazer esse pedido:",
    "",
    ...linhas,
    "",
    `Total: ${formatarPreco(total)}`,
  ].join("\n");
}
