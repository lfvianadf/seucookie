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
  qtd_estoque: number | null;
  disponivel: boolean;
  tipo_produto: "cookie" | "box";
};

function paraReceita(produto: ProdutoSupabase): Receita {
  const esgotado = produto.qtd_estoque === 0 || produto.disponivel === false;
  return {
    numero:
      produto.numero_receita != null
        ? String(produto.numero_receita).padStart(2, "0")
        : "—",
    nome: produto.nome,
    ingredientes: produto.descricao ?? "",
    preco: produto.preco,
    ehCaixa: produto.tipo_produto === "box",
    foto: produto.foto_url ?? undefined,
    status: esgotado ? "esse acabou hoje" : undefined,
    estoque: esgotado ? 0 : produto.qtd_estoque ?? undefined,
    capitulo: produto.capitulo ?? undefined,
  };
}

export type Cardapio = {
  /** Todos os cookies — usado na listagem "os sabores" / por capítulo. */
  sabores: Receita[];
  caixa: Receita;
  /** Só os cookies liberados pra essa caixa (produto_box_itens). */
  saboresDaCaixa: Receita[];
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
      .select(
        "id, nome, numero_receita, descricao, preco, capitulo, foto_url, qtd_estoque, disponivel, tipo_produto",
      )
      .order("numero_receita", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("Cardápio vazio no Supabase");

    const caixaProduto = data.find((p) => p.tipo_produto === "box");
    if (!caixaProduto) throw new Error('Nenhum produto do tipo "box" encontrado');

    const sabores = data.filter((p) => p.tipo_produto === "cookie").map(paraReceita);
    const caixa = paraReceita(caixaProduto);

    const { data: itensBox, error: itensBoxError } = await supabase
      .from("produto_box_itens")
      .select("cookie_id")
      .eq("box_id", caixaProduto.id);

    if (itensBoxError) throw itensBoxError;

    const idsPermitidos = new Set((itensBox ?? []).map((item) => item.cookie_id));
    const saboresDaCaixa = data
      .filter((p) => idsPermitidos.has(p.id))
      .map(paraReceita);

    return { sabores, caixa, saboresDaCaixa };
  } catch (err) {
    console.error("Falha ao buscar cardápio no Supabase, usando fallback local:", err);
    return {
      sabores: SABORES_FALLBACK,
      caixa: CAIXA_FALLBACK,
      saboresDaCaixa: SABORES_FALLBACK,
    };
  }
}
