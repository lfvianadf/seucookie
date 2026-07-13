import { supabase } from "./supabase";
import type { ItemCarrinho } from "./site";

function normalizarTelefone(telefone: string) {
  return telefone.replace(/\D/g, "");
}

async function encontrarOuCriarCliente(
  nome: string,
  telefone: string,
  endereco?: string,
) {
  const telefoneNormalizado = normalizarTelefone(telefone);

  const { data: existente } = await supabase
    .from("clientes")
    .select("id, nome, endereco")
    .eq("telefone", telefoneNormalizado)
    .maybeSingle();

  if (existente) return existente;

  const { data: novo, error } = await supabase
    .from("clientes")
    .insert({ nome, telefone: telefoneNormalizado, endereco: endereco || null })
    .select("id, nome, endereco")
    .single();

  if (error) throw error;
  return novo;
}

function montarObservacoes(itens: ItemCarrinho[], observacoesCliente?: string) {
  const linhasCaixa = itens
    .filter((item) => item.composicao && item.composicao.length > 0)
    .map((item) => {
      const composicao = item.composicao!
        .map((c) => `${c.quantidade}x ${c.nome}`)
        .join(", ");
      return `${item.nome}: ${composicao}`;
    });

  return [observacoesCliente?.trim(), ...linhasCaixa]
    .filter(Boolean)
    .join(" | ") || null;
}

export type DadosCheckout = {
  nome: string;
  telefone: string;
  endereco?: string;
  observacoesCliente?: string;
  itens: ItemCarrinho[];
  total: number;
};

/**
 * Cria cliente (se novo)/pedido/itens no Supabase. Lança se qualquer etapa
 * falhar — quem chama decide o que fazer (ver CarrinhoPainel: nunca bloqueia
 * a compra, só loga e segue pro WhatsApp mesmo assim).
 */
export async function criarPedido({
  nome,
  telefone,
  endereco,
  observacoesCliente,
  itens,
  total,
}: DadosCheckout): Promise<{ pedidoId: string }> {
  const semProdutoId = itens.some((item) => !item.produtoId);
  if (semProdutoId) {
    throw new Error(
      "Carrinho com item sem produtoId (provavelmente rodando em cima do fallback local) — não é possível gravar no Supabase.",
    );
  }

  const cliente = await encontrarOuCriarCliente(nome, telefone, endereco);

  const { data: pedido, error: pedidoError } = await supabase
    .from("pedidos")
    .insert({
      cliente_id: cliente.id,
      origem: "site",
      status: "novo",
      valor_total: total,
      observacoes: montarObservacoes(itens, observacoesCliente),
    })
    .select("id")
    .single();

  if (pedidoError) throw pedidoError;

  const { error: itensError } = await supabase.from("pedido_itens").insert(
    itens.map((item) => ({
      pedido_id: pedido.id,
      produto_id: item.produtoId,
      quantidade: item.quantidade,
      preco_unitario: item.preco,
    })),
  );

  if (itensError) throw itensError;

  return { pedidoId: pedido.id as string };
}
