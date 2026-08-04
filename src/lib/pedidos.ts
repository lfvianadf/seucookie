import { supabase } from "./supabase";
import type { ItemCarrinho } from "./site";

export type Cliente = { id: string; nome: string; endereco: string | null };

async function encontrarOuCriarCliente(
  nome: string,
  telefone: string,
  endereco?: string,
): Promise<Cliente> {
  const { data: encontrados, error: buscaError } = await supabase.rpc(
    "buscar_cliente_por_telefone",
    { p_telefone: telefone },
  );
  if (buscaError) throw buscaError;

  if (encontrados && encontrados.length > 0) {
    return encontrados[0];
  }

  const { data: novo, error: criaError } = await supabase
    .from("clientes")
    .insert({ nome, telefone, endereco: endereco || null })
    .select("id, nome, endereco")
    .single();

  if (criaError) throw criaError;
  return novo;
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
 * Cria cliente (se novo)/pedido/itens/composição no Supabase. Lança se
 * qualquer etapa falhar — quem chama decide o que fazer (ver CarrinhoPainel:
 * nunca bloqueia a compra, só loga e segue pro WhatsApp mesmo assim).
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
      observacoes: observacoesCliente?.trim() || null,
    })
    .select("id")
    .single();

  if (pedidoError) throw pedidoError;

  // Insere item a item (nunca em lote): uma box precisa do próprio id do
  // pedido_itens recém-criado antes de gravar a composição escolhida. Uma
  // box com quantidade > 1 vira várias linhas de quantidade 1 (uma por
  // unidade), cada uma com sua composição — é isso que desconta o estoque
  // de verdade dos cookies no CRM, não a linha do pedido_itens da box.
  for (const item of itens) {
    const ehBox = Boolean(item.composicao && item.composicao.length > 0);
    const repeticoes = ehBox ? item.quantidade : 1;

    for (let i = 0; i < repeticoes; i++) {
      const { data: pedidoItem, error: itemError } = await supabase
        .from("pedido_itens")
        .insert({
          pedido_id: pedido.id,
          produto_id: item.produtoId,
          quantidade: ehBox ? 1 : item.quantidade,
          preco_unitario: item.preco,
        })
        .select("id")
        .single();

      if (itemError) throw itemError;

      if (ehBox) {
        const { error: composicaoError } = await supabase
          .from("pedido_item_composicao")
          .insert(
            item.composicao!.map((c) => ({
              pedido_item_id: pedidoItem.id,
              cookie_produto_id: c.produtoId,
              quantidade: c.quantidade,
            })),
          );

        if (composicaoError) throw composicaoError;
      }
    }
  }

  return { pedidoId: pedido.id as string };
}
