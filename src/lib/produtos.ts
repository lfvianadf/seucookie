import { supabase } from "./supabase";
import { CAIXA_FALLBACK, SABORES_FALLBACK, type Receita } from "./site";

export type ProdutoSupabase = {
  id: string;
  nome: string;
  numero_receita: number | null;
  descricao: string | null;
  preco: number;
  capitulo: string | null;
  foto_url: string | null;
};

const NOME_CAIXA = "box de cookies";

function paraReceita(produto: ProdutoSupabase): Receita {
  return {
    numero:
      produto.numero_receita != null
        ? String(produto.numero_receita).padStart(2, "0")
        : "—",
    nome: produto.nome,
    ingredientes: produto.descricao ?? "",
    preco: produto.preco,
    ehCaixa: produto.nome.trim().toLowerCase() === NOME_CAIXA,
    foto: produto.foto_url ?? undefined,
  };
}

export type Cardapio = {
  sabores: Receita[];
  caixa: Receita;
};

/**
 * Busca o cardápio no Supabase. Se a query falhar ou vier vazia, cai no
 * fallback local (src/lib/site.ts) — a loja nunca fica com tela em branco
 * por causa de uma instabilidade do banco.
 */
export async function buscarCardapio(): Promise<Cardapio> {
  try {
    const { data, error } = await supabase
      .from("produtos")
      .select("id, nome, numero_receita, descricao, preco, capitulo, foto_url")
      .eq("disponivel", true)
      .order("capitulo", { ascending: true })
      .order("nome", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("Cardápio vazio no Supabase");

    const receitas = data.map(paraReceita);
    const caixa = receitas.find((r) => r.ehCaixa);
    const sabores = receitas.filter((r) => !r.ehCaixa);

    if (!caixa) throw new Error('Nenhum produto chamado "Box de cookies" encontrado');

    return { sabores, caixa };
  } catch (err) {
    console.error("Falha ao buscar cardápio no Supabase, usando fallback local:", err);
    return { sabores: SABORES_FALLBACK, caixa: CAIXA_FALLBACK };
  }
}
